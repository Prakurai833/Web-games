
var noOfSquares = 6;
//tostore different colors
var arr=[];

/* fetching html elements and storing in variables*/

//color picked for target
var picked;

//getting square divs
var squares = document.getElementsByClassName("square");
 
//the colour
var targetcolor = document.getElementById("targetcolor");

//the output message
var message = document.getElementById("message");

//heading
var head = document.querySelector("h1");

//reset button
var reset = document.getElementById("newcolor")

init();

function init()
{
    //generating random colors
    arr = generateRandomColor(noOfSquares);

    //get a target color randomly from th array
    picked =  arr[Math.floor(Math.random()*arr.length)];

    //updating target RGB display
    targetcolor.textContent = picked;

    for(var i=0; i<squares.length; i++)
    {
        //setting square color to different 
        squares[i].style.backgroundColor= arr[i];  
    
        //adding event listner to squares
        squares[i].addEventListener("click",function()
        {   console.log(this.style.backgroundColor)
            if(picked===this.style.backgroundColor)
            {
                message.textContent="Correct";
                message.style.color= "green";
                //turning everything to same color
                changeColor(this.style.backgroundColor);
                reset.textContent="play again?";               
            }
            else
            {
                message.textContent="Try Again";
                message.style.color="red";
                //hiding wrong square
                this.style.backgroundColor = "black";
            } ;
        });
    }
}

reset.addEventListener("click",resetln);
    
    
function generateRandomColor(limit)
{

        var color = [];
        for(var i = 0; i<limit ; i++){
            color.push(rgbGenerator());
        }
        return color;
}
function rgbGenerator()
{ 

    var r =Math.floor(Math.random()*256);
    var g =Math.floor(Math.random()*256);
    var b =Math.floor(Math.random()*256);

    return "rgb("+r+", "+g+", "+b+")" ;
}

function changeColor(color)
{

        for(var i=0; i<squares.length; i++)
        {squares[i].style.backgroundColor=color;}
        head.style.backgroundColor=color
}

function resetln()
{
    arr = generateRandomColor(noOfSquares);
    picked =  arr[Math.floor(Math.random()*arr.length)];
    targetcolor.textContent=picked;
    message.textContent="";
    head.style.backgroundColor= "steelblue";
    reset.textContent="New Game"
    
    for(var i=0; i<squares.length; i++)
    {
        //setting square color to different 
        squares[i].style.backgroundColor= arr[i];  
    }    

}





