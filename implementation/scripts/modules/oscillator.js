define(["context", "statics"], function(context, STATICS) {

    return function() {
        var pitch = 440,
            glide = 0.2,
            oscillator,
            destination,
            controllers = {},
            waveform = "sawtooth",
            modulators = {},
            oscillators = {},
            waveforms = ["sawtooth", "square"],
            playing = false;

        function start(note, time) {

            //calculate the frequency of the note we're going to play
            pitch = getFrequency(note);
            //if glide is on and a note is currently playing, we need to tween the frequency of the currently playing note, or else just set the frequency
            if (playing && glide > 0) {
                console.log("is playing");
                for(var i in oscillators){
                    oscillators[i].frequency.cancelScheduledValues(time);
                    oscillators[i].frequency.linearRampToValueAtTime(pitch, time + glide);
                }
            } else {
                for(var ii in oscillators){
                    oscillators[ii].frequency.cancelScheduledValues(time);
                    oscillators[ii].frequency.setValueAtTime(pitch, time);
                }
            }

            //add moudlation as needed
            for (var source in modulators) {
                //modulators[source].start(oscillator[source]);
            }

            playing = true;
        }

        function getFrequency(note) {
            //convert midi notes 0-127 to the corresponding frequency
            return 8.1757989156 * Math.pow(2.0, note / 12.0);
        }

        function stop(note, time) {
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
            var osc;
            for(var i = 0; i < waveforms.length; i++){
                osc = context.createOscillator();
                osc.type = waveforms[i];
                oscillators[waveforms[i]] = osc;
                osc.gain = context.createGain();
                if(waveform === waveforms[i]){
                    osc.gain.gain.value = 1;
                    console.log(1);
                } else {
                    osc.gain.gain.value = 0;
                    console.log(0);
                }
                osc.connect(osc.gain);
                osc.gain.connect(destination);
                osc.start(0);
            }
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