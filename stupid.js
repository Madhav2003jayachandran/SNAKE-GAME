let Dir = {x: 0, y: 0};
const foodSound = new Audio('food_G1U6tlb.mp3');
const exit = new Audio('mixkit-arcade-retro-game-over-213.wav');
const move = new Audio('game-start-6104.mp3')
const music = new Audio('hip-hop-rock-beats-118000.mp3')
let speed = 10;
let lasttime = 0;
let score = 0;
let Arr = [
    {x: 13, y: 15}
]
food={x: 6, y: 7};
function main(time)
{  
    window.requestAnimationFrame(main);
    console.log(time)
    if((time - lasttime)/1000 < 1/speed)
    {
        return;
    }
    lasttime = time;
    gameEngine();
}
function isCollide(sarr)
{
    for(let i = 1;i < sarr.length; i++){
        if(sarr[i].x === sarr[0].x && sarr[i].y === sarr[0].y){
            return true;
        }
        if(sarr[0].x >= 18 || sarr[0].x <=0 || sarr[0].y >= 18 || sarr[0].y <=0) 
        return true;
    }
}
function gameEngine(){
    if(isCollide(Arr))
    {
        exit.play();
        music.pause();
        Dir = {x: 0, y:0};
        alert("Mission Failed!!!. Try again");
        Arr = [{x: 13, y: 15}];
        music.play();
        score = 0;
    }
    if(Arr[0].y === food.y && Arr[0].x === food.x){
        foodSound.play();
        score++;
        scorePrint.innerHTML="Score"+score;
        Arr.unshift({x: Arr[0].x + Dir.x ,y: Arr[0].y + Dir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
    }
    for(let i = Arr.length -2 ; i >= 0;i--){
        Arr[i+1] = {...Arr[i]};
    }
    Arr[0].x += Dir.x;
    Arr[0].y += Dir.y;
    board.innerHTML = "";
    Arr.forEach((e,index)=>{
        snake = document.createElement('div');
        snake.style.gridRowStart = e.y;
        snake.style.gridColumnStart = e.x;
        if(index === 0){
            snake.classList.add('head');
        }
        else{
            snake.classList.add('snake');
        }
        board.appendChild(snake);
    });
    foodelement = document.createElement('div');
    foodelement.style.gridRowStart = food.y;
    foodelement.style.gridColumnStart = food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    Dir = {x: 0, y: 1}
    move.play();
    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            Dir.x = 0;
            Dir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            Dir.x = 0;
            Dir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            Dir.x = -1;
            Dir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            Dir.x = 1;
            Dir.y = 0;
            break;
        default:
            break;
    }

});
