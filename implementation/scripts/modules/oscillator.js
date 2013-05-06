define(["sections/modulationSection", "context", "statics", "utils"], function(modSection, context, STATICS, utils) {

    return function() {
        var pitch = 440,
            _tune = 1,
            _glide = 0.2,
            waveform = "sawtooth",
            oscillators = {},
            unisonOscillators = {},
            waveforms = ["sawtooth", "square", "triangle"],
            playing = false,
            output = context.createGain(),
            _unison = false;

        function start(note, time) {

            //calculate the frequency of the note we're going to play
            pitch = getFrequency(note);
            var _pitch = pitch * _tune;
            //if glide is on and a note is currently playing, we need to tween the frequency of the currently playing note, or else just set the frequency
            if (playing && _glide > 0) {
                for(var ii in oscillators){
                    oscillators[ii].frequency.cancelScheduledValues(time);
                    oscillators[ii].frequency.linearRampToValueAtTime(_pitch, time + _glide);
                    if(_unison){
                        var oscs = unisonOscillators[oscillators[ii].type];
                        for(var j in oscs){
                            oscs[j].frequency.cancelScheduledValues(time);
                            oscs[j].frequency.linearRampToValueAtTime(_pitch + oscs[j].offset, time + _glide);
                        }
                    }
                }
            } else {
                for(var iii in oscillators){
                    oscillators[iii].frequency.cancelScheduledValues(time);
                    oscillators[iii].frequency.setValueAtTime(_pitch, time);
                    if(_unison){
                        oscs = unisonOscillators[oscillators[iii].type];
                        for(var jj in oscs){
                            oscs[jj].frequency.cancelScheduledValues(time);
                            oscs[jj].frequency.linearRampToValueAtTime(_pitch + oscs[jj].offset, time + _glide);
                        }
                    }
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
                oscillators[osc.type] = osc;
                unisonOscillators[osc.type] = {}; //prepare for unison mode
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

        function enableUnison(){
            var osc;
            for(var o in oscillators){
                osc = context.createOscillator();
                osc.type = oscillators[o].type;
                unisonOscillators[osc.type]["over"] = osc;
                osc.offset = 1;
                osc.frequency.value = oscillators[o].frequency.value + osc.offset;
                console.log("freq1", oscillators[o].frequency.value + osc.offset);
                osc.connect(oscillators[o].gain);
                osc.start(0);

                modSection.route("LFO", osc, "pitchLFO1", "frequency");

                osc = context.createOscillator();
                osc.type = oscillators[o].type;
                unisonOscillators[osc.type]["under"] = osc;
                osc.offset = -1;
                osc.frequency.value = oscillators[o].frequency.value + osc.offset;
                console.log("freq2", oscillators[o].frequency.value + osc.offset);
                osc.connect(oscillators[o].gain);
                osc.start(0);

                modSection.route("LFO", osc, "pitchLFO1", "frequency");
                console.log(unisonOscillators);
                oscillators[o].gain.gain.value = oscillators[o].gain.gain.value / 1.3;
            }
            console.log(oscillators);
        }

        function disableUnison(){
            for(var o in unisonOscillators){
                for(var oo in unisonOscillators[o]){
                    unisonOscillators[o][oo].disconnect();
                    delete unisonOscillators[o][oo];
                }
                oscillators[o].gain.gain.value = oscillators[o].gain.gain.value * 1.3;
            }
            console.log(oscillators);
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
                    },
                    unison: {
                        type: "switch",
                        value: "deselected",
                        onChange: function(e) {
                            if(e.target.checked){
                                _unison = true;
                                enableUnison();
                            } else {
                                _unison = false;
                                disableUnison();
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
            init: init,
            enableUnison: enableUnison
        };
    };
});