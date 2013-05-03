define(["context"], function(context) {
    var input = context.createGain(),
        filter = context.createBiquadFilter(),
        output = context.createGain(),
        _cutoffFrequency = 1200,
        _resonance = 0,
        type = "lowpass";

    input.connect(filter);
    filter.connect(output);

    filter.type = type;
    filter.frequency.value = _cutoffFrequency;
    filter.Q.value = _resonance;

    function connect(destination) {
        output.connect(destination);
    }

    function disconnect() {
        output.disconnect();
    }

    function setValue(propertyName, value) {
        switch (propertyName) {
            default:
                console.log("set", propertyName, value);
                return;
        }
    }

    function getViewData(){
            var data = {
                type: "filter",
                properties: {
                    cutoffFrequency: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 0.54,
                        step: 0.001,
                        onChange: function(e){
                            filter.frequency.value = _cutoffFrequency = Math.pow(parseFloat(e.target.value), 3.5) * 10000 + 20;
                        }
                    },
                    resonance: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 0,
                        step: 0.001,
                        onChange: function(e){
                            filter.Q.value = _resonance = Math.pow(parseFloat(e.target.value), 3.5) * 50;
                        }
                    }
                }

            };
            return data;
        }

    return {
        input: input,
        connect: connect,
        disconnect: disconnect,
        getViewData: getViewData
    };
});