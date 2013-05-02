define(["context", "statics"], function(context, STATICS) {

    return function() {

        var destinations = [],
            attack = 0.1,
            decay = 0.3,
            sustain = 0.7,
            release = 0.21,
            currentNote = -1;

        function start(data) {
            currentNote = data.note;
            var time = data.time || context.currentTime;
            for(var i = 0; i < destinations.length; i++){
                destinations[i].cancelScheduledValues(time);
                //time = time + 0.01;
                destinations[i].setValueAtTime(destinations[i].value, time);
                destinations[i].linearRampToValueAtTime(destinations[i].parameterValue, time + attack);
                destinations[i].linearRampToValueAtTime(destinations[i].parameterValue * sustain, time + attack + decay);
            }
        }

        function stop(data) {
            if(data.note !== currentNote){
                return;
            }
            var time = data.time || context.currentTime;
            for(var i = 0; i < destinations.length; i++){
                destinations[i].cancelScheduledValues(time);
                destinations[i].setValueAtTime(destinations[i].value, time);
                destinations[i].linearRampToValueAtTime(0, time + release);
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