define(["context", "statics"], function(context, STATICS) {

    return function() {
        var pitch = 440,
            glide = 0.05,
            oscillator,
            destination,
            playing = false,
            currentNote = -1,
            controllers = {},
            waveform = 0,
            modulators = {};

        function start(note, time) {

            //stop previous note if it's still playing
            if (playing && glide === 0) {
                stop();
            }

            //create a new oscillator if there's none playing (oscillators are one shot in Web Audio)
            if (!playing) {
                oscillator = context.createOscillator();
                oscillator.connect(destination);
                oscillator.type = STATICS.waveforms[waveform];
            }

            //calculate the frequency of the note we're going to play
            pitch = getFrequency(note);

            //if glide is on and a note is currently playing, we need to tween the frequency of the currently playing note, or else just set the frequency
            if (playing && glide > 0) {
                oscillator.frequency.setTargetAtTime(pitch, context.currentTime, glide);
            } else {
                oscillator.frequency.value = pitch;
            }

            //add moudlation as needed
            for (var source in modulators) {
                modulators[source].start(oscillator[source]);
            }

            oscillator.start(time);
            playing = true;
            currentNote = note;
        }

        function getFrequency(note) {
            //convert midi notes 0-127 to the corresponding frequency
            return 8.1757989156 * Math.pow(2.0, note / 12.0);
        }

        function stop(note, time) {
            //don't stop the oscillator if it's another key that has been lifted
            if (note !== undefined && note !== currentNote) {
                return;
            }

            //stop moudlation as needed
            for (var source in modulators) {
                modulators[source].stop(oscillator[source]);
            }
            oscillator.stop(time);
            playing = false;
        }

        function setValue(propertyName, value) {
            switch (propertyName) {
                default:
                    console.log("set", propertyName, value);
                    return;
            }
        }

        function connect(target) {
            destination = target;
        }

        function disconnect() {
            destination = null;
        }

        function registerModulator(source, destination) {
            switch (destination) {
                case "frequency":
                    modulators["frequency"] = source;
                    break;
                default:
                    console.error("unknow modulation destination", destination, source);
                    break;
            }
        }

        return {
            start: start,
            stop: stop,
            setValue: setValue,
            connect: connect,
            disconnect: disconnect
        };
    };
});