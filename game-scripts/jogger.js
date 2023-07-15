
// ---------------------------GAME HERE----------------------------




//-------1-------define audio-------1-------
function defineAudio() {

    //footsteps = new Tone(2.5, 500, "square", 2, -5, -12);
    footsteps=footstep;
    //clover = new Tone(333, 440, "triangle", 0, 0, 0);
    //crash = new Tone(110, 400, "triangle", 0, 0, 0);
    crash=explosion;
    //insertcoin = new Tone(330, 400, "triangle", -3, -3, -6);
    insertcoin=insertCoin;
    //footsteps = new Audio("footsteps.mp3");
    //crash = new Audio("crash.mp3");
    //insertcoin = new Audio("insertcoin.mp3");



}

//-------2-------define frame rate-------2-------
framesPerSecond = 45;
let interval = (1.0 / framesPerSecond) * 1000;

//-------3-------Initialize Game Put Stuff on Screen Define Variables-------3-------

function checkForCollisions(jogger, cars) {

    for (let car of cars) {
        if (collisionDetect(jogger, car) === true) {
            return true;
            // alert("collision!");
        }
    }
    return false;
}

let joggerGame = new MyLittleVideoGame("Jogger");
//options     slr   sud lr  ud s lrud standard
useControls("lrud");
bindControlsToWindow(joggerGame);
bindButtonControls(joggerGame);


leftBorder = 0;
topBorder = 0;
playAreaHeight = joggerGame.playAreaHeight;
playAreaWidth = joggerGame.playAreaWidth;

const cars = [];
const carSpeed = [];
const lines = [];

//make lanes
for (let i = 0; i < 8; i++) {
    laneHeight = playAreaHeight / 10.0;
    lines[i] = new GameCharacter("line" + i.toString(), "&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548&#9548", playAreaWidth / 2, laneHeight * (i + 2) - 12, 0, joggerGame, "2rem");

    lines[i].characterElement.classList.add("orange");


}

//make cars
carTypes = ["&#128654", "&#128664", "&#128662", "&#128660", "&#127943"];
for (let i = 0; i < 7; i++) {
    randx = randomNumberZeroToNumber(playAreaWidth - 30) + 10;
    laneHeight = playAreaHeight / 10.0;
    randomCarIndex = randomNumberZeroToNumber(4);
    cars[i] = new GameCharacter("car" + i.toString(), carTypes[randomCarIndex], randx, laneHeight * (i + 2), 0, joggerGame, "2rem");
    // cars[i] = new GameCharacter("car" + i.toString(), "&#128664", randx, laneHeight * (i + 2), 0, joggerGame);
    carSpeed[i] = randomNumberZeroToNumber(4) + 1;
    temprandom = randomNumberZeroToNumber(1); //make 50% of cars negative
    if (temprandom === 0) {-carSpeed[i]; }
}
//make sidewalks
startSidewalk = new GameCharacter("startSidewalk", "&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637", playAreaWidth / 2, playAreaHeight - 20, 0, joggerGame, "2rem");
startSidewalk.characterElement.classList.add("grey");
finishSidewalk = new GameCharacter("finishSidewalk", "&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637", playAreaWidth / 2, 20, 0, joggerGame, "2rem");
finishSidewalk.characterElement.classList.add("grey");

//make jogger
jogger = new GameCharacter("jogger", "&#127939", playAreaWidth / 2, playAreaHeight - 20, 0, joggerGame, "2rem");

function moveCars(cars, carSpeed) {
    for (let i = 0; i < 7; i++) {
        if (cars[i].getXPosition() > playAreaWidth - cars[i].getCharacterWidth() / 2.0) {
            moveCharacterBy(cars[i], -playAreaWidth + cars[i].getCharacterHeight(), 0);
        } else {
            moveCharacterBy(cars[i], carSpeed[i], 0);
        }
    }
}

alreadyCollided = false;
alreadyCollidedTopWalk = false;


//-------4-------make game run with start button and restart buttons -------4-------
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("restart-button").addEventListener("click", () => location.reload());

function startGame() {
    //makes start button dissappear
    this.style.display = "none";
    defineAudio();
    soundplay(insertCoin)
    //start game loop
    setTimeout(() => {
        myGameLoopTicker = setInterval(gameLoop, interval);
    }, 1000);

}

//-------5------- Make Game Loop -------5-------
function gameLoop() {
    //console.log("game looping",myGame,mainCharacter,villain);
    if ((alreadyCollided === false) && (alreadyCollidedTopWalk === false)) {
        moving = respondToControlsWithMove(jogger, -5, 5, -5, 5);
        //console.log(moving);
        if (moving) {
            soundplay(footsteps);
        }
    }

    moveCars(cars, carSpeed);

    //check for collision with car
    if (checkForCollisions(jogger, cars) === true) {
        if (alreadyCollided === false) {
            //collision code here
            //turn person into grave marker
            jogger.setText("&#129702");
            joggerGame.subtractLives(1);
            alreadyCollided = true;
            if (isPlaying(footsteps) === true) {
                stopsound(footsteps);
            }
            soundplay(crash);
            //soundplay("crash.mp3");

            //
            setTimeout(() => {
                //place person at origin
                moveCharacterTo(jogger, playAreaWidth / 2.0, playAreaHeight - jogger.getCharacterHeight() / 2.0);
                //change back to person
                jogger.setText("&#127939");
                //set already collided to false
                alreadyCollided = false;

            }, 3000);
            // in change person back to person in and place at original spot
        }
    }

    //check for collision with car
    // if (collisionDetect(jogger, finishSidewalk,1)===true){
    if (jogger.getYPosition() <= jogger.getCharacterHeight() / 2) {
        if (alreadyCollidedTopWalk === false) {
            //collision code here
            //turn person into grave marker
            jogger.setText("&#127941");
            joggerGame.addToScore(1);
            alreadyCollidedTopWalk = true;
            if (isPlaying(footsteps) === true) {
                stopsound(footsteps);
            }
            //soundplay("insertcoin.mp3");
            soundplay(pickupCoin);
            //
            setTimeout(() => {
                //place person at origin
                moveCharacterTo(jogger, playAreaWidth / 2.0, playAreaHeight - jogger.getCharacterHeight() / 2.0);
                //change back to person
                jogger.setText("&#127939");
                //set already collided to false
                alreadyCollidedTopWalk = false;

            }, 3000);
            // in change person back to person in and place at original spot
        }
    }


    if (joggerGame.getLives() <= 0) {

        message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, joggerGame, "1rem");
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
        }, 5000)
    }
}




        //----------0-------android games modifications---------------
        document.getElementById("userName").innerHTML=window.document.title;
        document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
//<main character>🏃</main character>
