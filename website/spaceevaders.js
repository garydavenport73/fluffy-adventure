

        // ---------------------------GAME HERE----------------------------



        //-------1-------define audio-------1-------

        function defineAudio() {
            blip = new Tone(220, 50, "sine", 0, 0, 0);
            fireball = new Tone(110, 333, "sawtooth", 0, -9, -30);
            insertCoin = new Tone(110, 200, "triangle", 0, 0, 0);
            alienHit = new Tone(110, 100, "triangle", 0, 0, 0);
            swimTone = new Tone(6, 200, "sawtooth", 0, -9, -30);
            backgroundmusic = new Tone(2, 1000, "sawtooth", 0, -15, -30);
        }

        //-------2-------define frame rate-------2-------
        framesPerSecond = 30;
        let interval = (1.0 / framesPerSecond) * 1000;


        //-------3-------define characters and functions------3-------

        let spaceEvadersGame = new MyLittleVideoGame("Space Evaders");
        //options     slr   sud lr  ud s lrud standard
        useControls("slr");
        spaceEvadersGame.setLives(3);
        //constructor(name = "MyLVGame", score = 0, level = 1, lives = 3)
        spaceEvadersGame.setBackgroundColor("grey");
        bindControlsToWindow(spaceEvadersGame);
        bindButtonControls(spaceEvadersGame);

        leftBorder = 0;
        topBorder = 0;
        playAreaHeight = spaceEvadersGame.playAreaHeight;
        playAreaWidth = spaceEvadersGame.playAreaWidth;
        let gameOver = false;
        // let levelCompleted = false;



        //▲
        let cannon = new GameCharacter("cannon", "&#9650;", playAreaWidth / 2, playAreaHeight - 20, 0, spaceEvadersGame, "3em");
        //▮
        let shield1 = new GameCharacter("shield1", "&#9646;", playAreaWidth / 3, playAreaHeight * .85, 0, spaceEvadersGame, "5em");
        shield1.setColor("orange");

        let shield2 = new GameCharacter("shield2", "&#9646;", playAreaWidth * 2 / 3, playAreaHeight * .85, 0, spaceEvadersGame, "5em");
        shield2.setColor("orange");

        function makeShields() {
            shield1 = new GameCharacter("shield1", "&#9646;", playAreaWidth / 3, playAreaHeight * .85, 0, spaceEvadersGame, "5em");
            shield1.setColor("orange");

            shield2 = new GameCharacter("shield2", "&#9646;", playAreaWidth * 2 / 3, playAreaHeight * .85, 0, spaceEvadersGame, "5em");
            shield2.setColor("orange");
        }

        let cannonBullet = new GameCharacter("cannon-bullet", ".", cannon.getXPosition(), cannon.getYPosition(), 0, spaceEvadersGame,
            "3em");
        cannonBullet.setColor("blue");

        let alienBullet;



        let cannonBulletVelocity = 0;
        let alienBulletVelocity = 0;

        let aliens = [];
        let alienColumns = 4;
        let alienRows = 4;
        let alienSpeed = 1;
        function placeAliens() {
            aliens = [];
            for (let i = 0; i < alienColumns; i++) {
                for (let j = 0; j < alienRows; j++) {
                    ////console.logi, j);
                    let alienXPosition = j * 40 + 100;
                    let alienYPosition = i * 40 + 50;
                    // alien '&#128126;'
                    aliens[i * 4 + j] = new GameCharacter('alien' + i.toString() + j.toString(), '&#128126;', alienXPosition, alienYPosition, 0, spaceEvadersGame, "2em");
                    //aliens[i * 4 + j] = new GameCharacter('alien' + i.toString() + j.toString(), '@', alienXPosition, alienYPosition, 0, spaceEvadersGame, "2em");
                }
            }
        }
        placeAliens();

        function moveAliens() {
            ySpeed = 0;
            ////console.log"moveAliens() called");
            ////console.log"alien speed", alienSpeed);
            for (let i = 0; i < aliens.length; i++) {
                if (alienSpeed > 0) { //if moving right, check for any position > right
                    for (let j = 0; j < aliens.length; j++) {
                        if ((aliens[j].getXPosition() + alienSpeed > playAreaWidth) && (aliens[j].text === "&#128126;")) {
                            alienSpeed = -alienSpeed;
                            ySpeed = 20;

                            break;
                        }
                    }
                } else { //going left
                    for (let j = 0; j < aliens.length; j++) {
                        if ((aliens[j].getXPosition() + alienSpeed < 0) && (aliens[j].text === "&#128126;")) {
                            alienSpeed = -alienSpeed;
                            ySpeed = 20;
                            break;
                        }
                    }
                }
            }
            for (let i = 0; i < aliens.length; i++) {
                moveCharacterBy(aliens[i], alienSpeed, ySpeed); //move in direction of speed
                if (aliens[i].getYPosition() > playAreaHeight - 40) {
                    gameOver = true;
                }
            }
        }


        // const plants = [];

        // plants0 = new GameCharacter("line0", ".   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n", playAreaWidth / 2, playAreaHeight / 2, 0, spaceEvadersGame, "2rem");
        // plants0.setColor("green");

        // plants1 = new GameCharacter("line1", ".   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n", playAreaWidth / 2 + playAreaWidth, playAreaHeight / 2, 0, spaceEvadersGame, "2rem");
        // plants1.setColor("green");
        ;


        //-------4-------make game run with start button and restart buttons -------4-------
        document.getElementById("start-button").addEventListener("click", startGame);
        document.getElementById("restart-button").addEventListener("click", () => location.reload());

        function startGame() {
            //makes start button dissappear
            if (document.getElementById("start-button").style.display != "none") { //if not undefined
                document.getElementById("start-button").style.display = "none";
            }
            defineAudio();

            soundplay(insertCoin); //Need to restart here
            //soundplay(backgroundmusic);
            loopsound(backgroundmusic);


            //start game loop
            setTimeout(() => {
                myGameLoopTicker = setInterval(gameLoop, interval);
            }, 1000);

        }

        function fireCannon() {
            cannonBulletVelocity = -7;
            //console.log"fire cannon called");
        }

        function fireAlienCannon() {
            //console.log"alien fire called");
            if (alienBulletVelocity === 0) {
                //no bullett travelling;
                let alienIndex = randomNumberZeroToNumber(aliens.length - 1);
                alienBullet = new GameCharacter("alien-bullet", ".", aliens[alienIndex].getXPosition(), aliens[alienIndex].getYPosition(), 0, spaceEvadersGame, "3rem");
                alienBulletVelocity = 2;
            }
        }
        //-------5------- Make Game Loop -------5-------
        let coolCounter = 0;

        function gameLoop() {
            moveAliens();

            //move cannon
            if (respondToControlsWithMove(cannon, -3, 3, 0, 0, false)) {
                // soundplay(swimTone);
            }

            //shoot bullet if space pressed
            if (spaceEvadersGame.getControlSpace()) {
                //if bullet not flying, launch bullet
                fireCannon();
            }


            //shoot bullet from alien
            //check for random number, if good enough
            if ((randomNumberZeroToNumber(100) > 90)) {
                ////console.log"alien fire called");
                //get lenth of alien and randomly choose one to fire from

                fireAlienCannon();
            }

            if (alienBullet !== undefined) {
                moveCharacterBy(alienBullet, 0, 3);
                //check for alien bullet/cannon collision
                if (collisionDetect(alienBullet, cannonBullet, 0.1)) {
                    soundplay(alienHit);
                    //console.log"Bullets Collide!");
                    alienBullet.setText("");
                    removeCharacter(alienBullet);
                    alienBulletVelocity = 0;
                    cannonBulletVelocity = 0;
                    moveCharacterTo(cannonBullet, cannon.getXPosition(), cannon.getYPosition());

                }

                if (collisionDetect(alienBullet, cannon)) {
                    cannon.setText("");
                    cannonBullet.setText("");
                    spaceEvadersGame.subtractLives(1);
                    soundplay(fireball);
                    let explosion = new GameCharacter("explosion", "&#128293;", cannon.getXPosition(), cannon.getYPosition(), 0, spaceEvadersGame, "2rem");
                    setTimeout(() => {
                        removeCharacter(explosion);
                        cannon.setText("&#9650;");
                        cannonBullet.setText(".");
                    }, 1000);
                }
                else if (alienBullet.getYPosition() > playAreaHeight) {
                    alienBulletVelocity = 0;
                    removeCharacter(alienBullet);
                }
                if (shield1 !== undefined) {
                    if (collisionDetect(alienBullet, shield1)) {
                        alienBullet.setText("");
                        removeCharacter(alienBullet);
                        alienBulletVelocity = 0;
                        soundplay(fireball);

                        if (shield1.getColor() === "orange") {
                            shield1.setColor("orangered");
                            soundplay(fireball);
                        }
                        else if (shield1.getColor() === "orangered") {
                            shield1.setColor("red");
                            soundplay(fireball);
                        }
                        else if (shield1.getColor() === "red") {
                            removeCharacter(shield1);
                        }

                    }
                }
                if (shield2 !== undefined) {
                    if (collisionDetect(alienBullet, shield2)) {
                        alienBullet.setText("");
                        removeCharacter(alienBullet);
                        alienBulletVelocity = 0;
                        if (shield2.getColor() === "orange") {
                            shield2.setColor("orangered");
                            soundplay(fireball);
                        }
                        else if (shield2.getColor() === "orangered") {
                            shield2.setColor("red");
                            soundplay(fireball);
                        }
                        else if (shield2.getColor() === "red") {
                            removeCharacter(shield2);
                            soundplay(fireball);
                        }
                    }
                }
                //check for bullet/bullett collision
            }

            //move bullet
            if (cannonBulletVelocity === 0) {
                moveCharacterTo(cannonBullet, cannon.getXPosition(), cannon.getYPosition());
            }
            else {
                moveCharacterBy(cannonBullet, 0, cannonBulletVelocity);
            }

            //check for bullet off screen
            if (cannonBullet.getYPosition() < 0) {
                cannonBulletVelocity = 0;
                moveCharacterTo(cannonBullet, cannon.getXPosition(), cannon.getYPosition());
            }

            //check for bullet/alien collision

            for (let i = 0; i < aliens.length; i++) {
                ////console.logaliens.length);
                if (collisionDetect(cannonBullet, aliens[i])) {
                    //aliens[i].setText("");
                    soundplay(alienHit);
                    removeCharacter(aliens[i]);
                    aliens.splice(i, 1);
                    cannonBulletVelocity = 0;
                    moveCharacterTo(cannonBullet, cannon.getXPosition(), cannon.getYPosition());
                    spaceEvadersGame.addToScore(1);
                }
            }

            //check for all aliens killed
            if (aliens.length === 0) {
                //console.log"*********ALL GONE**********");

                soundplay(fireball);

                placeAliens();
                removeCharacter(shield1);
                removeCharacter(shield2);
                makeShields();
                soundplay(insertCoin);


                spinningMessage("Level Up!", spaceEvadersGame, 1.5);
                spaceEvadersGame.increaseLevel(1);


                alienSpeed *= 1.5;
            }
            //GAME OVER SEQUENCE
            if ((spaceEvadersGame.getLives() <= 0) || (gameOver)) {
                let overMessage = "Game Over";
                if (spaceEvadersGame.getLevel() > 4) {
                    overMessage = "You won!\nYou are an excellent defender!";
                }
                message = new GameCharacter("messageid", overMessage, playAreaWidth / 2.0, playAreaHeight * .75, 0, spaceEvadersGame, "1rem");

                clearInterval(myGameLoopTicker);
                stopsound(backgroundmusic); //

                // if (document.getElementById('userName').innerHTML === "not logged in") {
                //     message2 = new GameCharacter("message2id", "You must be logged in \n to save high score.", playAreaWidth / 2.0, playAreaHeight * .25, 0, spaceEvadersGame, "1rem");
                // }

                /////////////UPDATE SCORES IN DATABASE /////////////
                // let thisGame = spaceEvadersGame; //!!!! change this line for each game

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
                //             xmlhttp.onload = function () {
                //                 // do something with response or after response
                //                 //alert(this.responseText);
                //                 ////console.logthis.responseText);
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
        //<main character>👾</main character>
            document.getElementById("userName").innerHTML = window.document.title;
        document.getElementById("highScore").innerHTML = "<a href='https://www.charwars.net'>CharWars</>";
 