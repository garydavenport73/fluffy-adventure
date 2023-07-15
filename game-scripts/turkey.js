
        // ---------------------------GAME HERE----------------------------
        //-------1-------define audio-------1-------
        function defineAudio() {
            //gunshot = new Tone(110, 100, "sawtooth", 12, 0, -12);
            //heliopterChange = new Tone(8, 500, "square", 0, -6, -24);
            //turkeyMoving = new Tone(6, 500, "square", 0, -6, -24);
            backgroundmusic = wind;//new Tone(4, 1000, "square", 0, -2, -24);
            crash = explosion;//new Tone(110, 400, "triangle", 0, 0, 0);
            insertcoin = insertCoin;//new Tone(330, 400, "triangle", -3, -3, -6);
        }

        //-------2-------define frame rate-------2-------
        framesPerSecond = 45;
        let interval = (1.0 / framesPerSecond) * 1000;

        //-------3-------define characters and functions------3-------

        let turkeyGame = new MyLittleVideoGame("Turkey");
        useControls("sud");
        turkeyGame.setLevel(1);
        turkeyGame.setBackgroundColor("lightgreen");
        bindControlsToWindow(turkeyGame);
        bindButtonControls(turkeyGame);


        leftBorder = 0;
        topBorder = 0;
        playAreaHeight = turkeyGame.playAreaHeight;
        playAreaWidth = turkeyGame.playAreaWidth;

        const turkey = new GameCharacter("turkey", "&#129411;", 20, playAreaHeight / 2, 0, turkeyGame, "2.5rem");
        flipVertical(turkey);
        const turkeySpeed = [];
        const plants = [];
        slowSpeed = 3;
        fastSpeed = 5;
        const knives = [];
        let counter = 0;
        spawnFrequency = 2;


        plants0 = new GameCharacter("line0", ".   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n", playAreaWidth / 2, playAreaHeight / 2, 0, turkeyGame, "2rem");
        plants0.setColor("green");

        plants1 = new GameCharacter("line1", ".   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n", playAreaWidth / 2 + playAreaWidth, playAreaHeight / 2, 0, turkeyGame, "2rem");
        plants1.setColor("green");


        function moveLines() {
            if (turkeyGame.getControlSpace()) {
                speed = fastSpeed;
                soundplay(footstep);
            } else {
                speed = slowSpeed;
            }
            moveCharacterBy(plants0, -speed, 0);
            moveCharacterBy(plants1, -speed, 0)

            let trailingX = 0;
            let leadingX = 0;

            if (plants0.getXPosition() < plants1.getXPosition()) {
                leadingX = plants0.getXPosition();
                leadingLine = plants0;
                trailingX = plants1.getXPosition();
                trailingLine = plants1;
            } else {
                leadingX = plants1.getXPosition();
                leadingLine = plants1;
                trailingX = plants0.getXPosition();
                trailingLine = plants0;
            }

            if (trailingLine.getXPosition() <= 1 / 2 * playAreaWidth) {
                let tempX = trailingLine.getXPosition();
                leadingLine.xPosition = trailingLine.getXPosition() + playAreaWidth;
            }
        }

        function moveTurkey() {
            if (respondToControlsWithMove(turkey, 0, 0, -5, 5)) {

                rotateToAngle(turkey,20,"vertical");
            }else{
                rotateToAngle(turkey,0,"vertical");
            };
        }

        function makeKnive() {
            let kniveIndex = knives.length;
            knive = new GameCharacter("knive" + kniveIndex, "&#128298;", playAreaWidth, 20 + randomNumberZeroToNumber(playAreaHeight - 40), 0, turkeyGame, "1.5rem");
            knive["garbage"] = false;


            knive["speed"] = randomNumberZeroToNumber(4);
            if (randomNumberZeroToNumber(1)) {
                knive["speed"] *= -1;
            }

            //console.log("making knive, knive speed" + knive["speed"]);
            return knive;
        }

        function moveKnives() {
            for (knive of knives) {
                //console.log(knive.speed)
                moveCharacterBy(knive, -speed, -knive["speed"]);
                rotateByAngle(knive,10);
            }
        }

        // startSidewalk = new GameCharacter("startSidewalk", "&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637", playAreaWidth / 2, playAreaHeight - 20, 0, turkeyGame, "2rem");
        // startSidewalk.characterElement.classList.add("grey");
        // finishSidewalk = new GameCharacter("finishSidewalk", "&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637&#9637", playAreaWidth / 2, 20, 0, turkeyGame, "2rem");
        // finishSidewalk.characterElement.classList.add("grey");

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
            moveTurkey();
            moveKnives();
            //console.log("knives: " + knives.length);
            if (randomNumberZeroToNumber(300) <= spawnFrequency) {
                knives.push(makeKnive());
            }

            counter += 1;
            if (counter % 1000 === 0) {
                counter = 0;
                spawnFrequency += 2;
                //alert("increased!");
                let factor = (slowSpeed + 1) / slowSpeed;
                if (fastSpeed * factor >= turkey.width) {
                    //do nothing
                } else {
                    slowSpeed = slowSpeed * factor;
                    fastSpeed = fastSpeed * factor;
                    //alert(slowSpeed, fastSpeed);
                    for (knive of knives) {
                        knive["speed"] = factor * knive["speed"]
                    }
                }
                spinningMessage("Level up Turkey!", turkeyGame);
                soundplay(powerUp);
                turkeyGame.increaseLevel(1);
            }

            //handle knive off screen
            for (knive of knives) {
                if ((knive.getXPosition() < 0) || (knive.getYPosition() < 0) || (knive.getYPosition() > playAreaHeight)) {
                    removeCharacter(knive);
                    knive["garbage"] = true;
                    if (knive.text != "X") {
                        turkeyGame.addToScore(1);
                        soundplay(blip);
                    }
                }
            }

            for (let i = knives.length - 1; i >= 0; i--) {
                //console.log("garbage", knives[i]["garbage"]);
                if (knives[i]["garbage"] === true) {
                    knives.splice(i, 1);
                }
            }

            //handle knive/turkey collision

            for (knive of knives) {
                if (collisionDetect(turkey, knive)) {
                    if (knive.text != "X") {
                        knive.setText("X");
                        spinningMessage("Ouch!", turkeyGame);
                        turkeyGame.subtractLives(1);
                        soundplay(crash);
                    }

                }
            }


            //GAME OVER SEQUENCE
            if ((turkeyGame.getLives() <= 0) || (turkeyGame.getLevel()>4)) {
                let overMessage="Game Over";
                if (turkeyGame.getLevel()>4){
                    overMessage="You won!\nBe Free!!!\nGo enjoy Thanksgiving Dinner!"
                }
                message = new GameCharacter("messageid", overMessage, playAreaWidth / 2.0, playAreaHeight * .75, 0, turkeyGame, "1rem");

                clearInterval(myGameLoopTicker);
                stopsound(backgroundmusic); //

                if (document.getElementById('userName').innerHTML === "not logged in") {
                    message2 = new GameCharacter("message2id", "You must be logged in \n to save high score.", playAreaWidth / 2.0, playAreaHeight * .25, 0, turkeyGame, "1rem");
                }

                /////////////UPDATE SCORES IN DATABASE /////////////
                // let thisGame = turkeyGame; //!!!! change this line for each game

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
                }, 7000)
            }
        }
      //----------0-------android games modifications---------------
        document.getElementById("userName").innerHTML=window.document.title;
        document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
        //<main character>🦃</main character>