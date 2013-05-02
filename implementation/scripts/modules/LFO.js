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

        return {
            start: start,
            stop: stop,
            modulate: modulate
        };
    };
});