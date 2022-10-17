let borad = new Array(4);
window.onload = function(){
    init();
    createOneNumber();
    createOneNumber();
}

//用于初始化生成二维数组和设定样式
function init(){
    console.log("123");
    for(let i=0; i<4 ; i++){
        borad[i] = new Array(4);
        for(let j=0 ; j<4 ; j++){
            borad[i][j] = 0;
            let gameCell = document.getElementById("gameCell-"+i+"-"+j);
            gameCell.style.top = setTop(i);
            gameCell.style.left = setLeft(j);
        }
    }
    console.log(borad);
    updateBorad();
}

//用于生成一个随机位置的随机数字
function createOneNumber(){
    let randx = parseInt(Math.floor(Math.random()*4));
    let randy = parseInt(Math.floor(Math.random()*4));
    while(true) {
        if(borad[randx][randy] == 0){
            break;
        }
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    let p = parseInt(Math.random() < 0.5? 2:4);
    console.log(randx,randy,p);
    //将随机数赋值给borad数组
    borad[randx][randy] = p;
    console.log(borad);
    //生成随机数的动画
    let boradNum = document.getElementById("boradCell-"+randx+"-"+randy);
    boradNum.style.backgroundColor = setBgc(borad[randx][randy]);
    boradNum.innerText = borad[randx][randy];
    boradNum.style.width = "100px";
    boradNum.style.height = "100px";
    boradNum.style.animation = "createOneNum 300ms";
}

//创建16个新的div用于展示二维数组的数字变化
function updateBorad(){
    // deleteCell();
    console.log(borad);
    for(let i=0 ; i<4 ; i++){
        for(let j=0; j<4 ; j++){
            let gameContent = document.getElementById("gameCon");
            let gameDiv = document.createElement("div");
            gameDiv.id = "boradCell-"+i+"-"+j;
            gameDiv.className = "boradCell";
            gameDiv.style.position = 'absolute';
            if(borad[i][j] == 0){
                gameDiv.style.width = "0px";
                gameDiv.style.height = "0px";
                gameDiv.style.top = setTop(i);
                gameDiv.style.left = setLeft(j);
            }else {
                gameDiv.style.width = "100px";
                gameDiv.style.height = "100px";
                gameDiv.style.top = setTop(i);
                gameDiv.style.left = setLeft(j);
                gameDiv.style.fontSize = "50px";
                gameDiv.style.color = "white";
                gameDiv.style.textAlign = "center";
                gameDiv.style.lineHeight = "100px";
                gameDiv.style.backgroundColor = setBgc(borad[i][j]);
            }
            gameContent.appendChild(gameDiv);
        }
    }
}
//获取上的高度
function setTop(randx){
    return 20+randx*120 + "px";
}
//获取相对左的距离
function setLeft(randy){
    return 20+randy*120 + "px";
}

//获取对应数值的背景色
function setBgc(boradNumber){
    switch(boradNumber){
        case 2:
            return "red";
            break;
        case 4:
            return "orange";
            break;
        case 8:
            return "yellow";
            break;
        case 16:
            return "green";
            break;
        case 32:
            return "blue";
            break;
        case 64:
            return "purple";
            break;
        case 128:
            return "pink";
            break;
        case 256:
            return "brown";
            break;
        case 512:
            return "mauve";
            break;
        case 1024:
            return "maroon";
            break;
        case 2048:
            return "gold";
            break;
    }
}
document.onkeydown = function(event){
    switch (event.code){
        case "ArrowLeft" :
            console.log("左");
            deleteCell1();
            // runLeft();
            break;
        case "ArrowUp" :
            console.log("上");
            runTop();
            break;
        case "ArrowRight" :
            console.log("右");
            runRight();
            break;
        case "ArrowDown" :
            console.log("下");
            runDown();
            break;
        default:
            console.log(event);
            break;
    }
}
function runLeft(){
    if(!isCanMoveLeft(borad)){
        return false;
    }
    for(let i=0; i<4 ; i++){
        for(let j=1 ; j<4 ; j++){
            if(borad[i][j] != 0){
                for(let k=0 ; k<j ; k++){
                    if(borad[i][k] == 0 && noBlokHorCol(i,k,j,borad)){
                        let numberCell = document.getElementById("boradCell-"+i+"-"+j);
                        numberCell.animate({
                            top:setTop(k,j),
                            left:setLeft(k,j)
                        },300);
                        borad[i][k] = borad[i][j];
                        borad[i][j] = 0;
                    }
                }
            }
        }
    }
    // console.log("left后的"+borad);
    // updateBorad();
    return true;
}
function runTop(){

}
function runRight(){

}
function runDown(){

}

function isCanMoveLeft(borad){
    for(let i=0 ; i<4 ; i++){
        for(let j=0; j<4 ; j++){
            if(borad[i][j-1] == 0 || borad[i][j-1] == borad[i][j]){
                return true;
            }
        }
    }
    return false;
}

function noBlokHorCol(row,col1,col2,borad){
    for(let i = col1+1 ; i<col2 ; i++){
        if(borad[row][i] != 0){
            return false;
        }
    }
    return true;
}
/*非动态获取元素 ：在没有生成这个元素之前不能获取到
document.getElementById()
document.querySelector()
document.querySelectorAll()
动态获取元素 ：不用一开始就获取元素
document.getElementsByClassName()
document.getElementsByTagName()

 querySelectorAll()的实现类似于一组元素的快照，而并非对文档结构进行搜索的动态查询。
​ 快照：把某个时刻dom中的结构记录下来，而不是通过查询dom结构动态获取。
​ getElementsByClassName()是动态查询，若删除其中一个节点，dom结构会发生相应的改变。
如下classname获取的cCell是一个动态的元素集合，一开始长度为16，这里的操作代码为
删除自身，所以当循环进行一次时，长度就-1，所以到cCell[9]时元素数组已经不够长了。
*/
function deleteCell1(){
    // let gCell = document.getElementById("gameCon");
    let cCell = Array.from(document.getElementsByClassName("boradCell"));
    // console.log(cCell);
    // console.log(cCell.length);
    for(var i=0 ; i<16 ; i++){
        cCell[i].remove();
    }
}

function deleteCell(){
    for(let i=0 ; i<4 ; i++){
        for(let j=0 ; j<4 ; j++){
            let cCell = document.getElementById("boradCell-"+i+"-"+j);
            cCell.remove();
        }
    }
}