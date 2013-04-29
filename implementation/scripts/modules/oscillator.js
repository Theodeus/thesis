define(["context"], function(context) {

    return function() {
        var waveform,
            pitch = 440,
            glide = 0.09,
            oscillator,
            destination,
            playing = false,
            id = Math.random(),
            currentNote = -1,
            controllers = {};

        function start(note, time) {
            if (playing && glide === 0) {
                stop();
            } else if (playing && glide > 0) {
                pitch = getFrequency(note);
                oscillator.frequency.setTargetAtTime(pitch, context.currentTime, glide);
                oscillator.type = "sawtooth";
                oscillator.start(time);
                playing = true;
                currentNote = note;
                return;
            }
            pitch = getFrequency(note);
            oscillator = context.createOscillator();
            oscillator.connect(destination);
            oscillator.frequency.value = pitch;
            oscillator.type = "sawtooth";
            oscillator.start(time);
            playing = true;
            currentNote = note;
        }

        function getFrequency(note) {
            return 8.1757989156 * Math.pow(2.0, note / 12.0);
        }

        function stop(note, time) {
            if (note !== undefined && note !== currentNote) {
                return;
            }
            oscillator.stop(time);
            playing = false;
        }

        function setValue(propertyName, value) {
            switch(propertyName){
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

        return {
            start: start,
            stop: stop,
            setValue: setValue,
            id: id,
            connect: connect,
            disconnect: disconnect
        };
    };
});