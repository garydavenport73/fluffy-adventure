        // ---------------------------GAME HERE----------------------------



        //-------1-------define audio-------1-------
        function defineAudio() {


            footsteps = new Tone(3, 500, "square", 2, -5, -12);
            clover = new Tone(333, 440, "triangle", 0, 0, 0);
            insertcoin = new Tone(110, 200, "triangle", 0, 0, 0);

            // footsteps = new Audio("footsteps.mp3");
            // crash = new Audio("crash.mp3");
            // insertcoin = new Audio("insertcoin.mp3");
        }

        //-------2-------define frame rate-------2-------
        framesPerSecond = 45;
        let timeLeft = framesPerSecond * 20;
        let interval = (1.0 / framesPerSecond) * 1000;

        //-------3-------Initialize Game Put Stuff on Screen Define Variables-------3-------
        let clipperGame = new MyLittleVideoGame("Clipper");
        //options     slr   sud lr  ud s lrud standard
        useControls("lrud");
        bindControlsToWindow(clipperGame);
        bindButtonControls(clipperGame);

        function checkForGrassCollision(grass, clipper) {
            for (let blade of grass) {
                if (collisionDetect(blade, clipper) === true) {
                    return blade;
                }
            }
        }



        leftBorder = 0;
        topBorder = 0;
        playAreaHeight = clipperGame.playAreaHeight;
        playAreaWidth = clipperGame.playAreaWidth;

        const grass = [];

        //make grass, flowers etc
        grassTypes = ["&#127807;", "&#127807;", "&#127795;", "&#127795;", "&#9752;", "&#9752;", "&#9752;",
            "&#127807;", "&#127807;", "&#127795;", "&#127795;", "&#9752;", "&#9752;", "&#127808;"
        ];


        for (let i = 0; i < 200; i++) {
            randx = 10 + randomNumberZeroToNumber(playAreaWidth - 20);
            randy = 10 + randomNumberZeroToNumber(playAreaHeight - 20);
            randpick = randomNumberZeroToNumber(2);
            grass[i] = new GameCharacter("car" + i.toString(), grassTypes[randomNumberZeroToNumber(13)], randx, randy, 0, clipperGame, "1rem");
            grass[i].characterElement.style.color = "yellowgreen";
        }

        //
        clipperGame.playAreaDiv.style.backgroundColor = "green";

        //make jogger
        clipper = new GameCharacter("clipper", "&#128016;", playAreaWidth / 2, playAreaHeight - 20, 0, clipperGame, "2rem");

        //-------4-------make game run with start button and restart buttons -------4-------
        document.getElementById("start-button").addEventListener("click", startGame);
        document.getElementById("restart-button").addEventListener("click", () => location.reload());

        function startGame() {
            //makes start button dissappear
            this.style.display = "none";
            defineAudio();
            //start game loop
            setTimeout(() => {
                myGameLoopTicker = setInterval(gameLoop, interval);
            }, 1000);

        }

        //-------5------- Make Game Loop -------5-------
        function gameLoop() {

            //move goat and play sound
            moving = respondToControlsWithMove(clipper, -3, 3, -3, 3, true);
            //console.log(moving);
            if (moving) {
                soundplay(footsteps);
            }

            let tempy = checkForGrassCollision(grass, clipper);
            //console.log(tempy);
            if (tempy != null) {
                // makeDissapearInSeconds(tempy, .01);
                //alert(tempy.characterElement.innerHTML);
                if (tempy.characterElement.innerHTML == "<pre>🍀</pre>") {
                    spinningMessage("four leaf clover!", clipperGame);

                    clipperGame.addToScore(4);
                    clover.play();
                } else {
                    clipperGame.addToScore(1);
                    insertcoin.play();
                }
                tempy.setText("");

                //resetAndPlayAudioObject(insertcoin);
            }

            timeLeft = timeLeft - 1;
            clipperGame.setLevel(Math.floor(timeLeft / 45));

            if (timeLeft <= 0) {

                message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, clipperGame, "1rem");
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

                        //<main character>🐐</main character>
                            document.getElementById("userName").innerHTML=window.document.title;
        document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
