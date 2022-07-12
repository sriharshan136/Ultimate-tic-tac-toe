console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;
let ismute = false;
let currentBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let BoxState = ['', '', '', '', '', '', '', '', ''];
// let BoxState = ['X', '', '', '', 'X', '', '', '', 'X'];
let winLine = [0, 1, 2, 5, 5, 0];


let wins = [
    [0, 1, 2, 1, 6, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -11, 20, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135],
]

// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "O": "X";
}

const getBoxText = (boxtext)=>{
    let text = [];
    Array.from(boxtext).forEach(element =>{
        text.push(element.innerText);
    })

    return text;
}

const updateMark = ()=>{
    let marks = document.getElementsByClassName("mark");
    
    for (let i = 0; i < 9; i++) {
        let m = marks[i].querySelector(".marktext");
        let symbol = BoxState[i];
        if(symbol != '' && symbol != 'D'){
            m.innerText = symbol;
            m.style.color = (symbol == 'X')? 'red': 'green';
        }  
    }
}

function arrayRemove(arr, value) { 
    
    return arr.filter(function(ele){ 
        return ele != value; 
    });
}

const drawLine = ()=>{
    console.log(winLine)
    document.querySelector(".line").style.transform = `translate(${winLine[3]}vw, ${winLine[4]}vw) rotate(${winLine[5]}deg)`
    document.querySelector(".line").style.width = "38vw";
}

// var result = arrayRemove(array, 6);

// Function to change the Box
const changeBox = (index)=>{
    let boxes = document.getElementsByClassName("inner");

    while(currentBoxes.length > 0) {
        currentBoxes.pop();
    }

    if(!isgameover){
        if(BoxState[index] == ''){
            currentBoxes.push(index)
        }
        else{
            for (let i = 0; i < 9; i++) {
                if(BoxState[i] == ''){
                    currentBoxes.push(i)
                }
            }
        }
    }

    for (let i = 0; i < 9; i++) {
        if(BoxState[i] == '' || BoxState[i] == 'D'){
            boxes[i].style.backgroundColor = 'grey';
        }
        else if(BoxState[i] == 'X'){
            boxes[i].style.backgroundColor = "#EE8989";
        }
        else if(BoxState[i] == 'O'){
            boxes[i].style.backgroundColor = "#99F39C";
        }
    }

    currentBoxes.forEach(e=>{
        boxes[e].style.backgroundColor = 'white';
    });
 
}

// Function to check for a win
const checkWin = (boxtext)=>{  
    let result = false;  
    wins.forEach(e =>{
        if((boxtext[e[0]] === boxtext[e[1]]) && (boxtext[e[2]] === boxtext[e[1]]) && (boxtext[e[0]] !== "") ){
            result = true;
            winLine = e;
            
        }
    })
    if(!result){
        if(!boxtext.includes('')){
            return "draw";
        }
        else{
            return "false";
        }
    }
    return "true";
}

// Game Logic
let lines = document.getElementsByClassName("line");
let boxes = document.getElementsByClassName("inner");
Array.from(boxes).forEach(box =>{
    let innerbox = box.getElementsByClassName("box");
    
    Array.from(innerbox).forEach(element =>{
        let boxtext = element.querySelector('.boxtext');
        let j = box.className[11] - 1;
        element.addEventListener('click', ()=>{          
            if(boxtext.innerText === '' && currentBoxes.includes(j)){
                boxtext.innerText = turn;
                boxtext.style.color = turn === 'X'? 'red': 'green';
                let result = checkWin(getBoxText(innerbox));
                audioTurn.play();
                let i = element.className[5] - 1;
                if(result == "true"){
                    BoxState[j] = turn;
                    if(checkWin(BoxState) == "true"){
                        isgameover = true;
                        music.pause();
                        ismute = true;
                        gameover.play();
                        // drawLine();
                        document.querySelector('.info').innerText = turn + " Won";
                        document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";

                    }
                    else if(checkWin(BoxState) == "draw"){
                        isgameover = true;
                        music.pause();
                        ismute = true;
                        gameover.play();
                        document.querySelector('.info').innerText = "Its a Draw!";
                    }
                }
                else if(result == "draw"){
                    BoxState[j] = 'D';
                }
                changeBox(i);
                updateMark();
                turn = changeTurn();
                
                if (!isgameover){
                    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
                }
            }
        });

        element.addEventListener('mouseover', ()=>{
            element.style.removeProperty("background-color"); 
            if(currentBoxes.includes(j)){
                element.style.backgroundColor = "#D6C4E8";
            }  
        });
        element.addEventListener('mouseout', ()=>{
            element.style.removeProperty("background-color"); 
        });
    })
});


// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X"; 
    isgameover = false

    let boxes = document.getElementsByClassName("inner");
    Array.from(boxes).forEach(element=>{
        element.style.backgroundColor = 'white';
    })
    BoxState = ['', '', '', '', '', '', '', '', ''];
    currentBoxes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    updateMark();

    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
});

musicBtn.addEventListener('click', ()=>{
    if(!ismute){
        ismute = true;
        music.play();
    }
    else{
        ismute = false;
        music.pause();
    }
});

