//////////////START SOUND BLOCK////////////////

function soundplay(mysound) {
    //console.log("mysound instanceof Tone");
    //console.log(mysound instanceof Tone);

    if (mysound instanceof Audio) {
        // console.log(mysound);
        // console.log("it is an instance of an Audio Object!!!!!");
        if (isPlaying(mysound) === false) {
            mysound.play();
        }
    } else if (mysound instanceof Tone) {
        mysound.play();
    } else {
        // console.log(mysound);
        // console.log("it is a File!!!!!");
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
        // console.log(mysound);
        // console.log("it is an instance of an Audio Object!!!!!");
        if (isPlaying(mysound) === false) {
            mysound.loop = true;
            mysound.play();
        }
    } else if (mysound instanceof Tone) {
        mysound.durationMS = 100000000;
        mysound.play();
    } else {
        // console.log(mysound);
        // console.log("it is a File !!!!!");
        filename = mysound;
        //check to see if it is in list of sounds by filename
        if (filename in soundsByFilename) {
            // console.log(filename, "filename in soundsByFilename!");
            //if its already playing return
            if (isPlaying(soundsByFilename[filename]) === true) {
                // console.log("and playing is true!");
                return;
            }
            //if its not playing play it
            else {
                // console.log("and playing is false!, starting to play");
                soundsByFilename[filename].loop = true;
                soundsByFilename[filename].play();
                return soundsByFilename[filename];
            }
        }
        //it is not in list of sounds by filename
        else {
            // console.log(filename, "filename NOT in soundsByFilename!");
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
        // console.log(mysound);
        // console.log("it is an instance of an Audio Object!!!!!");
        mysound.pause();
        mysound.currentTime = 0;
    } else if (mysound instanceof Tone) {
        mysound.stop();
    } else {
        // console.log(mysound);
        // console.log("it is a File!!!!!");
        filename = mysound;
        if (filename in soundsByFilename) {
            // console.log(soundsByFilename);
            // console.log("filename", filename, "in list, trying to pause");

            soundsByFilename[filename].pause();
            soundsByFilename.currentTime = 0;
        } else {
            // console.log(filename, "not found in keys of soundsByFilename{}");
        }
    }
}

function isPlaying(mysound) {
    //needs coded for Tone objects
    return !mysound.paused;
}

class Tone {
    constructor(frequencyHz = 440, durationMS = 1000, type = "sine", bass = 0, mid = 0, treble = 0) {
        this.frequencyHz = frequencyHz;
        this.durationMS = durationMS;
        this.type = type;
        this.bass = bass;
        this.mid = mid;
        this.treble = treble;
        this.audioCtx = new(window.AudioContext || window.webkitAudioContext);
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

    play() {
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

    stop() {
        clearTimeout(this.cancelStop);
        this.gainControl.gain.setValueAtTime(this.gainControl.gain.value, this.audioCtx.currentTime);
        this.gainControl.gain.linearRampToValueAtTime(0, this.audioCtx.currentTime + 0.03);
    }
}

//////////////START SOUND BLOCK////////////////
