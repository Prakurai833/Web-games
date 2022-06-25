const squares = document.querySelectorAll('.square');
const mole = document.querySelectorAll('.mole');
const timeleft = document.getElementById('time');
const score = document.getElementById('score');
let hitposition = null;
let result = 0;
let currentTime = 30;
let timerId;

moveMole();

squares.forEach(square => {
    square.addEventListener('click',() => {
        if(hitposition == square.id){
            result++;
            console.log(result)
            score.textContent = result;
            
        }
    })
    
})

countDown();


function randomSquare(){
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomSquare = squares[Math.floor((Math.random())*9)];
    console.log(randomSquare);
    randomSquare.classList.add('mole');
    hitposition = randomSquare.id;

}

function moveMole(){
    timerId = setInterval(randomSquare,500);
    counter = setInterval(countDown,1000);
}

function countDown(){
    currentTime--;
    timeleft.textContent = currentTime;

    if(currentTime == 0){
       clearInterval(timerId);
       clearInterval(counter)
       alert("TIME'S UP Your score is \n"+result) ;
    }

}
 