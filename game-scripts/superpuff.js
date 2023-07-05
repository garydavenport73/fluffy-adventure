
        // ---------------------------GAME HERE----------------------------




        //   1 sounds
        function defineAudio() {
            blip = new Tone(220, 50, "sine", 0, 0, 0);
            fireball = new Tone(110, 333, "sawtooth", 0, 0, -30);
            insertCoin = new Tone(110, 200, "triangle", 0, 0, 0);
            swimTone = new Tone(6, 200, "sawtooth", 0, -9, -30);
            backgroundmusic = new Tone(2, 1000, "sawtooth", 0, -9, -30);
        }

        //-------2-------define frame rate-------2-------
        framesPerSecond = 45;
        // let timeLeft = framesPerSecond * 20;
        let interval = (1.0 / framesPerSecond) * 1000;


        //--------3------define characters and functions

        fishGame = new MyLittleVideoGame("Super Puff");
        useControls("lrud");
        fishGame.setLives(1);
        //constructor(name = "MyLVGame", score = 0, level = 1, lives = 3)
        fishGame.setBackgroundColor("lightblue");
        bindControlsToWindow(fishGame);
        bindButtonControls(fishGame);

        leftBorder = 0;
        topBorder = 0;
        playAreaHeight = fishGame.playAreaHeight;
        playAreaWidth = fishGame.playAreaWidth;
        let gameOver = false;

        // if (fishGame.userNameSpan.innerHTML === 'not logged in') {
        //     fishGame.userNameSpan.style.backgroundColor = "orange";
        //     fishGame.userNameSpan.style.color = "white";
        // } else {
        //     fishGame.userNameSpan.style.backgroundColor = "unset";
        //     fishGame.userNameSpan.style.color = "black";
        // }

        let blowFish = new GameCharacter("blowfish", "&#128033;", playAreaWidth / 2, playAreaHeight / 2, 0, fishGame, "2em");

        // &#128033; //blowfish
        // &#128031; //fish
        // &#128032; //tropical fish
        // &#128044; //dolphin
        // &#128025; //octopus
        // &#129425; //squid, supplentrol
        // &#129416; //shark, supplemental
        // &#129438; //lobster, supplemental

        // fish, tropical fish, dolphin, octopus, shrimp, whale, turtle, otter, alien
        let seaArray = ['&#128031;', '&#128032;', '&#128044;', '&#128025;', '&#127844;', '&#128011;', '&#128034;', '&#129446;', '&#128126;'];

        //make instructions
        const instructions = new GameCharacter("instructions", "Eat or be eaten!", playAreaWidth / 2, playAreaHeight / 3, 0, fishGame);

        //make bubbles
        let bubbles = [];
        for (let i = 0; i < 10; i++) {
            let randX = randomNumberZeroToNumber(playAreaWidth);
            let randY = randomNumberZeroToNumber(playAreaHeight);
            bubbles[i] = new GameCharacter('bubble' + i.toString(), 'o', randX, randY, 0, fishGame, "1em");
            bubbles[i].setColor("blue");


        }

        //make /12/->4 fish
        let fishes = []

        function placeFishes(fishesLeft) {
            //let fishesLeft = 4;
            fishes = [];
            for (let i = 0; i < fishesLeft; i++) {
                let randX = randomNumberZeroToNumber(playAreaWidth);
                let randY = randomNumberZeroToNumber(playAreaHeight);
                fishes[i] = new GameCharacter('fish' + i.toString(), seaArray[i % seaArray.length], randX, randY, 0, fishGame, "2em");
                fishes[i]['cycles_until_change'] = randomNumberZeroToNumber(90); //number of cycles before changing direction
                fishes[i]['count'] = 0;
                fishes[i].xVelocity = randomNumberZeroToNumber(4) - 2; //0,1,2,3,4 - 2 => result range -2 -1 0 1 2 
                fishes[i].yVelocity = randomNumberZeroToNumber(2) - 1 // 0,1,2  - 1 => -1 0 1 are possible results
                if (fishes[i].xVelocity >= 0) {
                    flipVertical(fishes[i]);
                }
            }
        }


        function moveBubbles(speed) {
            for (let i = 0; i < 10; i++) {
                //let yMove = -speed
                let xMove = 1 - randomNumberZeroToNumber(2); //gives -1, 0 or 1
                if (bubbles[i].getYPosition() - speed <= 0) {
                    //add height and restart x
                    moveCharacterTo(bubbles[i], randomNumberZeroToNumber(playAreaWidth), playAreaHeight);
                } else {
                    //move bubble up
                    moveCharacterBy(bubbles[i], 1 - randomNumberZeroToNumber(2), -speed); //gives -1, 0 or 1
                }
            }
        }

        function moveFishes() {
            for (let i = 0; i < fishes.length; i++) {
                moveCharacterBy(fishes[i], fishes[i].xVelocity, fishes[i].yVelocity);
                if ((fishes[i].getXPosition() > playAreaWidth) || (fishes[i].getXPosition() < 0)) {
                    fishes[i].xVelocity = -fishes[i].xVelocity;
                }
                if ((fishes[i].getYPosition() > playAreaHeight) || (fishes[i].getYPosition() < 0)) {
                    fishes[i].yVelocity = -fishes[i].yVelocity;
                }
                if (fishes[i].xVelocity >= 0) {
                    flipVertical(fishes[i]);
                } else {
                    unflipVertical(fishes[i]);
                }
            }
        }

        function checkForFishCollisions() {
            for (let i = 0; i < fishes.length; i++) {
                for (let j = 0; j < fishes.length; j++) {
                    if (i != j) {
                        //console.log(i, j);
                        if (collisionDetect(fishes[i], fishes[j])) {
                            soundplay(blip);
                            console.log("collision detected");
                            console.log(i, j);
                            if (fishes[i].getSizeInEms() >= fishes[j].getSizeInEms()) {
                                fishes[i].setSizeInEms((fishes[i].getSizeInEms()) + 1);
                                fishes[j].setText("");
                            } else {
                                fishes[j].setSizeInEms((fishes[j].getSizeInEms()) + 1);
                                fishes[i].setText("");
                            }
                            fishesLeft = fishesLeft - 1;
                        };
                    }

                }
            }
        }

        function checkForBlowFishCollision() {
            for (let i = 0; i < fishes.length; i++) {
                if (collisionDetect(blowFish, fishes[i])) {
                    if (blowFish.getSizeInEms() >= fishes[i].getSizeInEms()) {
                        blowFish.setSizeInEms(blowFish.getSizeInEms() + 1);
                        fishes[i].setText("");
                        fishGame.addToScore(1);
                        fishesLeft = fishesLeft - 1;
                        soundplay(insertCoin);
                    } else {
                        fishes[i].setSizeInEms(fishes[i].getSizeInEms() + 1);
                        blowFish.setText("");
                        fishGame.setLives(0);
                        gameOver = true;
                        soundplay(fireball);
                    }
                }

            }
        }

        let levelCompleted = false;

        function checkForEnd() {
            if ((fishesLeft === 0) && (gameOver === false)) {
                //alert("end");
                //gameOver = true;
                //alert("level completed");
                levelCompleted = true;
            }
            if (fishesLeft === 1) {
                for (let i = 0; i < fishes.length; i++) {
                    if (fishes[i].text != '') {
                        //alert(i);
                        if (blowFish.getSizeInEms() >= fishes[i].getSizeInEms()) {
                            //do nothing alert("you win");
                        } else {
                            //alert("you lose");
                            fishGame.setLives(0);
                            gameOver = true;

                        }
                    }
                }
            }

        }

        //-------4-------make game run with start button and restart buttons -------4-------
        document.getElementById("start-button").addEventListener("click", startGame);
        document.getElementById("restart-button").addEventListener("click", () => location.reload());

        let fishLevel = 1;
        let fishesLeft = 1;

        function startGame() {
            //makes start button dissappear
            if (document.getElementById("start-button").style.display != "none") { //if not undefined
                document.getElementById("start-button").style.display = "none";
            }

            instructions.setText("");
            defineAudio();
            soundplay(insertCoin); //Need to restart here
            //soundplay(backgroundmusic);
            loopsound(backgroundmusic);
            //start game loop
            placeFishes(fishLevel);
            fishesLeft = fishLevel;
            setTimeout(() => {
                myGameLoopTicker = setInterval(gameLoop, interval);
            }, 1000);
        }

        //----------game loop ---------------

        function gameLoop() {
            moveBubbles(1);
            moveFishes();
            checkForFishCollisions();
            if (respondToControlsWithMove(blowFish, -1, 1, -1, 1, true)) {
                soundplay(swimTone);
            }

            checkForBlowFishCollision();
            checkForEnd();

            if (gameOver === true) {

                message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, fishGame, "1rem");
                clearInterval(myGameLoopTicker);
                stopsound(backgroundmusic); //
                // /////////////UPDATE SCORES IN DATABASE /////////////

                                // let thisGame = fishGame; //!!!! change this line for each game

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
                }, 3000)
            } else if (levelCompleted === true) {
                message = new GameCharacter("messageid", "Level Completed", playAreaWidth / 2.0, playAreaHeight * .75, 0, fishGame, "1rem");
                clearInterval(myGameLoopTicker);
                stopsound(backgroundmusic); //

                setTimeout(() => {
                    removeCharacter(message);
                    //-------6------- At end of game, add start button back-------6-------
                    //document.getElementById("restart-button").style.display = "inline-block";
                    levelCompleted = false;
                    fishLevel += 1;
                    fishGame.increaseLevel(1);
                    blowFish.setSizeInEms(2);
                    moveCharacterTo(blowFish, playAreaWidth / 2, playAreaHeight / 2);
                    startGame();
                }, 3000)

            }
        }
        //----------0-------android games modifications---------------
        //<main character>🐡</main character>
            document.getElementById("userName").innerHTML=window.document.title;
        document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
 