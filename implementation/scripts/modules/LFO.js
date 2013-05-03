define(["context", "statics"], function(context, STATICS) {

    return function() {

        var destinations = [],
            oscillator = context.createOscillator(),
            frequency = 2,
            amountValue = 1,
            LFOreset = true;

        var amount = context.createGain();
        amount.gain.value = amountValue;

        oscillator = context.createOscillator(),
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        oscillator.start(0);
        amount.gain.value = amountValue;
        oscillator.connect(amount);

        function start(data) {
            if(LFOreset){
                //new oscillator to reset the phase of the LFO
                oscillator.disconnect();
                oscillator = context.createOscillator(),
                oscillator.frequency.value = frequency;
                oscillator.type = "sine";
                oscillator.start(0);
                amount.gain.value = amountValue;
                oscillator.connect(amount);
            }
        }

        function stop(data) {

        }

        function modulate(destination){
            destinations.push(destination);
            amount.connect(destination);
        }

        function getViewData(){
            var data = {
                type: "oscillator",
                properties: {
                    /*waveform: {
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
                    }*/
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