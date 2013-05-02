define(["context", "statics"], function(context, STATICS) {

    return function() {

        var destinations = [],
            attack = 0.5,
            decay = 0.3,
            sustain = 0.4,
            release = 1;

        function start(data) {
            var time = data.time || context.currentTime;
            for(var i = 0; i < destinations.length; i++){
                console.log("env start dest", destinations[i], data, time, destinations[i].parameterValue);
                destinations[i].cancelScheduledValues(time);
                destinations[i].setValueAtTime(0, time);
                destinations[i].linearRampToValueAtTime(destinations[i].parameterValue, time + attack);
                destinations[i].linearRampToValueAtTime(destinations[i].parameterValue * sustain, time + attack + decay);
            }
        }

        function stop(data) {
            var time = data.time || context.currentTime;
            for(var i = 0; i < destinations.length; i++){
                console.log("env stop dest", destinations[i], data, time, destinations[i].parameterValue);
                destinations[i].cancelScheduledValues(time);
                destinations[i].linearRampToValueAtTime(0, time, time + release);
            }
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