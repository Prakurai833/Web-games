const grid = document.querySelector('.grid');
const blockWidth = 100;
const blockHeight = 20;
const score = document.getElementById('score')

const userStart = [230,10]
let currentPosition = userStart;
let ballPosition = [270,30]
let x = 2
let y = 2
let c = 1

let timerId

//to create blocks
class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis+100,yAxis]
        this.topLeft = [xAxis,yAxis+20]
        this.topRight = [xAxis+100,yAxis]
    }
}
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210),   
    
]


//draw all blocks
function addBlocks(){
    for(let i=0; i < blocks.length; i++)
    {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.appendChild(block)
    }
}

addBlocks();


const user = document.createElement('div');
user.classList.add('user');
user.style.left = currentPosition[0] + 'px';
user.style.bottom = currentPosition[1] + 'px';
grid.appendChild(user);


//move user
function moveUser(e){
    switch(e.key) {
        case 'ArrowLeft' :
            if (currentPosition[0] > 10)
            {
                currentPosition[0] -= 10
                user.style.left = currentPosition[0] + 'px'
                user.style.bottom = currentPosition[1] + 'px'
            }
            break;
        case 'ArrowRight' :
            if (currentPosition[0] < 450)
            {
                currentPosition[0] += 10
                user.style.left = currentPosition[0] + 'px'
                user.style.bottom = currentPosition[1] + 'px'
            }
            break   
    }
}

document.addEventListener('keydown' , moveUser)

//add ball
const ball = document.createElement('div')
ball.classList.add('ball')
grid.appendChild(ball)
ball.style.left = ballPosition[0] + 'px';
ball.style.bottom = ballPosition[1] + 'px';

//move ball
function moveBall(){
    ballPosition[0] += x;
    ballPosition[1] += y;
    ball.style.left = ballPosition[0] + 'px';
    ball.style.bottom = ballPosition[1] + 'px';
    collisions();

}


timerId = setInterval(moveBall, 20)
console.log(blocks)


//check for collisions
function collisions(){
    //wall collisions
    if (ballPosition[0] >= (560 - 20))
    {
        x = -2;
        return;
    }
    if (ballPosition[1] >= (300 - 20))
    {
        y = -2;
        return;
    }
    if( ballPosition[0] <= 0)
    {
        x = 2;
        return;
    }
    if (ballPosition[1] <=0 )
    {
        clearInterval(timerId)
        score.innerHTML='You lose'
        document.removeEventListener('keydown', moveUser)

    }

    //block collisions
    for( let i = 0; i < blocks.length; i++ )
    { 
        if ((ballPosition[0] >= (blocks[i].bottomLeft[0]-20) && ballPosition[0] <= (blocks[i].bottomRight[0]-20)) && (ballPosition[1] >= blocks[i].bottomLeft[1]-20) )
        {
            const allblocks = Array.from(document.querySelectorAll('.block'));
            allblocks[i].classList.remove('block');
            blocks.splice(i,1);
            y = -2;
            return;
        }       
    }
    //user collision
    if((ballPosition[0]>= currentPosition[0] && ballPosition[0]<= currentPosition[0]+100)&&(ballPosition[1]<= currentPosition[1]+20))
    {
        y=2;
    }

    if(blocks.length == 0){
        clearInterval(timerId)
        score.innerHTML='You WIN'
        document.removeEventListener('keydown', moveUser)
    
    }
}