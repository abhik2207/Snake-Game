const gameBoard = document.querySelector("#gameBoard");
const context = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetButton = document.querySelector("#resetButton");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "White";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor = "red";
const unitSize = 25;

let running = false;
let x_velocity = unitSize;
let y_velocity = 0;
let food_x, food_y;
let score = 0;
let snake = [
    {x:unitSize*4, y:0},
    {x:unitSize*3, y:0},
    {x:unitSize*2, y:0},
    {x:unitSize, y:0},
    {x:0, y:0}
];

window.addEventListener("keydown", changeDirection);
resetButton.addEventListener("click", resetGame);

gameStart();

function gameStart() {
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if(running){
        setTimeout(()=> {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }
    else{
        displayGameOver();
    }
}

function clearBoard() {
    context.fillStyle = boardBackground;
    context.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
    function randomFood(min, max){
        const randNum = Math.round((Math.random() * (max-min) + min) / unitSize) * unitSize;
        return randNum;
    }
    food_x = randomFood(0, gameWidth-unitSize);
    food_y = randomFood(0, gameWidth-unitSize);
}

function drawFood() {
    context.fillStyle = foodColor;
    context.fillRect(food_x, food_y, unitSize, unitSize);
}

function moveSnake() {
    const head = {x: snake[0].x + x_velocity, y: snake[0].y + y_velocity};
    snake.unshift(head);
    if(snake[0].x==food_x && snake[0].y==food_y){
        score++;
        scoreText.textContent = score;
        createFood();
    }
    else{
        snake.pop();
    }
}

function drawSnake() {
    context.fillStyle = snakeColor;
    context.strokeStyle = snakeBorder;
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}

function changeDirection() {
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    const goingLEFT = (x_velocity == -unitSize);
    const goingUP = (y_velocity == -unitSize);
    const goingRIGHT = (x_velocity == unitSize);
    const goingDOWN = (y_velocity == unitSize);

    switch(true){
        case(keyPressed==LEFT && !goingRIGHT):
            x_velocity = -unitSize;
            y_velocity = 0;
            break;
        case(keyPressed==UP && !goingDOWN):
            x_velocity = 0;
            y_velocity = -unitSize;
            break;
        case(keyPressed==RIGHT && !goingLEFT):
            x_velocity = unitSize;
            y_velocity = 0;
            break;
        case(keyPressed==DOWN && !goingUP):
            x_velocity = 0;
            y_velocity = unitSize;
            break;
            
    }
}

function checkGameOver() {
    switch(true){
        case(snake[0].x<0):
            running = false;
            break;
        case(snake[0].x>=gameWidth):
            running = false;
            break;
        case(snake[0].y<0):
            running = false;
            break;
        case(snake[0].y>=gameHeight):
            running = false;
            break;
    }
    for(let i=1; i<snake.length; i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            running = false;
        }
    }
}

function displayGameOver() {
    context.font = "50px MV Boli";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER", gameWidth/2, gameHeight/2);
    running = false;
}

function resetGame() {
    score = 0;
    x_velocity = unitSize;
    y_velocity = 0;
    snake = [
        {x:unitSize*4, y:0},
        {x:unitSize*3, y:0},
        {x:unitSize*2, y:0},
        {x:unitSize, y:0},
        {x:0, y:0}
    ];
    gameStart();
}