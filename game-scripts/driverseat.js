
        // ---------------------------GAME HERE----------------------------





        //-------1-------define audio-------1-------
        function defineAudio() {
            //backgroundSound = new Tone(28, 1000, "sawtooth", 0, -6, -30);
            //backgroundSound = new Audio("steadyenginelooped.mp3");
            //cat = new Audio("cat.mp3");
            backgroundSound=engineIdleFading;
            
            //speeding = new Tone(48, 500, "sawtooth", 0, -6, -30);
            speeding=footstep;
            //fireball = new Tone(110, 333, "sawtooth", 0, 0, -12);
            //fireball = new Audio("fireball.mp3");
            fireball=explosion;
            //cat = new Tone(110, 333, "sawtooth", 0, 0, -12);

            //cow
            //cat = new Tone(55, 1000, "sawtooth", 0, 0, -12);
            cat = explosion;
        }

        //-------2-------define frame rate-------2-------
        framesPerSecond = 45;
        let interval = (1.0 / framesPerSecond) * 1000;

        //-------3-------Initialize Game Put Stuff on Screen Define Variables-------3-------
        let driverSeat = new MyLittleVideoGame("Driver's Seat");
        //options     slr   sud lr  ud s lrud standard
        useControls("slrud");
        driverSeat.setLives(3);
        bindControlsToWindow(driverSeat);
        bindButtonControls(driverSeat);
        leftBorder = 0;
        rightBorder = driverSeat.playAreaWidth;
        topBorder = 0;
        bottomBorder = driverSeat.playAreaHeight;
        playAreaHeight = driverSeat.playAreaHeight;
        playAreaWidth = driverSeat.playAreaWidth;
        middleX = (leftBorder + rightBorder) / 2.0;
        middleY = (topBorder + bottomBorder) / 2.0;
        const car = new GameCharacter("car", "&#128664", middleX, bottomBorder * .8, 0, driverSeat, "2rem");

        const roadDash1 = new GameCharacter("dash1", "|", middleX, topBorder, 0, driverSeat, "2rem");

        const roadDash2 = new GameCharacter("dash2", "|", middleX, middleY, 0, driverSeat, "2rem");

        moveCharacterBy(roadDash1, 0, roadDash1.getCharacterHeight());

        let roadSpeed = 3.0;
        let slowRoadSpeed = 3.0;
        let fastRoadSpeed = 5.0;
        let sideMovement = 0.0;

        function moveRoadline(line) {
            if (line.getYPosition() + line.getCharacterHeight() + roadSpeed >= bottomBorder) {
                moveCharacterBy(line, 0, -playAreaHeight + line.getCharacterHeight() * 1.5);
            } else {
                moveCharacterBy(line, 0, roadSpeed);
            }
        }




        let characterArray = ["&#128022", "&#128008", "&#129420", "&#128019", "&#128063"];
        let alreadyCollided = false;
        let characterOnScreen = false;
        let counter = 0;
        let gameOver = false;

        //-------4-------make game run with start button and restart buttons -------4-------
        document.getElementById("start-button").addEventListener("click", startGame);
        document.getElementById("restart-button").addEventListener("click", () => location.reload());

        function startGame() {
            //makes start button dissappear
            this.style.display = "none";
            defineAudio();
            soundplay(insertCoin);
            //start game loop
            loopsound(backgroundSound);
            setTimeout(() => {
                myGameLoopTicker = setInterval(gameLoop, interval);
            }, 0);

        }

        //-------5------- Make Game Loop -------5-------
        function gameLoop() {
            //console.log("game looping",myGame,mainCharacter,villain);
            respondToControlsWithMove(car,-5,5,-5,5);
            moveRoadline(roadDash1);
            moveRoadline(roadDash2);

            if (driverSeat.controlSpace === true) {
                roadSpeed = fastRoadSpeed;
                soundplay(speeding);
            } else {
                roadSpeed = slowRoadSpeed;
            }
            //check if character is not on screen make one then move
            if (characterOnScreen === false) {
                alreadyCollided = false
                roadCharacterIndex = randomNumberZeroToNumber(4);
                if (randomNumberZeroToNumber(2) == 0) {
                    sideMovement = randomNumberZeroToNumber(2);
                    if (randomNumberZeroToNumber(1) === 0) {
                        sideMovement = -sideMovement;
                    }
                } else {
                    sideMovement = 0;
                }

                startPosition = randomNumberZeroToNumber(playAreaWidth);
                startPosition = startPosition + leftBorder;
                roadCharacter = new GameCharacter("roadie", characterArray[roadCharacterIndex], startPosition, topBorder-40, 0, driverSeat, "2rem");
                

                characterOnScreen = true;
            }
            moveCharacterBy(roadCharacter, sideMovement, roadSpeed);

            //if character and car collide, change text to splat, and reduce lives
            if (collisionDetect(car, roadCharacter) === true && alreadyCollided == false) {
                roadCharacter.setText("&#129702");
                if (roadCharacterIndex == 1) {
                    soundplay(cat)
                } else {
                    soundplay(fireball);
                }
                driverSeat.subtractLives(1);
                alreadyCollided = true;
            }

            //if character goes below screen, remove and add a point
            if ((roadCharacter.getYPosition() > bottomBorder) ||
                (roadCharacter.getXPosition() > rightBorder) ||
                (roadCharacter.getXPosition() < leftBorder)
            ) {
                characterOnScreen = false;
                removeCharacter(roadCharacter);
                driverSeat.addToScore(1);
            }

            if (driverSeat.getLives() <= 0) {
                stopsound(backgroundSound);
                gameOver = true;


                message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, driverSeat, "1rem");
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
                }, 2000)


                clearInterval(myGameLoopTicker);
            }

            counter += 1;
            if (counter % (framesPerSecond * 5) === 0) {
                roadSpeed = roadSpeed + 1;
                fastRoadSpeed = roadSpeed + 3;
                slowRoadSpeed = roadSpeed;
                counter = 0;
                //console.log("speeding up!!!!!!!!!!!!!!!!!!");
            }
            //console.log(roadSpeed);
            if ((isPlaying(backgroundSound) === false) &&
                (gameOver === false)) {

                loopsound(backgroundSound);
            }

        }


        // https://www.py4u.net/discuss/986510

        document.addEventListener('gesturestart', function (e) {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            document.body.style.zoom = 0.99;
        });

        document.addEventListener('gesturechange', function (e) {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            document.body.style.zoom = 0.99;
        });

        document.addEventListener('gestureend', function (e) {
            e.preventDefault();
            // special hack to prevent zoom-to-tabs gesture in safari
            document.body.style.zoom = 0.99;
        });

        //----------0-------android games modifications---------------
        //<main character>🚘</main character>
        document.getElementById("userName").innerHTML = window.document.title;
        document.getElementById("highScore").innerHTML = "<a href='https://www.charwars.net'>CharWars</>";;
 