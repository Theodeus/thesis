define(["context", "statics"], function(context, STATICS) {

    return function() {

        var destinations = [],
            oscillator = context.createOscillator(),
            _frequency = 2,
            _amount = 1,
            LFOreset = true,
            _waveform = "triangle";

        var amountNode = context.createGain();
        amountNode.gain.value = _amount;

        oscillator = context.createOscillator(),
        oscillator.frequency.value = _frequency;
        oscillator.type = _waveform;
        oscillator.start(0);
        amountNode.gain.value = _amount;
        oscillator.connect(amountNode);

        function start(data) {
            if(LFOreset){
                //new oscillator to reset the phase of the LFO
                oscillator.disconnect();
                oscillator = context.createOscillator(),
                oscillator.frequency.value = _frequency;
                oscillator.type = _waveform;
                oscillator.start(0);
                amountNode.gain.value = _amount;
                oscillator.connect(amountNode);
            }
        }

        function stop(data) {

        }

        function modulate(destination){
            destinations.push(destination);
            amountNode.connect(destination);
        }

        function getViewData(){
            var data = {
                type: "oscillator",
                properties: {
                    amount: {
                        type: "slider",
                        min: 0,
                        max: 200,
                        value: 1,
                        step: 0.001,
                        onChange: function(e) {
                            amountNode.gain.value = _amount = Math.pow(parseFloat(e.target.value), 1.5);
                        }
                    },
                    rate: {
                        type: "slider",
                        min: 0,
                        max: 200,
                        value: 1,
                        step: 0.001,
                        onChange: function(e) {
                            oscillator.frequency.value = _frequency = parseFloat(e.target.value);
                            console.log(_frequency);
                        }
                    },
                    waveform: {
                        type: "selector",
                        options: ["triangle", "square", "sine", "sawtooth"],
                        currentOption: "triangle",
                        onChange: function(e){
                            oscillator.type = _waveform = e.target.value;
                        }
                    }
                }

            };
            return data;
        }

        return {
            start: start,
            stop: stop,
            modulate: modulate,
            getViewData: getViewData
        };
    };
});