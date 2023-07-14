

// ---------------------------GAME HERE----------------------------
//-------1-------define audio-------1-------
let introMusic;
//let insertCoin;
let breakingGlass;
function defineAudio() {

    //introMusic = new Tone(330, 2000, "sine", 0, 0, 0);
    //introMusic = new Audio("intro99bottles.mp3");
    introMusic = powerUp;
    //insertcoin = new Tone(110, 200, "triangle", 0, 0, -6);
    //insertcoin = new Audio("insertcoin.mp3");
    insertCoin = insertCoin;

    //breakingGlass = new Tone(110, 300, "sawtooth", 0, 0, -15);
    breakingGlass = hitHurt;
    //breakingGlass = new Audio("breakingglass.mp3");
    //footsteps = new Tone(3, 500, "square", 2, -5, -12);
    //backGroundLoop=loopsound(footsteps);
}

//-------2-------define frame rate-------2-------
framesPerSecond = 45;
let interval = (1.0 / framesPerSecond) * 1000;

//-------3-------Initialize Game Put Stuff on Screen Define Variables-------3-------
//let secretKey = "";
//let gameIdentifier = "";
userName = "mystery person";
let lastBottleCaught = false;
let firstRun = true;
let bottleGame = new MyLittleVideoGame("99 Bottles");
//options     slr   sud lr  ud s lrud standard
useControls("lr");
bottleGame.setBackgroundColor("beige");
bottleGame.setLives(7);
bindControlsToWindow(bottleGame);
bindButtonControls(bottleGame);
leftBorder = 0;
topBorder = 0;
playAreaHeight = bottleGame.playAreaHeight;
playAreaWidth = bottleGame.playAreaWidth;
//make bottles
const columnwidth = playAreaWidth / 11.0;
const columnheight = 20;
let bottles = [];
for (let j = 0; j < 10; j++) {
    let row = [];
    for (let i = 0; i < 10; i++) {
        let tempCharacter = new GameCharacter("bottle" + i.toString(), "&#127866", (i + 1) * columnwidth, (j + 2) * columnheight, 0, bottleGame, "1rem");
        row.push(tempCharacter);
    }
    bottles.push(row);
}
const bartender = new GameCharacter("bartender", "&#128116", columnwidth, columnheight, 0, bottleGame, "1.4rem");
moveCharacterTo(bartender, columnwidth, bartender.getCharacterHeight());
const catcher = new GameCharacter("catcher", "&#128080", playAreaWidth / 2.0, playAreaHeight, 0, bottleGame, "2rem");
moveCharacterBy(catcher, 0, -catcher.getCharacterHeight());
let bottleRow = 0;
let bottleNumber = 0;
let xVel = 0;
let yAcc = 0;
if (bottleNumber < 5) {
    xVel = 2;
} else {
    xVel = -2;
}
yAcc = 0.3;
let timeCount = 0;
currentBottle = bottles[bottleRow][bottleNumber];
let caught = true;

//-------4-------make game run with start button and restart buttons -------4-------
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("restart-button").addEventListener("click", () => location.reload());

function startGame() {
    //makes start button dissappear
    this.style.display = "none";
    defineAudio();
    //start game loop
    soundplay(insertCoin);
    // alert(userName);
    setTimeout(() => {
        myGameLoopTicker = setInterval(gameLoop, interval);
    }, 1000);
}

//-------5------- Make Game Loop -------5-------
function gameLoop() {
    //move catcher
    respondToControlsWithMove(catcher, -7, 7, 0, 0);
    //move current bottle
    moveCharacterBy(currentBottle, xVel, yAcc * timeCount)
    //check for catch
    if (collisionDetect(catcher, currentBottle) == true) {
        catchMessage = new GameCharacter("caughtmessageid", "Good catch!", playAreaWidth * .9, playAreaHeight * .75, 30, bottleGame, "1rem");
        // catchMessage.setBackgroundColor("tan");
        catchMessage.setColor("green");
        soundplay(blip);
        bottleGame.addToScore(1);
        caughtBottle = currentBottle;
        caughtBottle.setText("");
        bottleNumber += 1;
        bottleNumber = bottleNumber % 10;
        if (bottleRow == 9 && bottleNumber == 9) {
            winMessage = new GameCharacter("winmessageid", "You Won!", playAreaWidth / 2.0, playAreaHeight * .75, 0, bottleGame, "1rem");
            soundplay(powerUp);
            //end of game reached
            clearInterval(myGameLoopTicker);
        } else {
            if (bottleNumber == 0) {
                bottleRow += 1;
            }
            if (bottleNumber < 5) {
                xVel = 2;
            } else {
                xVel = -2;
            }
        }
        timeCount = 0;
        currentBottle = bottles[bottleRow][bottleNumber];
        moveCharacterTo(bartender, currentBottle.xPosition, (bottleRow + 1) * columnheight);
        setTimeout(() => {
            removeCharacter(catchMessage);
        }, 777)
    }
    // check for collision with ground
    if (currentBottle.yPosition >= playAreaHeight) {
        soundplay(breakingGlass);
        bottleGame.subtractLives(1);
        groundBottle = currentBottle;
        groundBottle.setText("");
        bottleNumber += 1;
        bottleNumber = bottleNumber % 10;
        if ((bottleRow == 9 && bottleNumber == 9 && bottleGame.getLives() > 0)) { //end of bottles, still with lives wins
            message = new GameCharacter("messageid", "You Won!", playAreaWidth / 2.0, playAreaHeight * .75, 0, bottleGame, "1rem");
            //end of game reached
            soundplay(introMusic);
            clearInterval(myGameLoopTicker);
        } else if (
            (bottleRow == 9 && bottleNumber == 9 && bottleGame.getLives() <= 0) ||
            (bottleGame.getLives() <= 0)
        ) { //end of bottles, no lives loses


            message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, bottleGame, "1rem");
            //end of game reached
            soundplay(introMusic);
            clearInterval(myGameLoopTicker);


            // /////////////UPDATE SCORES IN DATABASE /////////////

            // let finalScore = parseInt(document.getElementById("score").innerHTML);
            // let currentHighScore = parseInt(document.getElementById("highScore").innerHTML);

            // if (finalScore > currentHighScore) {

            //     alert('new high score');
            //     let online = navigator.onLine;
            //     //alert("online");
            //     //alert(online);

            //     if (online != false) {

            //         gameIdentifier = gameIdentifier;
            //         secretKey = secretKey;

            //         //using POST//
            //         let xmlhttp = new XMLHttpRequest();
            //         xmlhttp.open('POST', '../../includes/insert-new-highscore.php', true);
            //         xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            //         xmlhttp.onload = function() {
            //             // do something with response or after response
            //             //console.log(this.responseText);
            //             window.location.href = window.location.href; //reload window because there is not high score
            //         };

            //         let postString = 'gameidentifier=' + gameIdentifier + '&finalscore=' + finalScore + '&secretkey=' + secretKey;
            //         //alert(postString);
            //         xmlhttp.send(postString);
            //     }
            // }

            // ////////////////////////////////////////////////////

            setTimeout(() => {
                removeCharacter(message);
                //-------6------- At end of game, add start button back-------6-------
                document.getElementById("restart-button").style.display = "inline-block";
            }, 5000)
        } else {
            if (bottleNumber == 0) {
                bottleRow += 1;
            }
            if (bottleNumber < 5) {
                xVel = 2;
            } else {
                xVel = -2;
            }
            hitsGroundMessage = new GameCharacter("hitsground", "Crash!", .1 * playAreaWidth, .75 * playAreaHeight, -30, bottleGame, "1rem");
            hitsGroundMessage.setColor("red");
            setTimeout(() => {
                removeCharacter(hitsGroundMessage);
            }, 500);
        }
        timeCount = 0;
        currentBottle = bottles[bottleRow][bottleNumber];
        moveCharacterTo(bartender, currentBottle.xPosition, (bottleRow + 1) * columnheight);
    }
    timeCount += 1;
}


//----------0-------android games modifications---------------
//<main character>🍺</main character>
document.getElementById("userName").innerHTML = window.document.title;
document.getElementById("highScore").innerHTML = "<a href='https://www.charwars.net'>CharWars</>";
