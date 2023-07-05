
        // ---------------------------GAME HERE----------------------------
        //-------1-------define audio-------1-------

        function defineAudio() {
            blip = new Tone(220, 50, "sine", 0, 0, 0);
            fireball = new Tone(110, 333, "sawtooth", 0, 0, -30);
            insertCoin = new Tone(110, 200, "triangle", 0, 0, 0);
            swimTone = new Tone(10, 200, "sawtooth", 0, -9, -30);
            backgroundmusic = new Tone(2, 1000, "sawtooth", 0, -9, -30);
        }

        //-------2-------define frame rate-------2-------
        framesPerSecond = 30;
        let interval = (1.0 / framesPerSecond) * 1000;


        //-------3-------define characters and functions------3-------

        let reindeerGame = new MyLittleVideoGame("Reindeer Games");
        useControls("lrud");
        reindeerGame.setLives(1);
        //constructor(name = "MyLVGame", score = 0, level = 1, lives = 3)
        //reindeerGame.setBackgroundColor("skyblue");
        reindeerGame.setBackgroundColor("DeepSkyBlue");
        bindControlsToWindow(reindeerGame);
        bindButtonControls(reindeerGame);

        leftBorder = 0;
        topBorder = 0;
        playAreaHeight = reindeerGame.playAreaHeight;
        playAreaWidth = reindeerGame.playAreaWidth;
        let gameOver = false;
        // let levelCompleted = false;

        let reindeer = [];
        //🦌
        //&#129420;
        for (let i = 0; i < 9; i++) {
            reindeer[i] = new GameCharacter("reindeer" + i.toString(), "&#129420;", playAreaWidth - i * 20 - 40, playAreaHeight / 2, 0, reindeerGame, "2rem");
        }
        let reindeerSpeed = 2;
        function lineUpReindeer() {
            for (let i = 0; i < 9; i++) {
                moveCharacterTo(reindeer[i], playAreaWidth - i * 20 - 40, playAreaHeight / 2);

                //reindeer[i] = new GameCharacter("reindeer" + i.toString(), "&#129420;", playAreaWidth - i * 20 - 40, playAreaHeight / 2, 0, reindeerGame, "2rem");
            }
        }
        //make snowflakes
        let snowflakes = [];
        //&#10052;❄
        //&#10053;❅
        //&#10054;❆
        let snowFlakeTypes = ["&#10052;", "&#10053;", "&#10054;"];
        for (let i = 0; i < 10; i++) {
            let randX = randomNumberZeroToNumber(playAreaWidth);
            let randY = randomNumberZeroToNumber(playAreaHeight);
            snowflakes[i] = new GameCharacter('snowflake' + i.toString(), snowFlakeTypes[randomNumberZeroToNumber(2)], randX, randY, 0, reindeerGame, "2em");
            snowflakes[i].setColor("white");
        }

        function movesnowflakes(speed) {
            for (let i = 0; i < 10; i++) {
                //let yMove = -speed
                let xMove = 1 - randomNumberZeroToNumber(2); //gives -1, 0 or 1
                if (snowflakes[i].getYPosition() - speed >= playAreaHeight) {
                    //add height and restart x
                    moveCharacterTo(snowflakes[i], randomNumberZeroToNumber(playAreaWidth), 0);
                } else {
                    //move snowflake up
                    moveCharacterBy(snowflakes[i], 1 - randomNumberZeroToNumber(2), speed); //gives -1, 0 or 1
                }
            }
        }


        //🛷
        let sleigh = new GameCharacter("sleigh", "&#128759;", playAreaWidth - 20, playAreaHeight / 2 + 20, 0, reindeerGame, "2rem");

        //🎅
        //&#127877;
        let santa = new GameCharacter("santa", "&#127877;", playAreaWidth - 20, playAreaHeight / 2 - 20, 0, reindeerGame, "2rem");
        //🏚
        let ourHouse = new GameCharacter("our-house", "&#127962;", 30, 30, 0, reindeerGame, "3em");
        //🏠
        let home = new GameCharacter("home", "&#127968;", playAreaWidth - 30, playAreaHeight - 30, 0, reindeerGame, "3em");

        //👵
        let gma = new GameCharacter("gma", "&#128117;", 30, 30, 0, reindeerGame, "2em");

        let reindeerMoveCount = 0;
        let moveByX = randomIntLowToHigh(-reindeerSpeed, reindeerSpeed);
        let moveByY = randomIntLowToHigh(-reindeerSpeed, reindeerSpeed);
        function moveReindeer() {
            for (let i = 0; i < reindeer.length; i++) {
                moveByX = randomIntLowToHigh(-reindeerSpeed, reindeerSpeed);
                moveByY = randomIntLowToHigh(-reindeerSpeed, reindeerSpeed);
                if ((reindeer[i].getXPosition() + moveByX >= playAreaWidth) || (reindeer[i].getXPosition() + moveByX <= 0)) {
                } else {
                    moveCharacterBy(reindeer[i], moveByX, 0);
                }
                if ((reindeer[i].getYPosition() + moveByY >= playAreaHeight) || (reindeer[i].getYPosition() + moveByY <= 0)) {
                } else {
                    moveCharacterBy(reindeer[i], 0, moveByY);
                }
                if (moveByX >= 0) {
                    flipVertical(reindeer[i]);
                }
                else {
                    unflipVertical(reindeer[i]);
                }
            }
        }


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

        // function fireCannon() {
        //     cannonBulletVelocity = -7;
        //     //console.log"fire cannon called");
        // }

        // function fireAlienCannon() {
        //     //console.log"alien fire called");
        //     if (alienBulletVelocity === 0) {
        //         //no bullett travelling;
        //         let alienIndex = randomNumberZeroToNumber(aliens.length - 1);
        //         alienBullet = new GameCharacter("alien-bullet", ".", aliens[alienIndex].getXPosition(), aliens[alienIndex].getYPosition(), 0, reindeerGame, "3rem");
        //         alienBulletVelocity = 2;
        //     }
        // }
        //-------5------- Make Game Loop -------5-------
        // let coolCounter = 0;

        let setPausing = false;
        function gameLoop() {


            if (setPausing === false) {
                movesnowflakes(1);
                moveReindeer();
                //move gma
                if (respondToControlsWithMove(gma, -3, 3, -3, 3, false)) {
                    soundplay(swimTone);
                }
            }

            //detect got home
            if (collisionDetect(gma, home)) {
                setPausing = true;
                console.log("collision");
                soundplay(insertCoin);
                lineUpReindeer();
                moveCharacterTo(gma, 30, 30);
                reindeerGame.addToScore(1);
                reindeerGame.increaseLevel(1);
                reindeerSpeed += 2;
                spinningMessage("Got Home!", reindeerGame, 3);
                setTimeout(() => {
                    setPausing = false;
                }, 3000);

            }

            //detect reindeer collisions

            for (let i = 0; i < reindeer.length; i++) {
                if (collisionDetect(gma, reindeer[i])) {
                    setPausing = true;
                    soundplay(fireball);

                    lineUpReindeer();
                    moveCharacterTo(gma, 30, 30);
                    reindeerGame.subtractLives(1);
                    spinningMessage("GMA got run over!", reindeerGame, 3);
                    setTimeout(() => {
                        setPausing = false;
                    }, 3000);
                }
            }



            //GAME OVER SEQUENCE
            if ((reindeerGame.getLives() <= 0) || (gameOver)) {
                let overMessage = "Game Over";
                // if (reindeerGame.getLevel() > 4) {
                //     overMessage = "You won!\nYou are an excellent defender!";
                // }
                message = new GameCharacter("messageid", overMessage, playAreaWidth / 2.0, playAreaHeight * .75, 0, reindeerGame, "1rem");

                clearInterval(myGameLoopTicker);
                stopsound(backgroundmusic); //
                // /////////////UPDATE SCORES IN DATABASE /////////////

                                // let thisGame = reindeerGame; //!!!! change this line for each game

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
            }
        }
        //----------0-------android games modifications---------------
        //<main character>🦌</main character>
            document.getElementById("userName").innerHTML=window.document.title;
        document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
