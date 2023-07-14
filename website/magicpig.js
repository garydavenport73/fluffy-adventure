
        // ---------------------------GAME HERE----------------------------
        
        //-------1-------define audio-------1-------
        function defineAudio() {


            //helicopterChange = new Tone(8, 500, "square", 0, -6, -24);
            helicopterChange=click;
            //pigletMoving = new Tone(6, 500, "square", 0, -6, -24);
            backgroundmusic = engineIdleFading;//new Tone(4, 1000, "square", 0, -2, -24);
            crash = explosion;//new Tone(110, 400, "triangle", 0, 0, 0);
            insertcoin = insertCoin;//new Tone(330, 400, "triangle", -3, -3, -6);
        }

        //-------2-------define frame rate-------2-------
        framesPerSecond = 30;
        let interval = (1.0 / framesPerSecond) * 1000;
        let pigletYVelocity=-1;

        //-------3-------define characters and functions------3-------

        pigletGame = new MyLittleVideoGame("Magic Pig");
        useControls("s");
        pigletGame.setLevel(1);
        pigletGame.setLives(1);
        pigletGame.setBackgroundColor("lightblue");
        bindControlsToWindow(pigletGame);
        bindButtonControls(pigletGame);


        leftBorder = 0;
        topBorder = 0;
        playAreaHeight = pigletGame.playAreaHeight;
        playAreaWidth = pigletGame.playAreaWidth;

        // const pigletSpeed = [];
        const plants = [];
        //slowSpeed = 3;
        // fastSpeed = 5;
        // const knives = [];
        let counter = 0;
        // spawnFrequency = 2;
        let speed=3;

        plants0 = new GameCharacter("line0", ".   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n", playAreaWidth / 2, playAreaHeight / 2, 0, pigletGame, "2rem");
        plants0.setColor("green");

        plants1 = new GameCharacter("line1", ".   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n.   .   .   .\n  .   .   .   .\n", playAreaWidth / 2 + playAreaWidth, playAreaHeight / 2, 0, pigletGame, "2rem");
        plants1.setColor("green");

        let barrierStartPosition=Math.max(randomNumberZeroToNumber(parseInt(playAreaHeight))-50,50)-playAreaHeight/2;
        //console.log(barrierStartPosition);
        let barrier1=new GameCharacter("barrier1","█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█",playAreaWidth-10,barrierStartPosition,0,pigletGame,"1rem");
        barrier1.setColor("darkred");
        let barrierHeight=barrier1.getCharacterHeight();
        
        //console.log(barrierHeight);
        let barrier2=new GameCharacter("barrier2","█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█\n█",playAreaWidth-10,barrierStartPosition+barrierHeight+100,0,pigletGame,"1rem");
        barrier2.setColor("darkred");

        const piglet = new GameCharacter("piglet", "&#128022;", 20, playAreaHeight / 2, 0, pigletGame, "2.5rem");
        flipVertical(piglet);

        function moveBarriers(){
            console.log("moveBarriers called");
            moveCharacterBy(barrier1,-speed,0);
            moveCharacterBy(barrier2,-speed,0);
            
        }
        function moveLines() {
            if (pigletGame.getControlSpace()) {
                //speed = fastSpeed;
                soundplay(helicopterChange);
            } else {
                //speed = slowSpeed;
            }
            moveCharacterBy(plants0, -speed, 0);
            moveCharacterBy(plants1, -speed, 0);

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

        let cooling=false;
        function flapWings() {
            if (pigletGame.getControlSpace()) {
                rotateToAngle(piglet,20,"vertical");
                //if (cooling===false){
                    pigletYVelocity=pigletYVelocity-1;
                //    cooling=true;
                //}

            }else{
                rotateToAngle(piglet,0,"vertical");
            };
        }

        function applyGravity(){
            pigletYVelocity=pigletYVelocity+.1;
        }

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
        let coolCounter=0;
        function gameLoop() {
            coolCounter+=1;
            if (coolCounter%30){
                applyGravity();
                coolCounter=0;
                cooling=false;
            }

            moveLines();
            flapWings();

            moveCharacterBy(piglet,0,pigletYVelocity);

            moveBarriers();

            if (barrier1.getXPosition()<=0){
                let barrierStartPosition=Math.max(randomNumberZeroToNumber(parseInt(playAreaHeight))-50,50)-playAreaHeight/2;
                setXPosition(barrier1,playAreaWidth);
                setYPosition(barrier1,barrierStartPosition);
                setXPosition(barrier2,playAreaWidth);
                setYPosition(barrier2,barrierStartPosition+barrierHeight+100);
                pigletGame.addToScore(1);
                soundplay(pickupCoin);

            }

            if (
                (collisionDetect(piglet,barrier1,.9))||(collisionDetect(piglet,barrier2,.9))||
                (piglet.getYPosition()>=playAreaHeight)
                
                ){
                pigletGame.subtractLives(1);
                soundplay(crash);
            }

            if (piglet.getYPosition()<=0){
                pigletYVelocity=0;
                setYPosition(piglet,0);


            }
            console.log(pigletYVelocity);
        
            counter += 1;
            if (counter % 1000 === 0) {
                counter = 0;
                spinningMessage("Level up Pinky!", pigletGame);
                soundplay(powerUp);
                pigletGame.increaseLevel(1);
            }

            //GAME OVER SEQUENCE
            if ((pigletGame.getLives() <= 0) || (pigletGame.getLevel()>4)) {
                let overMessage="Game Over";
                if (pigletGame.getLevel()>4){
                    overMessage="You won!\nYou are an excellent flyer!";
                }
                message = new GameCharacter("messageid", overMessage, playAreaWidth / 2.0, playAreaHeight * .75, 0, pigletGame, "1rem");

                clearInterval(myGameLoopTicker);
                stopsound(backgroundmusic); //

                if (document.getElementById('userName').innerHTML === "not logged in") {
                    message2 = new GameCharacter("message2id", "You must be logged in \n to save high score.", playAreaWidth / 2.0, playAreaHeight * .25, 0, pigletGame, "1rem");
                }

                /////////////UPDATE SCORES IN DATABASE /////////////
                // let thisGame = pigletGame; //!!!! change this line for each game

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
                //<main character>🐖<main character>
                    document.getElementById("userName").innerHTML=window.document.title;
        document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
 