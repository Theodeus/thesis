define(["sections/modulationSection", "context", "statics", "utils"], function(modSection, context, STATICS, utils) {

    return function() {
        var pitch = 440,
            _tune = 1,
            _glide = 0.2,
            waveform = "sawtooth",
            oscillators = {},
            waveforms = ["sawtooth", "square"],
            playing = false,
            output = context.createGain(),
            that = this;

        function start(note, time) {

            //calculate the frequency of the note we're going to play
            pitch = getFrequency(note);
            var _pitch = pitch * _tune;
            //if glide is on and a note is currently playing, we need to tween the frequency of the currently playing note, or else just set the frequency
            if (playing && _glide > 0) {
                for(var ii in oscillators){
                    oscillators[ii].frequency.cancelScheduledValues(time);
                    oscillators[ii].frequency.linearRampToValueAtTime(_pitch, time + _glide);
                }
            } else {
                for(var iii in oscillators){
                    oscillators[iii].frequency.cancelScheduledValues(time);
                    oscillators[iii].frequency.setValueAtTime(_pitch, time);
                }
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

        function connect(target) {
            output.connect(target);
        }

        function init(){
            var osc;
            for(var i = 0; i < waveforms.length; i++){
                osc = context.createOscillator();
                osc.type = waveforms[i];
                oscillators[waveforms[i]] = osc;
                osc.gain = context.createGain();
                if(waveform === waveforms[i]){
                    osc.gain.gain.value = 1;
                } else {
                    osc.gain.gain.value = 0;
                }
                osc.connect(osc.gain);
                osc.gain.connect(output);
                osc.start(0);

                modSection.route("LFO", osc, "pitchLFO1", "frequency");
            }
        }

        function disconnect() {
            output.disconnect();
        }

        function getViewData(){
            var data = {
                type: "oscillator",
                properties: {
                    waveform: {
                        type: "selector",
                        options: waveforms,
                        currentOption: waveform,
                        onChange: function(e){
                            var waveform = e.target.value;
                            for(var osc in oscillators){
                                if(oscillators[osc].type === waveform){
                                    oscillators[osc].gain.gain.value = 1;
                                } else {
                                    oscillators[osc].gain.gain.value = 0;
                                }
                            }
                        }
                    },
                    glide: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 0,
                        step: 0.01,
                        onChange: function(e){
                            _glide = parseFloat(e.target.value);
                            if(_glide < 0.03){
                                _glide = 0;
                            }
                        }
                    },
                    tune: {
                        type: "slider",
                        min: 0.25,
                        max: 2,
                        value: 1,
                        step: 0.01,
                        onChange: function(e){
                            _tune = parseFloat(e.target.value);
                            for(var i in oscillators){
                                oscillators[i].frequency.cancelScheduledValues(context.currentTime);
                                oscillators[i].frequency.setValueAtTime(pitch * _tune, context.currentTime);
                            }
                        }
                    }
                }

            };
            return data;
        }

        return {
            start: start,
            stop: stop,
            connect: connect,
            disconnect: disconnect,
            output: output,
            getViewData: getViewData,
            init: init
        };
    };
});