const soundsByFilename = {};
// ////////////////////////////////////
// // Constructor Function
// function Color(r, g, b) {
//     this.r = r;
//     this.g = g;
//     this.b = b;
// }

// Color.prototype.rgb = function () {
//     const { r, g, b } = this;
//     return `rgb(${r}, ${g}, ${b})`;
// };

// Color.prototype.hex = function () {
//     const { r, g, b } = this;
//     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// };
// ////////////////////////////////

function MyLittleVideoGame(name = "MyLVGame", score = 0, level = 1, lives = 3) {
    // constructor(name = "MyLVGame", width = 320, height = 569, scoreboardHeight = 20, score = 0, level = 0, lives = 3) {
    //constructor(name = "MyLVGame", score = 0, level = 1, lives = 3) 

    this.name = name;
    this.highScoreHeaderDiv = document.getElementById("highScoreHeader");
    this.scoreboardDiv = document.getElementById("scoreboard");
    this.gameAreaDiv = document.getElementById("gameArea");
    this.playAreaDiv = document.getElementById("playArea");
    this.controlsAreaDiv = document.getElementById("controlsArea");
    this.levelAreaSpan = document.getElementById("level");
    this.userNameSpan = document.getElementById("userName");

    //this.width = width;  //get general width
    let stringPixelWidth = document.defaultView.getComputedStyle(this.playAreaDiv).width;
    let intPixelWidth = parseInt(stringPixelWidth.substring(0, stringPixelWidth.length - 2));
    this.width = intPixelWidth;

    //get high score header height
    let strHSPixelHeight = document.defaultView.getComputedStyle(this.highScoreHeaderDiv).height;
    let intHSPixelHeight = parseInt(strHSPixelHeight.substring(0, strHSPixelHeight.length - 2));
    this.highScoreHeaderHeight = intHSPixelHeight;

    //get scoreboard height
    //this.scoreboardHeight = scoreboardHeight;
    let strSCPixelHeight = document.defaultView.getComputedStyle(this.scoreboardDiv).height;
    let intSCPixelHeight = parseInt(strSCPixelHeight.substring(0, strSCPixelHeight.length - 2));
    this.scoreboardHeight = intSCPixelHeight;

    //get playAreaWidth
    this.playAreaWidth = this.width;

    //get playAreaHeight
    let strPAPixelHeight = document.defaultView.getComputedStyle(this.playAreaDiv).height;
    let intPAPixelHeight = parseInt(strPAPixelHeight.substring(0, strPAPixelHeight.length - 2));
    this.playAreaHeight = intPAPixelHeight;

    //get controls area height
    let strCAPixelHeight = document.defaultView.getComputedStyle(this.controlsAreaDiv).height;
    let intCAPixelHeight = parseInt(strCAPixelHeight.substring(0, strCAPixelHeight.length - 2));
    this.controlsAreaHeight = intCAPixelHeight;

    //get controls area width
    let strCAPixelWidth = document.defaultView.getComputedStyle(this.controlsAreaDiv).width;
    let intCAPixelWidth = parseInt(strCAPixelWidth.substring(0, strCAPixelWidth.length - 2));
    this.controlsAreaWidth = intCAPixelWidth;

    //this.height = height;
    //height = total height = playAreaHeight + scoreboardheight*2 + contraols area height
    //height  = highscoreheader + scoreboard + playareaHeight + controls area height 
    this.height = this.highScoreHeaderHeight + this.scoreboardHeight + this.playAreaHeight + this.controlsAreaHeight;

    //this.controlsAreaHeight = controlsAreaHeight;
    this.score = score;
    this.level = level;
    this.lives = lives;

    //this.changeGameSize(this.width, this.height, this.scoreboardHeight, this.controlsAreaHeight);

    //this.playAreaWidth = this.width;
    //this.playAreaHeight = this.height - this.scoreboardHeight * 2.0 - this.controlsAreaHeight;
    this.controlLeft = false;
    this.controlRight = false;
    this.controlUp = false;
    this.controlDown = false;
    this.controlSpace = false;
    this.soundsByFilename = {};
    this.setTitle(this.name);
    this.setScore(this.score);
    this.setLevel(this.level);
    this.setLives(this.lives);
    this.highScoreHeaderDiv.addEventListener("dblclick", (evt) => {
        evt.preventDefault()
    });
    this.scoreboardDiv.addEventListener("dblclick", (evt) => {
        evt.preventDefault()
    });
    this.gameAreaDiv.addEventListener("dblclick", (evt) => {
        evt.preventDefault()
    });
    this.playAreaDiv.addEventListener("dblclick", (evt) => {
        evt.preventDefault()
    });
    this.controlsAreaDiv.addEventListener("dblclick", (evt) => {
        evt.preventDefault()
    });

    /*
    Color.prototype.rgb = function() {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`;
    };
    */


}

MyLittleVideoGame.prototype.setTitle = function (title) {
    window.document.title = title;
}
//setTitle(title) {
//    window.document.title = title;
//}
// score keeping
MyLittleVideoGame.prototype.getScore = function () {
    return parseInt(document.getElementById("score").innerHTML);
}

//getScore() {
//    return parseInt(document.getElementById("score").innerHTML);
//}

MyLittleVideoGame.prototype.setScore = function (score) {
    this.score = score;
    document.getElementById("score").innerHTML = this.score;
}

//setScore(score) {
//    this.score = score;
//    document.getElementById("score").innerHTML = this.score;
// }

MyLittleVideoGame.prototype.addToScore = function (amount) {
    this.setScore(this.getScore() + parseInt(amount));
}
//addToScore(amount) {
//    this.setScore(this.getScore() + parseInt(amount));
//}


//subtractFromScore(amount) {
MyLittleVideoGame.prototype.subtractFromScore = function (amount) {
    this.setScore(this.getScore() - parseInt(amount));
}

//level tracking
//getLevel() {
MyLittleVideoGame.prototype.getLevel = function () {
    return parseInt(document.getElementById("level").innerHTML);
}


//setLevel(level) {
MyLittleVideoGame.prototype.setLevel = function (level) {
    this.level = level;
    document.getElementById("level").innerHTML = this.level.toString();
}

//increaseLevel(amount) {
MyLittleVideoGame.prototype.increaseLevel = function (amount) {
    this.setLevel(this.getLevel() + parseInt(amount));
}


//decreaseLevel(amount) {
MyLittleVideoGame.prototype.increaseLevel = function (amount) {
    this.setLevel(this.getLevel() - parseInt(amount));
}

//lives
//getLives() {
MyLittleVideoGame.prototype.getLives = function () {
    return parseInt(document.getElementById("lives").innerHTML);
}
//setLives(lives) {
MyLittleVideoGame.prototype.setLives = function (lives) {
    this.lives = lives;
    document.getElementById("lives").innerHTML = this.lives.toString();
}
//addLives(amount) {
MyLittleVideoGame.prototype.addLives = function (amount) {
    this.setLives(this.getLives() + parseInt(amount));
}
//subtractLives(amount) {
MyLittleVideoGame.prototype.subtractLives = function (amount) {
    this.setLives(this.getLives() - parseInt(amount));
}
//setBackgroundColor(color = "white") {
MyLittleVideoGame.prototype.setBackgroundColor = function (color = "white") {
    this.playAreaDiv.style.backgroundColor = color;
}


MyLittleVideoGame.prototype.setControlsToFalse = function () {
    //setControlsToFalse() {
    this.controlLeft = false;
    this.controlRight = false;
    this.controlUp = false;
    this.controlDown = false;
    this.controlSpace = false;
}
MyLittleVideoGame.prototype.getControlLeft = function () {
    //getControlLeft() {
    return this.controlLeft;
}
MyLittleVideoGame.prototype.getControlRight = function () {
    //getControlRight() {
    return this.controlRight;
}
MyLittleVideoGame.prototype.getControlUp = function () {
    //getControlUp() {
    return this.controlUp;
}

MyLittleVideoGame.prototype.getControlDown = function () {
    //getControlDown() {
    return this.controlDown;
}

MyLittleVideoGame.prototype.getControlSpace = function () {
    //getControlSpace() {
    return this.controlSpace;
}

// ArrowLeft
// ArrowLeft
// ArrowRight
// ArrowRight
// ArrowUp
// ArrowUp
// ArrowDown
// ArrowDown
// Space
// Space

MyLittleVideoGame.prototype.changeGameSize = function (width, height, scoreboardHeight, controlsAreaHeight) {
    //changeGameSize(width, height, scoreboardHeight, controlsAreaHeight) {
    this.height = height;
    this.width = width;
    this.scoreboardHeight = scoreboardHeight;
    this.controlsAreaHeight = controlsAreaHeight;

    this.highScoreHeaderDiv.style.height = this.scoreboardHeight.toString() + "px";
    this.highScoreHeaderDiv.style.width = this.width.toString() + "px";

    this.scoreboardDiv.style.height = this.scoreboardHeight.toString() + "px";
    this.scoreboardDiv.style.width = this.width.toString() + "px";

    this.gameAreaDiv.style.width = this.width.toString() + "px";
    this.gameAreaDiv.style.height = this.height.toString() + "px";

    this.controlsAreaDiv.style.height = this.controlsAreaHeight.toString() + "px";
    this.controlsAreaDiv.style.width = this.width.toString() + "px";

    this.playAreaDiv.style.height = (this.height - this.scoreboardHeight * 2 - this.controlsAreaHeight).toString() + "px";
    this.playAreaDiv.style.width = this.width.toString() + "px";
}


function GameCharacter(id, text, xPosition, yPosition, angle, game, fontSize = "1rem") {
    //constructor(id, text, xPosition, yPosition, angle, game, fontSize = "1rem") {
    this.text = text;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.angle = angle;
    this.game = game;
    this.fontSize = fontSize;

    //get parent div
    this.playAreaDiv = game.playAreaDiv;
    //make a div inside parent to contain character
    this.characterElement = document.createElement("div");
    //this.characterElement.innerHTML = this.text;
    this.characterElement.innerHTML = "<pre>" + this.text + "</pre>";
    // this.characterElement.classList.add("character-element");
    this.playAreaDiv.appendChild(this.characterElement);
    this.characterElement.style.position = "absolute";
    //give it an id and place 
    this.characterElement.id = id;
    this.id = id;

    this.characterElement.style.fontSize = this.fontSize;

    // this.leftPlayAreaBorder = 0;
    // this.rightPlayAreaBorder = this.game.playAreaWidth;
    // this.topPlayAreaBorder = 0;
    // this.bottomPlayAreaBorder = this.game.playAreaHeight;
    this.characterElement.style.left = this.xPosition.toString() + "px";
    this.characterElement.style.top = this.yPosition.toString() + "px";
    this.characterElement.style.transform = "translate(-50%, -50%)";
    this.characterElement.classList.add("noselect");
    this.characterElement.style.whiteSpace = "nowrap";

    this.refreshWidthAndHeightOfCharacter();
    rotateToAngle(this, this.angle);
}

GameCharacter.prototype.refreshWidthAndHeightOfCharacter = function () {
    //get width and height of this element
    this.width = parseFloat((window.getComputedStyle(this.characterElement).width).slice(0, -2));
    this.height = parseFloat((window.getComputedStyle(this.characterElement).height).slice(0, -2));
}

GameCharacter.prototype.getXPosition = function () {
    return (this.xPosition);
}
GameCharacter.prototype.getYPosition = function () {
    return (this.yPosition);
}
GameCharacter.prototype.getCharacterWidth = function () {
    return (this.width);
}
GameCharacter.prototype.getCharacterHeight = function () {
    return (this.height);
}
GameCharacter.prototype.setText = function (text) {
    this.text = text;
    this.characterElement.innerHTML = this.text;
    this.refreshWidthAndHeightOfCharacter();
}
GameCharacter.prototype.keepInPlayArea = function () {
    //pass;
}
GameCharacter.prototype.setSizeInRems = function (numberRem = 1) {

    this.fontSize = numberRem.toString() + "rem";
    this.characterElement.style.fontSize = this.fontSize;
    this.refreshWidthAndHeightOfCharacter();
    // makeSureOnScreen(this);
    // //console.logthis);
}
GameCharacter.prototype.setSizeInEms = function (numberEm = 1) {
    this.fontSize = numberEm.toString() + "em";
    this.characterElement.style.fontSize = this.fontSize;
    this.refreshWidthAndHeightOfCharacter();
}

GameCharacter.prototype.getSizeInEms = function () {
    return parseInt(this.fontSize.substring(0, this.fontSize.length - 2));
}
GameCharacter.prototype.setColor = function (color = "black") {
    this.color = color;
    this.characterElement.style.color = this.color;

}
GameCharacter.prototype.getColor = function () {
    return (this.color);
}
GameCharacter.prototype.setBackgroundColor = function (color = "transparent") {
    this.backgroundColor = color;
    this.characterElement.style.backgroundColor = this.backgroundColor;
}
//}

function soundplay(mysound) {
    ////console.log"mysound instanceof Tone");
    ////console.logmysound instanceof Tone);

    if (mysound instanceof Audio) {
        // //console.logmysound);
        // //console.log"it is an instance of an Audio Object!!!!!");
        if (isPlaying(mysound) === false) {
            mysound.play();
        }
    } else if (mysound instanceof Tone) {
        mysound.play();
    } else {
        // //console.logmysound);
        // //console.log"it is a File!!!!!");
        filename = mysound;
        //check to see if it is in list of sounds by filename
        if (filename in soundsByFilename) {
            //if its already playing return
            if (isPlaying(soundsByFilename[filename]) === true) {
                return;
            }
            //if its not playing play it
            else {
                soundsByFilename[filename].play();
                return soundsByFilename[filename];
            }
        }
        //it is not in list of sounds by filename
        else {
            //make new audio object with filename as key
            newAudioObject = new Audio(filename);
            //play new sound
            newAudioObject.play();
            //add to list of sounds by filename
            soundsByFilename[filename] = newAudioObject;
            return soundsByFilename[filename];
        }
    }
}

function resetAndPlayAudioObject(audioObject) {
    if (audioObject.paused) {
        audioObject.play();
    } else {
        audioObject.currentTime = 0
        audioObject.play()
    }
}

function loopsound(mysound) {
    if (mysound instanceof Audio) {
        // //console.logmysound);
        // //console.log"it is an instance of an Audio Object!!!!!");
        if (isPlaying(mysound) === false) {
            mysound.loop = true;
            mysound.play();
        }
    } else if (mysound instanceof Tone) {
        mysound.durationMS = 100000000;
        mysound.play();
    } else {
        // //console.logmysound);
        // //console.log"it is a File !!!!!");
        filename = mysound;
        //check to see if it is in list of sounds by filename
        if (filename in soundsByFilename) {
            // //console.logfilename, "filename in soundsByFilename!");
            //if its already playing return
            if (isPlaying(soundsByFilename[filename]) === true) {
                // //console.log"and playing is true!");
                return;
            }
            //if its not playing play it
            else {
                // //console.log"and playing is false!, starting to play");
                soundsByFilename[filename].loop = true;
                soundsByFilename[filename].play();
                return soundsByFilename[filename];
            }
        }
        //it is not in list of sounds by filename
        else {
            // //console.logfilename, "filename NOT in soundsByFilename!");
            //make new audio object with filename as key
            newAudioObject = new Audio(filename);
            //play new sound
            newAudioObject.loop = true;
            newAudioObject.play();
            //add to list of sounds by filename
            soundsByFilename[filename] = newAudioObject;
            return soundsByFilename[filename];
        }
    }
}

function stopsound(mysound) {
    if (mysound instanceof Audio) {
        // //console.logmysound);
        // //console.log"it is an instance of an Audio Object!!!!!");
        mysound.pause();
        mysound.currentTime = 0;
    } else if (mysound instanceof Tone) {
        mysound.stop();
    } else {
        // //console.logmysound);
        // //console.log"it is a File!!!!!");
        filename = mysound;
        if (filename in soundsByFilename) {
            // //console.logsoundsByFilename);
            // //console.log"filename", filename, "in list, trying to pause");

            soundsByFilename[filename].pause();
            soundsByFilename.currentTime = 0;
        } else {
            // //console.logfilename, "not found in keys of soundsByFilename{}");
        }
    }
}

////////////////////////////////////
// Constructor Function
function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

Color.prototype.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
};

Color.prototype.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
////////////////////////////////

function Tone(frequencyHz = 440, durationMS = 1000, type = "sine", bass = 0, mid = 0, treble = 0) {
    //constructor(frequencyHz = 440, durationMS = 1000, type = "sine", bass = 0, mid = 0, treble = 0) {
    this.frequencyHz = frequencyHz;
    this.durationMS = durationMS;
    this.type = type;
    this.bass = bass;
    this.mid = mid;
    this.treble = treble;
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext);
    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.frequency.setValueAtTime(this.frequencyHz, this.audioCtx.currentTime);
    // "sine", "square", "sawtooth", "triangle" and "custom". The default is "sine".
    this.oscillator.type = this.type;
    this.gainControl = this.audioCtx.createGain();
    this.gainControl.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.bassControl = this.audioCtx.createBiquadFilter();
    this.bassControl.type = "lowshelf";
    this.bassControl.frequency.setValueAtTime(210, this.audioCtx.currentTime);
    this.bassControl.gain.setValueAtTime(this.bass, this.audioCtx.currentTime);
    this.midControl = this.audioCtx.createBiquadFilter();
    this.midControl.type = "peaking";
    //http://www.learningaboutelectronics.com/Articles/Quality-factor-calculator.php#answer
    this.midControl.Q.setValueAtTime(0.375, this.audioCtx.currentTime);
    this.midControl.frequency.setValueAtTime(590, this.audioCtx.currentTime);
    this.midControl.gain.setValueAtTime(this.mid, this.audioCtx.currentTime);
    this.trebleControl = this.audioCtx.createBiquadFilter();
    this.trebleControl.type = "highshelf";
    this.trebleControl.frequency.setValueAtTime(1200, this.audioCtx.currentTime);
    this.trebleControl.gain.setValueAtTime(this.treble, this.audioCtx.currentTime);
    this.oscillator.connect(this.bassControl);
    this.bassControl.connect(this.midControl);
    this.midControl.connect(this.trebleControl);
    this.trebleControl.connect(this.gainControl);
    this.gainControl.connect(this.audioCtx.destination);
    this.oscillator.start();
}

Tone.prototype.play = function () {
    if (this.cancelStop === undefined) { //first call ths.cancelStop not yet defined
        //do nothing
    } else {
        clearTimeout(this.cancelStop);
    }
    //this.gainControl.gain.cancelScheduledValues(this.audioCtx.currentTime);
    this.gainControl.gain.setValueAtTime(this.gainControl.gain.value, this.audioCtx.currentTime);
    this.gainControl.gain.linearRampToValueAtTime(1, this.audioCtx.currentTime + 0.03);
    this.cancelStop = setTimeout(() => {
        this.gainControl.gain.setValueAtTime(this.gainControl.gain.value, this.audioCtx.currentTime);
        this.gainControl.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.03);
    }, this.durationMS - 30);
}

Tone.prototype.stop = function () {
    clearTimeout(this.cancelStop);
    this.gainControl.gain.setValueAtTime(this.gainControl.gain.value, this.audioCtx.currentTime);
    this.gainControl.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.03);
}


function isPlaying(mysound) {
    return !mysound.paused;
}

function waitForKeyPress() {
    unbindControlsToWindow();
    //more code here
}

function bindControlsToWindow(aGame) {
    window.addEventListener("keydown", (evt) => {
        triggerControlPress(aGame, evt)
    });
    window.addEventListener("keyup", (evt) => {
        triggerControlRelease(aGame, evt)
    });
}

function unbindControlsToWindow(aGame) {
    window.removeEventListener("keydown", (evt) => {
        triggerControlPress(aGame, evt)
    });
    window.removeEventListener("keyup", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    aGame.setControlsToFalse();
}


function bindButtonControls(aGame) {
    document.getElementById("btnLeft").addEventListener("mousedown", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnRight").addEventListener("mousedown", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnUp").addEventListener("mousedown", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnDown").addEventListener("mousedown", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnSpace").addEventListener("mousedown", (evt) => {
        triggerControlPress(aGame, evt)
    });

    document.getElementById("btnLeft").addEventListener("touchstart", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnRight").addEventListener("touchstart", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnUp").addEventListener("touchstart", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnDown").addEventListener("touchstart", (evt) => {
        triggerControlPress(aGame, evt)
    });
    document.getElementById("btnSpace").addEventListener("touchstart", (evt) => {
        triggerControlPress(aGame, evt)
    });


    document.getElementById("btnLeft").addEventListener("mouseup", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnRight").addEventListener("mouseup", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnUp").addEventListener("mouseup", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnDown").addEventListener("mouseup", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnSpace").addEventListener("mouseup", (evt) => {
        triggerControlRelease(aGame, evt)
    });

    document.getElementById("btnLeft").addEventListener("touchend", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnRight").addEventListener("touchend", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnUp").addEventListener("touchend", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnDown").addEventListener("touchend", (evt) => {
        triggerControlRelease(aGame, evt)
    });
    document.getElementById("btnSpace").addEventListener("touchend", (evt) => {
        triggerControlRelease(aGame, evt)
    });
}



function triggerControlPress(aGame, evt) {
    // evt.preventDefault();
    if (
        (evt.code === "ArrowLeft") ||
        (evt.target.id === "btnLeft")
    ) {
        aGame.controlLeft = true;
        aGame.controlRight = false;
    } else if (
        (evt.code === "ArrowRight") ||
        (evt.target.id === "btnRight")
    ) {
        aGame.controlRight = true;
        aGame.controlLeft = false;
    } else if (
        (evt.code === "ArrowUp") ||
        (evt.target.id === "btnUp")
    ) {
        aGame.controlUp = true;
        aGame.controlDown = false;
    } else if (
        (evt.code === "ArrowDown") ||
        (evt.target.id === "btnDown")
    ) {
        aGame.controlDown = true;
        aGame.controlUp = false;
    } else if (
        (evt.code === "Space") ||
        (evt.target.id === "btnSpace")
    ) {
        aGame.controlSpace = true;
    }
}

function triggerControlRelease(aGame, evt) {
    ////console.log"released ", evt.code);;
    if (
        (evt.code === "ArrowLeft") ||
        (evt.target.id === "btnLeft")
    ) {
        aGame.controlLeft = false;
    } else if (
        (evt.code === "ArrowRight") ||
        (evt.target.id === "btnRight")
    ) {
        aGame.controlRight = false;
    } else if (
        (evt.code === "ArrowUp") ||
        (evt.target.id === "btnUp")
    ) {
        aGame.controlUp = false;
    } else if (
        (evt.code === "ArrowDown") ||
        (evt.target.id === "btnDown")
    ) {
        aGame.controlDown = false;
    } else if (
        (evt.code === "Space") ||
        (evt.target.id === "btnSpace")
    ) {
        aGame.controlSpace = false;
    }
}



function moveCharacterBy(character, x, y) {
    character.xPosition = character.xPosition + x;
    character.yPosition = character.yPosition + y;
    character.characterElement.style.left = character.xPosition.toString() + "px";
    character.characterElement.style.top = character.yPosition.toString() + "px";
}

function moveCharacterTo(character, x, y) {
    character.xPosition = x;
    character.yPosition = y;
    character.characterElement.style.left = character.xPosition.toString() + "px";
    character.characterElement.style.top = character.yPosition.toString() + "px";
}

function removeCharacter(character) {
    //character.text = "";
    // document.getElementById(character.characterElement.id).remove();
    character.characterElement.remove();
}

function getXPosition(character) {
    return character.xPosition;
}

function getYPosition(character) {
    return character.yPosition;
}

function setXPosition(character, xPosition) {
    character.xPosition = xPosition;
}

function setYPosition(character, yPosition) {
    character.yPosition = yPosition;
}

function setAngle(character, angle) {
    character.angle = angle;
}

function getAngle(character) {
    return character.angle;
}

function rotateToAngle(character, degrees, flip = "none") {
    character.angle = degrees % 360;
    let str = "";
    if (flip === "vertical") {
        str = "scale(-1,1)";
    }
    else if (flip === "horizonal") {
        str = "scale(1,-1)";
    }
    transformProperty = `translate(-50%,-50%) rotate(${character.angle}deg) ${str}`;
    character.characterElement.style.transform = transformProperty;
}

function rotateByAngle(character, degrees, flip = "none") {
    character.angle = (character.angle - degrees);
    rotateToAngle(character, character.angle);
}

function flipVertical(character) {
    transformProperty = "translate(-50%, -50%) scale(-1,1)";
    character.characterElement.style.transform = transformProperty;
    //character.characterElement.style.transform.scale
}

function unflipVertical(character) {
    transformProperty = "translate(-50%, -50%)"; // scale(-1,1)";
    character.characterElement.style.transform = transformProperty;
}

function flipHorizontal(character) {
    transformProperty = "translate(-50%, -50%) scale(1,-1)";
    character.characterElement.style.transform = transformProperty;
    //character.characterElement.style.transform.scale
}

function unflipHorizontal(character) {
    transformProperty = "translate(-50%, -50%)"; // scale(-1,1)";
    character.characterElement.style.transform = transformProperty;
}




// function makeSureOnScreen(character) {
//     //pass
// }

function respondToControlsWithMove(character, negX, posX, negY, posY, faceDirection = false, widerEdge = true) {

    let finalXMove = 0;
    let finalYMove = 0;

    let wideFactor = 1.0;
    if (widerEdge === true) {
        wideFactor = 0;
    }
    let game = character.game;

    // //console.logcharacter.id, negX, posX, negY, posY, faceDirection, widerEdge);
    if (game.controlLeft === true) {
        //if will go off screen, don't move, account for width/height of character and amount to move
        if (faceDirection == true) {
            unflipVertical(character);
        }

        if (character.xPosition - wideFactor * (character.width) / 2.0 - negX < 0) {
            //pass do nothing, don't move character out of area
        } else {
            //moveCharacterBy(character, negX, 0);
            finalXMove += negX;
            //rotateByAngle(character, 10);
        }
    }
    if (game.controlRight === true) {
        if (faceDirection == true) {
            flipVertical(character);
        }
        //if will go off screen, don't move, account for width/height of character and amount to move
        if (character.xPosition + wideFactor * (character.width) / 2.0 + posX > game.playAreaWidth) {
            //pass do nothing, don't move character out of area
        } else {
            //moveCharacterBy(character, posX, 0);
            finalXMove += posX;
        }
    }
    if (game.controlUp === true) {
        //if will go off screen, don't move, account for width/height of character and amount to move
        if (character.yPosition - wideFactor * (character.height) / 2.0 - negY < 0) {
            //pass do nothing, don't move character out of area
        } else {
            //moveCharacterBy(character, 0, negY);
            finalYMove += negY;
        }
    }
    if (game.controlDown === true) {
        //if will go off screen, don't move, account for width/height of character and amount to move
        if (character.yPosition + wideFactor * (character.height) / 2.0 + posY > game.playAreaHeight) {
            //pass do nothing, don't move character out of area
        } else {
            finalYMove += posY;
            //moveCharacterBy(character, 0, posY);
        }
    }

    if ((finalYMove === 0) && (finalXMove !== 0)) {
        moveCharacterBy(character, finalXMove, 0);
    }
    else if ((finalXMove === 0) && (finalYMove !== 0)) {
        moveCharacterBy(character, 0, finalYMove);
    }
    else {
        finalXMove = 0.707 * finalXMove;
        finalYMove = 0.707 * finalYMove;
        moveCharacterBy(character, finalXMove, finalYMove);
    }
    //if something is happening return true, allows for knowing if l/r/u/d being pressed at all, which
    //can be used to add sounds/visual effects while moving
    if ((game.controlLeft === true) ||
        (game.controlRight === true) ||
        (game.controlUp === true) ||
        (game.controlDown === true)) {
        return true;
    } else {
        return false;
    }
}

function respondToControlsWithScroll(character, game, negX, posX, negY, posY) {
    if (game.controlLeft === true) {
        moveCharacterBy(character, negX, 0);
    }
    if (game.controlRight === true) {
        moveCharacterBy(character, posX, 0);
    }
    if (game.controlUp === true) {
        moveCharacterBy(character, 0, negY);
    }
    if (game.controlDown === true) {
        moveCharacterBy(character, 0, posY);
    }
    if ((game.controlLeft === true) ||
        (game.controlRight === true) ||
        (game.controlUp === true) ||
        (game.controlDown === true)) {
        return true;
    } else {
        return false;
    }
}



function respondToControlsWithRotate(character, leftDegrees, rightDegrees, forwardBy, backwardBy) {

    let game = character.game;

    let angleInRads = character.angle * 2 * Math.PI / 360.0;

    if (game.controlLeft === true) {
        rotateByAngle(character, leftDegrees);
    }
    if (game.controlRight === true) {
        rotateByAngle(character, -rightDegrees);
    }
    if (game.controlUp === true) {
        //if will go off screen, don't move, account for width/height of character and amount to move
        let xmove = forwardBy * (Math.sin(angleInRads));
        if (
            (xmove + character.xPosition + character.width >= game.playAreaWidth) || //adding x goes past right boundary
            (xmove + character.xPosition - character.width <= 0) // or past left boundary
        ) {
            xmove = 0;
        }

        let ymove = -forwardBy * (Math.cos(angleInRads));
        if (
            (ymove + character.yPosition + character.width >= game.playAreaHeight) || //adding x goes past right boundary
            (ymove + character.yPosition - character.width <= 0) // or past left boundary
        ) {
            ymove = 0;
        }
        moveCharacterBy(character, xmove, ymove);
    }

    if (game.controlDown === true) {
        //if will go off screen, don't move, account for width/height of character and amount to move
        let xmove = -backwardBy * (Math.sin(angleInRads));
        if (
            (xmove + character.xPosition + character.width >= game.playAreaWidth) || //adding x goes past right boundary
            (xmove + character.xPosition - character.width <= 0) // or past left boundary
        ) {
            xmove = 0;
        }

        let ymove = backwardBy * (Math.cos(angleInRads));
        if (
            (ymove + character.yPosition + character.width >= game.playAreaHeight) || //adding x goes past right boundary
            (ymove + character.yPosition - character.width <= 0) // or past left boundary
        ) {
            ymove = 0;
        }
        moveCharacterBy(character, xmove, ymove);

    }
    if ((game.controlLeft === true) ||
        (game.controlRight === true) ||
        (game.controlUp === true) ||
        (game.controlDown === true)) {
        return true;
    } else {
        return false;
    }
}

function makeDissapearInSeconds(character, seconds) {
    duration = seconds * 1000.0; //convert to float and milliseconds
    setTimeout(() => {
        character.setText("");
    }, duration);
}

function collisionDetect(character1, character2, hitboxscale0to1 = 0.5) {
    hitBoxX = (character1.getCharacterWidth() + character2.getCharacterWidth()) / 2.0; //average works well
    hitBoxX *= hitboxscale0to1; //text characters usually do not completely fill div
    hitBoxY = (character1.getCharacterHeight() + character2.getCharacterHeight()) / 2.0; //average works well
    hitBoxY *= hitboxscale0to1; //text characters usually do not completely fill div
    ////console.log"hitboxx", hitBoxX, "hitboxy", hitBoxY)
    if ((character1.text === "") || (character2.text === "")) {
        return false;
    } else if (
        (Math.abs(character1.getXPosition() - character2.getXPosition()) < hitBoxX) &&
        (Math.abs(character1.getYPosition() - character2.getYPosition()) < hitBoxY)
    ) {
        ////console.log"!!!!!!!!!!HITS!!!!!!!!!!!");
        return true;
    }
}

function randomNumberZeroToNumber(number) {
    value = Math.random() * (number + 1);
    value = Math.floor(value);
    return value;
}
function randomFloatLowToHigh(low, high) {
    return Math.random() * (high - low) + low;
}
function randomIntLowToHigh(low, high) {
    return Math.floor(Math.random() * (high - low + 1)) + low;
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


function spinningMessage(message = "!!", game, seconds = .77, startSize = "1.2em", endSize = "1.7em", thisColor = 'black') {
    if (document.getElementById("spinning-message") == null) {
        messageGameCharacter = new GameCharacter("spinning-message", message, game.playAreaWidth / 2, game.playAreaHeight / 2, -90, game, startSize);
        messageGameCharacter.characterElement.style.color = thisColor;
    } else {
        messageGameCharacter.characterElement.style.fontSize = startSize;
        document.getElementById("spinning-message").innerHTML = message;
    }
    if (document.getElementById("spinning-message").innerHTML != "") {
        setAngle(messageGameCharacter, -90);
        makeDissapearInSeconds(messageGameCharacter, seconds);
        let rotatingMessage = setInterval(() => {
            if (getAngle(messageGameCharacter) < 0) {
                rotateByAngle(messageGameCharacter, -1);
            } else {
                messageGameCharacter.characterElement.style.fontSize = endSize;
                clearInterval(rotatingMessage);
            }
        }, 1 / 90.0);
    }
}

function showControls(controlCode) {
    //slr   sud lr  ud s lrud slrud
    if ((controlCode) === "slr") {
        document.getElementById("space").style.gridArea = "space";
        document.getElementById("left").style.gridArea = "left";
        document.getElementById("right").style.gridArea = "right";
        document.getElementById("up").style.display = "none";
        document.getElementById("down").style.display = "none";
        document.getElementById("controlsArea").style.gridTemplateColumns="auto auto auto auto";
        document.getElementById("controlsArea").style.gridTemplateAreas="'space space left right' 'space space left right'";
    }
    else if ((controlCode) === "sud") {
        document.getElementById("space").style.gridArea = "space";
        document.getElementById("left").style.display = "none";
        document.getElementById("right").style.display = "none";
        document.getElementById("up").style.gridArea = "up";
        document.getElementById("down").style.gridArea = "down";
        document.getElementById("controlsArea").style.gridTemplateColumns="auto auto auto auto auto";
        document.getElementById("controlsArea").style.gridTemplateAreas="'space space up up up' 'space space down down down'";
    }
    else if ((controlCode) === "lr") {
        document.getElementById("space").style.display = "none";
        document.getElementById("left").style.gridArea = "left";
        document.getElementById("right").style.gridArea = "right";
        document.getElementById("up").style.display = "none";
        document.getElementById("down").style.display = "none";
        document.getElementById("controlsArea").style.gridTemplateColumns="auto auto auto auto";
        document.getElementById("controlsArea").style.gridTemplateAreas="'left left right right' 'left left right right'";
    }
    else if ((controlCode) === "ud") {
        document.getElementById("space").style.display = "none";
        document.getElementById("left").style.display = "none";
        document.getElementById("right").style.display = "none";
        document.getElementById("up").style.gridArea = "up";
        document.getElementById("down").style.gridArea = "down";
        document.getElementById("controlsArea").style.gridTemplateColumns="auto auto auto auto";
        document.getElementById("controlsArea").style.gridTemplateAreas="'up up up up' 'down down down down'";
    }
    else if ((controlCode) === "s") {
        document.getElementById("space").style.gridArea = "space";
        document.getElementById("left").style.display = "none";
        document.getElementById("right").style.display = "none";
        document.getElementById("up").style.display = "none";
        document.getElementById("down").style.display = "none";
        document.getElementById("controlsArea").style.gridTemplateColumns="auto auto auto auto auto";
        document.getElementById("controlsArea").style.gridTemplateAreas="'space space space space space' 'space space space space space'";
    }
    else if ((controlCode) === "lrud") {
        document.getElementById("space").style.display = "none";
        document.getElementById("left").style.gridArea = "left";
        document.getElementById("right").style.gridArea = "right";
        document.getElementById("up").style.gridArea = "up";
        document.getElementById("down").style.gridArea = "down";
        document.getElementById("controlsArea").style.gridTemplateColumns="auto auto auto auto";
        document.getElementById("controlsArea").style.gridTemplateAreas="'left up up right' 'left down down right'";
    }
    else {
        document.getElementById("space").style.gridArea = "space";
        document.getElementById("left").style.gridArea = "left";
        document.getElementById("right").style.gridArea = "right";
        document.getElementById("up").style.gridArea = "up";
        document.getElementById("down").style.gridArea = "down";
        document.getElementById("controlsArea").style.gridTemplateColumns="auto auto auto auto auto";
        document.getElementById("controlsArea").style.gridTemplateAreas="'space space left up right' 'space space left down right'";
    }
}

