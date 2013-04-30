define(["context", "statics"], function(context, STATICS) {

    return function() {

        var destinations = [],
            attack = 0.2,
            decay = 0.05,
            sustain = 0.4,
            release = 0.3;

        function start(note, time) {
            for(var i = 0; i < destinations.length; i++){
                destinations[i].cancelScheduledValues(time);
                destinations[i].setTargetAtTime(destinations[i].parameterValue, time, time + attack);
                destinations[i].setTargetAtTime(sustain, time + attack, time + attack + decay);
                destinations[i].setTargetAtTime(0, time + attack + decay, time + attack + decay + release);
            }
        }

        function stop(note, time) {

        }

        function modulate(destination){
            destinations.push(destination);
        }

        return {
            start: start,
            stop: stop,
            modulate: modulate
        };
    };
});