
// ---------------------------GAME HERE----------------------------
let gunshot;
let fireball;
let cowSound;
//let insertCoin;

function defineAudio() {
    //gunshot = new Tone(110, 100, "sawtooth", 12, 0, -12);
    //gunshot = new Audio("gunshot.mp3");
    gunshot=laserShoot;

    //fireball = new Tone(110, 333, "sawtooth", 0, 0, -12);
    fireball=explosion;
    //fireball = new Audio("fireball.mp3");

    //cowSound = new Tone(55, 1000, "sawtooth", 0, 0, -12);
    //cowSound = new Audio("dead_cow.mp3");
    cowSound=hitHurt;
    //insertCoin = new Tone(110, 200, "triangle", 0, 0, 0);
    //insertCoin = new Audio("insertcoin.mp3");
    insertCoin=insertCoin;
}


//-------2-------define frame rate-------2-------
framesPerSecond = 45;
let timeLeft = framesPerSecond * 20;
let interval = (1.0 / framesPerSecond) * 1000;

let cowDefender = new MyLittleVideoGame("Cow Defender");
//options     slr   sud lr  ud s lrud standard
useControls("slr");
cowDefender.setBackgroundColor("lightblue");
bindControlsToWindow(cowDefender);
bindButtonControls(cowDefender);

leftBorder = 0;
topBorder = 0;
playAreaHeight = cowDefender.playAreaHeight;
playAreaWidth = cowDefender.playAreaWidth;

//make baseDefender

const grass = new GameCharacter('grass', '&#9600;&#9600;&#9600;', playAreaWidth / 2, playAreaHeight, 0, cowDefender, "17em");
grass.setColor('limegreen');

const baseDefender = new GameCharacter("base-defender", "&#9544", playAreaWidth / 2.0, playAreaHeight, 0, cowDefender);
const circle = new GameCharacter("base-defender", "&#9678", playAreaWidth / 2.0, playAreaHeight, 0, cowDefender);

const meteor = new GameCharacter('meteor', '&#129364;', randomNumberZeroToNumber(playAreaWidth) / 2, 10, 0, cowDefender, "1.4em");
const cow = new GameCharacter('cow', '&#128004;', 40 + randomNumberZeroToNumber(playAreaWidth - 80), playAreaHeight - 10, 0, baseDefender, "3em");

const moon = new GameCharacter('moon', '&#127769;', playAreaWidth * .75, playAreaHeight * .20, 0, cowDefender, "1.7em");

const tree1 = new GameCharacter('tree1', '&#127794', playAreaWidth - 40, playAreaHeight - 125, 0, cowDefender, "3em");
const tree2 = new GameCharacter('tree2', '&#127794', playAreaWidth - 10, playAreaHeight - 100, 0, cowDefender, "4em");
const tree3 = new GameCharacter('tree3', '&#127794', playAreaWidth - 20, playAreaHeight - 80, 0, cowDefender, "4em");
const tractor = new GameCharacter('tractor', '&#128668;', playAreaWidth / 5, playAreaHeight - 80, 0, cowDefender, "2em");

flipVertical(cow);


circle.setSizeInRems("2rem");
baseDefender.setSizeInRems("2rem");
circle.setColor("grey");

let missileNestX = baseDefender.getXPosition();
let missileNestY = baseDefender.getYPosition() - baseDefender.height / 2;
missile = new GameCharacter("missile", "o", missileNestX, missileNestY, 0, cowDefender);

moveCharacterBy(circle, 0, -circle.getCharacterHeight() / 2.0);
moveCharacterBy(baseDefender, 0, -baseDefender.getCharacterHeight() / 2.0);

let missileXVelocity = 0;
let missileYVelocity = 0;

let cowVelocity = 1;

let moonVelocity = -0.1;



let missileFlying = false;


//-------4-------make game run with start button and restart buttons -------4-------
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("restart-button").addEventListener("click", () => location.reload());

function startGame() {
    //makes start button dissappear


    this.style.display = "none";
    defineAudio();
    soundplay(insertCoin);
    //start game loop
    setTimeout(() => {
        myGameLoopTicker = setInterval(gameLoop, interval);
    }, 1000);

}


function gameLoop() {



    if ((cow.getXPosition() >= playAreaWidth - cow.width / 2) || (cow.getXPosition() <= 0 + cow.width / 2)) {
        cowVelocity = -cowVelocity;
        if (cowVelocity > 0) {
            flipVertical(cow);
        } else {
            unflipVertical(cow);
        }


    }

    moveCharacterBy(moon, moonVelocity, 0);

    if (moon.getXPosition() <= moon.width) {
        moveCharacterTo(moon, playAreaWidth - 20, moon.getYPosition());
    }

    moveCharacterBy(cow, cowVelocity, 0);

    respondToControlsWithRotate(baseDefender, 5, 5, 0, 0);

    // if (cowDefender.getControlSpace()) {
    //     alert("space");
    // }



    if ((meteor.getYPosition() >= playAreaHeight - meteor.height / 2) || (collisionDetect(meteor, baseDefender))) {

        if (meteor.text != "") {
            meteor.setText("&#128293;"); //hits ground
            soundplay(fireball);

        }


        setTimeout(() => {
            if (meteor.text != ('&#129364;')) {
                moveCharacterTo(meteor, randomNumberZeroToNumber(playAreaWidth) / 2, 10);
                cowDefender.subtractLives(1);
                meteor.setText('&#129364;');
            }

        }, 500);

    } else {
        moveCharacterBy(meteor, randomNumberZeroToNumber(2), 3);
        if (meteor.getXPosition() > playAreaWidth) {
            moveCharacterTo(meteor, playAreaWidth, getYPosition(meteor));
        } else if (meteor.getXPosition() < 0) {
            moveCharacterTo(meteor, 0, getYPosition(meteor));
        }
    }


    // if (cowDefender.getControlSpace()) {
    //     //console.log(getAngle(baseDefender));
    // }

    if ((cowDefender.getControlSpace() === true) && (missileFlying === false)) {

        missileFlying = true;

        //console.log(getAngle(baseDefender));

        missileXVelocity = 5 * Math.sin((getAngle(baseDefender) * Math.PI / 180));
        missileYVelocity = -5 * Math.cos((getAngle(baseDefender) * Math.PI / 180));
        //missileYVelocity = 5 * Math.cos(getAngle(baseDefender));
        soundplay(gunshot);
    }

    if ((missile.getYPosition() < (0 + missile.height / 2)) ||
        (missile.getYPosition() > (playAreaHeight - missile.height / 2)) ||
        (missile.getXPosition() < (0 + missile.width / 2)) ||
        (missile.getXPosition() > (playAreaWidth - missile.width / 2))) {
        missileFlying = false;
        moveCharacterTo(missile, missileNestX, missileNestY);
        missileXVelocity = 0;
        missileYVelocity = 0;
    }

    moveCharacterBy(missile, missileXVelocity, missileYVelocity);




    if (collisionDetect(missile, meteor, 0.7)) {

        meteor.setText("");

        missile.setText('&#128165;');
        missileXVelocity = 0;
        missileYVelocity = 0;
        soundplay(fireball);

        setTimeout(() => {
            missileFlying = false;
            missile.setText("o");
            moveCharacterTo(missile, missileNestX, missileNestY);
        }, 1000);

        setTimeout(() => {
            if (meteor.text != ('&#129364;')) {
                moveCharacterTo(meteor, randomNumberZeroToNumber(playAreaWidth) / 2, 10);
                cowDefender.addToScore(1);
                meteor.setText('&#129364;');
            }

        }, 1000);

    }

    if (collisionDetect(cow, meteor)) {
        if (meteor.text != "&#128293;") {
            // cow.setText("deadcow");
            flipHorizontal(cow);
            cowVelocity = 0;
            cowDefender.setLives(1);
            soundplay(cowSound);
            spinningMessage("Critical hit!!!", cowDefender, 1.7);
        }

        //alert("cow hit");
    }

    if (cowDefender.getLives() <= 0) {

        message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, cowDefender, "1rem");
        clearInterval(myGameLoopTicker);


        // /////////////UPDATE SCORES IN DATABASE /////////////

        // let finalScore = parseInt(document.getElementById("score").innerHTML);
        // let currentHighScore = parseInt(document.getElementById("highScore").innerHTML);

        // if (finalScore > currentHighScore) {

        //     alert('new high score');
        //     let online = navigator.onLine;




        //     if (online != false) {

        //         gameIdentifier = gameIdentifier;
        //         secretKey = secretKey;

        //         //using POST//
        //         let xmlhttp = new XMLHttpRequest();
        //         xmlhttp.open('POST', '../../includes/insert-new-highscore.php', true);
        //         xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        //         xmlhttp.onload = function() {
        //             // do something with response or after response
        //             //alert(this.responseText);
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
        }, 3000)



        // setTimeout(() => {
        //     //moveCharacterTo(meteor, playAreaWidth / 2, playAreaHeight / 2);
        //     //meteor.setText("GAME OVER");
        // }, 1500);
    }
}

// framesPerSecond = 45;
// let interval = (1.0 / framesPerSecond) * 1000;
// myGameLoopTicker = setInterval(gameLoop, interval);
//----------0-------android games modifications---------------

//<main character>🐄</main character>
document.getElementById("userName").innerHTML = window.document.title;
document.getElementById("highScore").innerHTML = "<a href='https://www.charwars.net'>CharWars</>";