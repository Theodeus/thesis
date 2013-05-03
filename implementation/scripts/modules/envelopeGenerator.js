define(["context", "statics"], function(context, STATICS) {

    return function() {

        var destinations = [],
            _attack = 0.1,
            _decay = 0.3,
            _sustain = 0.7,
            _release = 0.21,
            currentNote = -1;

        function start(data) {
            currentNote = data.note;
            var time = data.time || context.currentTime;
            for(var i = 0; i < destinations.length; i++){
                destinations[i].cancelScheduledValues(time);
                destinations[i].setValueAtTime(destinations[i].value, time);
                destinations[i].linearRampToValueAtTime(destinations[i].parameterValue, time + _attack);
                destinations[i].linearRampToValueAtTime(destinations[i].parameterValue * _sustain, time + _attack + _decay);
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
                destinations[i].linearRampToValueAtTime(0, time + _release);
            }
        }

        function modulate(destination){
            destinations.push(destination);
        }

        function getViewData(){
            var data = {
                type: "oscillator",
                properties: {
                    attack: {
                        type: "slider",
                        min: 0.001,
                        max: 5,
                        value: 0.2,
                        step: 0.01,
                        onChange: function(e){
                            _attack = parseFloat(e.target.value);
                        }
                    },
                    decay: {
                        type: "slider",
                        min: 0,
                        max: 5,
                        value: 0.2,
                        step: 0.01,
                        onChange: function(e){
                            _decay = Math.pow(parseFloat(e.target.value), 1.2);
                        }
                    },
                    sustain: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 1,
                        step: 0.01,
                        onChange: function(e){
                            _sustain = parseFloat(e.target.value);
                        }
                    },
                    release: {
                        type: "slider",
                        min: 0.01,
                        max: 1,
                        value: 0.2,
                        step: 0.01,
                        onChange: function(e){
                            _release = Math.pow(parseFloat(e.target.value), 1.2);
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