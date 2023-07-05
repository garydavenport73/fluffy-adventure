
// ---------------------------GAME HERE----------------------------

//-------1-------define audio-------1-------
function defineAudio() {

gunshot = new Tone(110, 100, "sawtooth", 12, 0, -12);
helicopterChange = new Tone(8, 500, "square", 0, -6, -24);
carMoving = new Tone(4, 500, "square", 0, -6, -24);
backgroundmusic = new Tone(4, 1000, "square", 0, -2, -24);
crash = new Tone(110, 400, "triangle", 0, 0, 0);
insertcoin = new Tone(330, 400, "triangle", -3, -3, -6);
}

//-------2-------define frame rate-------2-------
framesPerSecond = 45;
let interval = (1.0 / framesPerSecond) * 1000;

//-------3-------define characters and functions------3-------

let dogderGame = new MyLittleVideoGame("Dodger");
useControls("sud");
dogderGame.setLevel(1);
bindControlsToWindow(dogderGame);
bindButtonControls(dogderGame);


leftBorder = 0;
topBorder = 0;
playAreaHeight = dogderGame.playAreaHeight;
playAreaWidth = dogderGame.playAreaWidth;

const car = new GameCharacter("car", "&#128663", 20, playAreaHeight / 2, 0, dogderGame, "2.5rem");
flipVertical(car);
const carSpeed = [];
const lines = [];
slowSpeed = 3;
fastSpeed = 5;
const joggers = [];
let counter = 0;
spawnFrequency = 1;


lines0 = new GameCharacter("line0", "-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n", playAreaWidth / 2, playAreaHeight / 2, 0, dogderGame, "2rem");
lines0.setColor("orange");

lines1 = new GameCharacter("line1", "-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n-   -   -   -\n", playAreaWidth / 2 + playAreaWidth, playAreaHeight / 2, 0, dogderGame, "2rem");
lines1.setColor("orange");


function moveLines() {
if (dogderGame.getControlSpace()) {
    speed = fastSpeed;
    soundplay(helicopterChange);
} else {
    speed = slowSpeed;
}
moveCharacterBy(lines0, -speed, 0);
moveCharacterBy(lines1, -speed, 0)

let trailingX = 0;
let leadingX = 0;

if (lines0.getXPosition() < lines1.getXPosition()) {
    leadingX = lines0.getXPosition();
    leadingLine = lines0;
    trailingX = lines1.getXPosition();
    trailingLine = lines1;
} else {
    leadingX = lines1.getXPosition();
    leadingLine = lines1;
    trailingX = lines0.getXPosition();
    trailingLine = lines0;
}

if (trailingLine.getXPosition() <= 1 / 2 * playAreaWidth) {
    let tempX = trailingLine.getXPosition();
    leadingLine.xPosition = trailingLine.getXPosition() + playAreaWidth;
}
}

function moveCar() {
if (respondToControlsWithMove(car, 0, 0, -5, 5)) {
    soundplay(carMoving);
};
}

function makeJogger() {
let joggerIndex = joggers.length;
jogger = new GameCharacter("jogger" + joggerIndex, "&#127939", playAreaWidth, 20 + randomNumberZeroToNumber(playAreaHeight - 40), 0, dogderGame, "1.5rem");
jogger["garbage"] = false;


jogger["speed"] = randomNumberZeroToNumber(4);
if (randomNumberZeroToNumber(1)) {
    jogger["speed"] *= -1;
}

//console.log("making jogger, jogger speed" + jogger["speed"]);
return jogger;
}

function moveJoggers() {
for (jogger of joggers) {
    //console.log(jogger.speed)
    moveCharacterBy(jogger, -speed, -jogger["speed"]);
}
}

startSidewalk = new GameCharacter("startSidewalk", "&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637", playAreaWidth / 2, playAreaHeight - 20, 0, dogderGame, "2rem");
startSidewalk.characterElement.classList.add("grey");
finishSidewalk = new GameCharacter("finishSidewalk", "&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637", playAreaWidth / 2, 20, 0, dogderGame, "2rem");
finishSidewalk.characterElement.classList.add("grey");

alreadyCollided = false;
alreadyCollidedTopWalk = false;


//-------4-------make game run with start button and restart buttons -------4-------
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("restart-button").addEventListener("click", () => location.reload());

function startGame() {
//makes start button dissappear
if (document.getElementById("start-button").style.display != "none") { //if not undefined
    document.getElementById("start-button").style.display = "none";
}
defineAudio();

soundplay(insertcoin); //Need to restart here
//soundplay(backgroundmusic);
loopsound(backgroundmusic);


//start game loop
setTimeout(() => {
    myGameLoopTicker = setInterval(gameLoop, interval);
}, 1000);

}

//-------5------- Make Game Loop -------5-------
function gameLoop() {

moveLines();
moveCar();
moveJoggers();
//console.log("joggers: " + joggers.length);
if (randomNumberZeroToNumber(300) <= spawnFrequency) {
    joggers.push(makeJogger());
}

counter += 1;
if (counter % 1000 === 0) {
    counter = 0;
    spawnFrequency += 2;
    //alert("increased!");
    let factor = (slowSpeed + 1) / slowSpeed;
    if (fastSpeed * factor >= car.width) {
        //do nothing
    } else {
        slowSpeed = slowSpeed * factor;
        fastSpeed = fastSpeed * factor;
        //alert(slowSpeed, fastSpeed);
        for (jogger of joggers) {
            jogger["speed"] = factor * jogger["speed"]
        }
    }
    spinningMessage("Level up!", dogderGame);
    soundplay(insertcoin);
    dogderGame.increaseLevel(1);
}

//handle jogger off screen
for (jogger of joggers) {
    if ((jogger.getXPosition() < 0) || (jogger.getYPosition() < 0) || (jogger.getYPosition() > playAreaHeight)) {
        removeCharacter(jogger);
        jogger["garbage"] = true;
        if (jogger.text != "X") {
            dogderGame.addToScore(1);
            soundplay(gunshot);
        }
    }
}

for (let i = joggers.length - 1; i >= 0; i--) {
    //console.log("garbage", joggers[i]["garbage"]);
    if (joggers[i]["garbage"] === true) {
        joggers.splice(i, 1);
    }
}

//handle jogger/car collision

for (jogger of joggers) {
    if (collisionDetect(car, jogger)) {
        if (jogger.text != "X") {
            jogger.setText("X");
            spinningMessage("Ouch!", dogderGame);
            dogderGame.subtractLives(1);
            soundplay(crash);
        }

    }
}


//GAME OVER SEQUENCE
if (dogderGame.getLives() <= 0) {

    message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, dogderGame, "1rem");

    clearInterval(myGameLoopTicker);
    stopsound(backgroundmusic); //

    if (document.getElementById('userName').innerHTML === "not logged in") {
        message2 = new GameCharacter("message2id", "You must be logged in \n to save high score.", playAreaWidth / 2.0, playAreaHeight * .25, 0, dogderGame, "1rem");
    }

    /////////////UPDATE SCORES IN DATABASE /////////////
    // let thisGame = dogderGame; //!!!! change this line for each game

    // let finalScore = parseInt(document.getElementById("score").innerHTML);
    // let currentHighScore = parseInt(document.getElementById("highScore").innerHTML);

    // if (finalScore > currentHighScore) {
    //     if (document.getElementById('userName').innerHTML === "not logged in") {
    //         message2 = new GameCharacter("message2id", "You must be logged in \n to save high score.", playAreaWidth / 2.0, playAreaHeight * .25, 0, thisGame, "1rem");
    //         //do nothing
    //     } else {
    //         //alert('new high score');
    //         message3 = new GameCharacter("message3id", "NEW HIGH SCORE!!!", playAreaWidth / 2.0, playAreaHeight * .25, 0, thisGame, "1rem");
    //         let online = navigator.onLine;
    //         //alert("online");
    //         //alert(online);

    //         if (online != false) {

    //             gameIdentifier = gameIdentifier;
    //             secretKey = secretKey;

    //             //using POST//
    //             let xmlhttp = new XMLHttpRequest();
    //             xmlhttp.open('POST', '../../includes/insert-new-highscore.php', true);
    //             xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    //             xmlhttp.onload = function() {
    //                 // do something with response or after response
    //                 //alert(this.responseText);
    //                 //console.log(this.responseText);
    //                 setTimeout(() => {
    //                     window.location.href = window.location.href; //reload window because there is not high score
    //                 }, 3000);
    //             };

    //             let postString = 'gameidentifier=' + gameIdentifier + '&finalscore=' + finalScore + '&secretkey=' + secretKey;
    //             //alert(postString);
    //             xmlhttp.send(postString);
    //         }
    //     }
    // }
    ////////////////////////////////////////////////////
    setTimeout(() => {
        removeCharacter(message);
        //-------6------- At end of game, add start button back-------6-------
        document.getElementById("restart-button").style.display = "inline-block";
    }, 3000)
}
}

    //----------0-------android games modifications---------------
    //<main character>🚗</main character>
    document.getElementById("userName").innerHTML=window.document.title;
    document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
