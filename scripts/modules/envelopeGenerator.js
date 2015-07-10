define(["context", "statics"], function(context, STATICS) {

    return function(data) {

        if (!data) {
            data = {};
        }

        var destinations = [],
            _attack = data.attack === undefined ? 0.1 : data.attack,
            _decay = data.decay === undefined ? 0.3 : data.decay,
            _sustain = data.sustain === undefined ? 0.7 : data.sustain,
            _release = data.release === undefined ? 0.21 : data.release,
            _amount = data.amount === undefined ? 0 : data.amount,
            _data = data,
            currentNote = -1;

        function start(data) {
            currentNote = data.note;
            var time = data.time || context.currentTime,
                paramValue,
                product;
            for (var i = 0; i < destinations.length; i++) {
                paramValue = destinations[i].parameterValue;
                product = paramValue * _amount;
                destinations[i].cancelScheduledValues(time);
                //destinations[i].setValueAtTime(paramValue, time);
                destinations[i].setValueAtTime(destinations[i].value, time);
                destinations[i].linearRampToValueAtTime(paramValue + product, time + _attack);
                destinations[i].linearRampToValueAtTime(paramValue + (product * _sustain), time + _attack + _decay);
            }
        }

        function stop(data) {
            if (data.note !== currentNote) {
                return;
            }
            var time = data.time || context.currentTime;
            for (var i = 0; i < destinations.length; i++) {
                paramMin = destinations[i].parameterMinValue || 0;
                destinations[i].cancelScheduledValues(time);
                destinations[i].setValueAtTime(destinations[i].value, time);
                destinations[i].linearRampToValueAtTime(paramMin, time + _release);
            }
        }

        function modulate(destination) {
            destinations.push(destination);
        }

        function getViewData() {
            var data = {
                type: "oscillator",
                properties: {
                    attack: {
                        type: "slider",
                        min: 0.001,
                        max: 5,
                        value: 0.2,
                        step: 0.01,
                        onChange: function(e) {
                            _attack = parseFloat(e.target.value);
                        }
                    },
                    decay: {
                        type: "slider",
                        min: 0,
                        max: 5,
                        value: 0.2,
                        step: 0.01,
                        onChange: function(e) {
                            _decay = Math.pow(parseFloat(e.target.value), 1.2);
                        }
                    },
                    sustain: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 1,
                        step: 0.01,
                        onChange: function(e) {
                            _sustain = parseFloat(e.target.value);
                        }
                    },
                    release: {
                        type: "slider",
                        min: 0.01,
                        max: 10,
                        value: 0.2,
                        step: 0.01,
                        onChange: function(e) {
                            _release = Math.pow(parseFloat(e.target.value), 1.2);
                        }
                    },
                    amount: {
                        type: "slider",
                        min: _data.amountMin === undefined ? -1 : _data.amountMin,
                        max: 1,
                        value: 0,
                        step: 0.01,
                        onChange: function(e) {
                            _amount = parseFloat(e.target.value);
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
