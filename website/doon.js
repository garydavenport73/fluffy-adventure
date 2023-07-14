

        // ---------------------------GAME HERE----------------------------

        let gunshot;
        let fireball;
        //let insertCoin;

        function defineAudio() {

            //gunshot = new Tone(110, 100, "sawtooth", 12, 0, -12);
            //gunshot = new Audio("gunshot.mp3");
            gunshot=thinLaserShoot;
            //fireball = new Tone(110, 333, "sawtooth", 0, 0, -12);

            //fireball = new Audio("fireball.mp3");
            fireball=explosion;

            //insertCoin = new Tone(110, 200, "triangle", 0, 0, 0);
            insertCoin=insertCoin;
            //insertCoin = new Audio("insertcoin.mp3");


            //helicopterChange = new Tone(8, 500, "square", 0, -6, -24);
            //helicopterChange = new Audio("helicopterclip1.mp3");
            helicopterChange=footstep;

            //backgroundmusic = new Tone(4, 1000, "square", 0, -2, -24);
            backgroundmusic=engineIdleFading;
            //backgroundmusic = new Audio("background.mp3");
        }


        //-------2-------define frame rate-------2-------
        framesPerSecond = 45;
        let timeLeft = framesPerSecond * 20;
        let interval = (1.0 / framesPerSecond) * 1000;

        let doonGame = new MyLittleVideoGame("Doon");
            //options     slr   sud lr  ud s lrud standard
            useControls("sud");
        //constructor(name = "MyLVGame", score = 0, level = 1, lives = 3)
        doonGame.setBackgroundColor("lightblue");
        bindControlsToWindow(doonGame);
        bindButtonControls(doonGame);

        leftBorder = 0;
        topBorder = 0;
        playAreaHeight = doonGame.playAreaHeight;
        playAreaWidth = doonGame.playAreaWidth;

        if (doonGame.userNameSpan.innerHTML === 'not logged in') {
            doonGame.userNameSpan.style.backgroundColor = "orange";
            doonGame.userNameSpan.style.color = "white";
        } else {
            doonGame.userNameSpan.style.backgroundColor = "unset";
            doonGame.userNameSpan.style.color = "black";
        }

        //make baseDefender

        const sand = new GameCharacter('sand', '&#9600;&#9600;&#9600;', playAreaWidth / 2, playAreaHeight + 20, 0, doonGame, "40em");
        sand.setColor('tan');

        const moon = new GameCharacter('moon', '&#127769;', playAreaWidth * .75, playAreaHeight * .20, 0, doonGame, "1.7em");

        const mountain1 = new GameCharacter('mountain1', '&#9968;', playAreaWidth - 40, playAreaHeight / 2 - 20, 0, doonGame, "1.5em");
        const cactus = new GameCharacter('cactus', '&#127797;', playAreaWidth * .2, playAreaHeight / 2, 0, doonGame, "1.5em");
        const mountain2 = new GameCharacter('mountain2', '&#9968;', playAreaWidth - 10, playAreaHeight / 2 + 20, 0, doonGame, "4em");
        const instructions = new GameCharacter("instructions", "Instructions:\n\nShoot the bad guys.\nDon't fly into:\n\tmountains\n\tairplanes\n\tor satellites.\n\nRefuel by scooping\nup fuel barrels.\n\n[SPACE] = fire\n[UP ARROW] = up\n[DOWN ARROW] = down", doonGame.playAreaWidth / 2, doonGame.playAreaHeight / 3, 0, doonGame);

        // const snake = new GameCharacter('snake', '&#9968;', playAreaWidth - 10, playAreaHeight / 2 + 20, 0, doonGame, "4em");

        const heroPilot = new GameCharacter('hero-pilot', '&#128641;', 30, playAreaHeight / 2, 0, doonGame, "4em");
        flipVertical(heroPilot);
        resizeHero(heroPilot);


        let missiles = [];
        let missileXVelocity = [];

        missiles[0] = new GameCharacter('missile1', '', 30, playAreaHeight / 2, 0, doonGame, "1em");
        missiles[1] = new GameCharacter('missile2', '', 30, playAreaHeight / 2, 0, doonGame, "1em");
        missiles[2] = new GameCharacter('missile2', '', 30, playAreaHeight / 2, 0, doonGame, "1em");
        missiles[3] = new GameCharacter('missile2', '', 30, playAreaHeight / 2, 0, doonGame, "1em");

        missileXVelocity[0] = 0;
        missileXVelocity[1] = 0;
        missileXVelocity[2] = 0;
        missileXVelocity[3] = 0;

        missileTimeout = false;
        countCompare = Math.floor(framesPerSecond / 3); //how frequently can you shoot
        missileUpNextIndex = 0;

        let moonVelocity = -0.1;
        let missileFlying = false;
        let count = 0;

        // airplane satellites
        airVillainsArray = ["&#128745;", "&#128752;"];
        landVillainsArray = ["&#129410;", "&#128013;", "&#127981;", "&#129713;", "&#128738;", "&#128738;", "&#128738;"];
        //                    scorpion,      snake,     factory,    worm,           oil         oil         oil

        villains = [];
        villainsVelocity = [];
        numberOfVillains = 4;

        for (let i = 0; i < numberOfVillains; i++) {
            let initialYPosition = 30 + randomNumberZeroToNumber(doonGame.playAreaHeight - 60);
            if (initialYPosition > doonGame.playAreaHeight / 2) {
                villainText = landVillainsArray[randomNumberZeroToNumber(landVillainsArray.length - 1)];
            } else {
                villainText = airVillainsArray[randomNumberZeroToNumber(airVillainsArray.length - 1)];
            }
            villainTextSize = ((initialYPosition / 200) + .5).toString() + "em";

            initialXPosition = doonGame.playAreaWidth / 2 + randomNumberZeroToNumber(playAreaWidth / 2);
            villains[i] = new GameCharacter('villain' + i.toString(), villainText, initialXPosition, initialYPosition, 0, doonGame, villainTextSize);
            villainsVelocity[i] = -initialYPosition / 100;
        }


        function moveVillains() {
            for (i = 0; i < villains.length; i++) {
                moveCharacterBy(villains[i], villainsVelocity[i], 0);
            }
        }

        //scorpion snake oildrum factory
        console.log(airVillainsArray);
        console.log(landVillainsArray);


        //-------4-------make game run with start button and restart buttons -------4-------
        document.getElementById("start-button").addEventListener("click", startGame);
        document.getElementById("restart-button").addEventListener("click", () => location.reload());

        function startGame() {
            //makes start button dissappear
            this.style.display = "none";
            instructions.setText("");
            defineAudio();
            soundplay(insertCoin); //Need to restart here
            //soundplay(backgroundmusic);
            loopsound(backgroundmusic);
            //start game loop
            setTimeout(() => {
                myGameLoopTicker = setInterval(gameLoop, interval);
            }, 1000);

        }

        function moveMountain1(speed) {
            if (mountain1.getXPosition() < 0) {
                mountain1.xPosition = playAreaWidth;
            } else {
                moveCharacterBy(mountain1, speed, 0);
            }
        }

        function moveCactus(speed) {
            if (cactus.getXPosition() < 0) {
                cactus.xPosition = playAreaWidth;
            } else {
                moveCharacterBy(cactus, speed, 0);
            }
        }

        function moveMountain2(speed) {
            if (mountain2.getXPosition() < 0) {
                mountain2.xPosition = playAreaWidth;
            } else {
                moveCharacterBy(mountain2, speed, 0);
            }
        }

        function moveMoon(speed) {
            if (moon.getXPosition() > playAreaWidth) {
                moon.xPosition = 0;
            } else {
                moveCharacterBy(moon, speed, 0);
            }
        }

        function resizeHero(hero) {
            //heroPilot.setSizeInRems()
            let scale = .7 + hero.getYPosition() / 180;
            //console.log(scale);
            heroPilot.setSizeInRems(scale);
        }

        function moveMissiles(hero, missiles, missileXVelocity) {
            let heroYPosition = hero.getYPosition();
            let heroXPosition = hero.getXPosition();
            for (let i = 0; i < missiles.length; i++) {
                if (missileXVelocity[i] === 0) {
                    moveCharacterTo(missiles[i], heroXPosition, heroYPosition);
                } else {
                    moveCharacterBy(missiles[i], missileXVelocity[i], 0);
                }
            }
        }


        function fireMissile() {
            // gunshot = new Audio("gunshot.mp3");
            // fireball = new Audio("fireball.mp3");
            // insertCoin = new Audio("insertcoin.mp3");

            soundplay(gunshot);
            console.log("!!!!!!!!!!!!!!!!firing", missileUpNextIndex);
            missiles[missileUpNextIndex].setText("&#8901;");
            missileXVelocity[missileUpNextIndex] = 1;
            missileUpNextIndex += 1;
            if (missileUpNextIndex > 3) {
                missileUpNextIndex = 0;
            }

        }

        function replaceVillain(villain, i) {

            let initialYPosition = 30 + randomNumberZeroToNumber(doonGame.playAreaHeight - 60);
            if (initialYPosition > doonGame.playAreaHeight / 2) {
                villainText = landVillainsArray[randomNumberZeroToNumber(landVillainsArray.length - 1)];
            } else {
                villainText = airVillainsArray[randomNumberZeroToNumber(airVillainsArray.length - 1)];
            }
            villainTextSize = (initialYPosition / 200) + .5;

            initialXPosition = doonGame.playAreaWidth / 2 + randomNumberZeroToNumber(playAreaWidth / 2);

            villain.setText(villainText);
            villain.setSizeInEms(villainTextSize);
            moveCharacterTo(villain, initialXPosition, initialYPosition);
            villainsVelocity[i] = -initialYPosition / 100;

        }

        let defaultFuelTime = 60;
        let fuelLeft = framesPerSecond * defaultFuelTime;
        doonGame.setLevel(Math.floor(fuelLeft / framesPerSecond));
        let moving = false;

        function gameLoop() {


            fuelLeft = fuelLeft - 1;
            doonGame.setLevel(Math.floor(fuelLeft / framesPerSecond));
            if (doonGame.getLevel() < 21) {
                doonGame.levelAreaSpan.style.backgroundColor = "red";
                doonGame.levelAreaSpan.style.color = "white";
            } else {
                doonGame.levelAreaSpan.style.backgroundColor = "unset";
                doonGame.levelAreaSpan.style.color = "black";
            }

            if (fuelLeft <= 0) {

                if (heroPilot.text = '&#128641;') {
                    doonGame.subtractLives(1);
                    fuelLeft = framesPerSecond * defaultFuelTime;
                    heroPilot.setText("&#128293;");
                    soundplay(fireball);
                    spinningMessage("Out of fuel!", doonGame);
                    setTimeout(() => {
                        heroPilot.setText('&#128641;');
                    }, 2000);

                } else {
                    fuelLeft = framesPerSecond * defaultFuelTime;
                }
            }

            moveMountain1(-0.5);
            moveCactus(-1);
            moveMountain2(-2);
            moveMoon(.1);

            moving = respondToControlsWithMove(heroPilot, 0, 0, -3, 3, false);
            if (moving) {
                soundplay(helicopterChange);
            }
            moveMissiles(heroPilot, missiles, missileXVelocity);
            moveVillains();
            resizeHero(heroPilot);

            //missiles off screen or missile collision
            for (let i = 0; i < missiles.length; i++) {
                if (missiles[i].getXPosition() > doonGame.playAreaWidth) {
                    missiles[i].text = "";
                    missileXVelocity[i] = 0;
                } else if (true) {
                    //check for missile collisions

                    for (let j = 0; j < villains.length; j++) {

                        if (collisionDetect(missiles[i], villains[j])) {
                            missiles[i].text = "";
                            missileXVelocity[i] = 0;

                            villains[j].setText("&#128293;");
                            soundplay(fireball);

                            doonGame.addToScore(1);

                            setTimeout(() => {
                                replaceVillain(villains[j], j);
                            }, 2000);



                        }

                    }
                }
            }

            for (let i = 0; i < villains.length; i++) {
                if ((villains[i].getXPosition() < 0) || (false) || (false)) {
                    villains[i].xPosition = doonGame.playAreaWidth;
                }
            }

            if (doonGame.getControlSpace() === true) {
                if (missileTimeout === false) {
                    console.log("space pressed");
                    if (heroPilot.text === '&#128641;') {
                        fireMissile();
                        missileTimeout = true;
                    }
                }
            }

            if (missileTimeout === true) {
                count += 1;

                if (count > countCompare) {
                    missileTimeout = false;
                    count = 0;
                }
            }

            //detect hero mountain collisions
            if ((collisionDetect(heroPilot, mountain1)) || (collisionDetect(heroPilot, mountain2))) {
                if (heroPilot.text === '&#128641;') {
                    doonGame.subtractLives(1);
                    heroPilot.setText("&#128293;");
                    soundplay(fireball);
                    setTimeout(() => {
                        heroPilot.setText('&#128641;');
                    }, 2000);
                    fuelLeft = framesPerSecond * defaultFuelTime;
                }
            }

            //detect hero air villain collisions or oil tanker
            for (let i = 0; i < villains.length; i++) {
                if ((villains[i].text === '&#128745;') || (villains[i].text === '&#128752;') //air stuff
                    ||
                    (villains[i].text === '&#128738;') //oil tanker

                ) { //check to see for air collision
                    if (collisionDetect(heroPilot, villains[i])) {
                        if (heroPilot.text === '&#128641;') { //check to see if hero has not already collided


                            if (villains[i].text === '&#128738;') { //oil tanker code
                                console.log("oil tanker code")
                                doonGame.addToScore(1);
                                //heroPilot.setText("&#128293;");
                                villains[i].setText("")
                                setTimeout(() => {
                                    //heroPilot.setText('&#128641;');
                                    replaceVillain(villains[i], i);
                                }, 2000);
                                soundplay(powerUp);
                                spinningMessage("Refueled!", doonGame);
                                fuelLeft = framesPerSecond * defaultFuelTime;

                            } else { //air collision code

                                console.log("air collision code");
                                doonGame.subtractLives(1);
                                doonGame.addToScore(1);
                                soundplay(fireball);
                                heroPilot.setText("&#128293;");
                                villains[i].setText("&#128293;")
                                setTimeout(() => {
                                    heroPilot.setText('&#128641;');
                                    replaceVillain(villains[i], i);
                                }, 2000);
                                spinningMessage("Air Collision!", doonGame);
                                fuelLeft = framesPerSecond * defaultFuelTime;
                            }

                        }
                    }
                }
            }

            if (doonGame.getLives() <= 0) {

                message = new GameCharacter("messageid", "Game Over", playAreaWidth / 2.0, playAreaHeight * .75, 0, doonGame, "1rem");
                clearInterval(myGameLoopTicker);
                stopsound(backgroundmusic); //

                setTimeout(() => {
                    removeCharacter(message);
                    //-------6------- At end of game, add start button back-------6-------
                    document.getElementById("restart-button").style.display = "inline-block";
                }, 3000)
            }
        }
        //----------0-------android games modifications---------------
                //<main character>🚁</main character>
                    document.getElementById("userName").innerHTML=window.document.title;
        document.getElementById("highScore").innerHTML="<a href='https://www.charwars.net'>CharWars</>";
  