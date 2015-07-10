define(["sections/modulationSection", "context"], function(modSection, context) {
    var input = context.createGain(),
        filter = context.createBiquadFilter(),
        output = context.createGain(),
        _cutoffFrequency = 1200,
        _resonance = 0,
        _type = "lowpass",
        types = ["lowpass", "highpass", "bandpass"];

    input.connect(filter);
    filter.connect(output);

    filter.type = _type;
    filter.frequency.value = _cutoffFrequency;
    filter.frequency.parameterValue = _cutoffFrequency;
    filter.Q.value = _resonance;

    function connect(destination) {
        output.connect(destination);
        modSection.route("envelopeGenerator", filter, "filterEnv", "frequency");
    }

    function disconnect() {
        output.disconnect();
    }

    function setValue(propertyName, value) {
        switch (propertyName) {
            default: console.log("set", propertyName, value);
            return;
        }
    }

    function getViewData() {
        var data = {
            type: "filter",
            properties: {
                cutoffFrequency: {
                    type: "slider",
                    min: 0,
                    max: 1,
                    value: 0.54,
                    step: 0.001,
                    onChange: function(e) {
                        var value = Math.pow(parseFloat(e.target.value), 3.5) * 10000 + 20;
                        filter.frequency.cancelScheduledValues(context.currentTime);
                        filter.frequency.parameterValue = _cutoffFrequency = value;
                        filter.frequency.parameterMinValue = _cutoffFrequency / 2;
                        filter.frequency.setValueAtTime(value, context.currentTime);
                    }
                },
                resonance: {
                    type: "slider",
                    min: 0,
                    max: 1,
                    value: 0,
                    step: 0.001,
                    onChange: function(e) {
                        filter.Q.value = _resonance = Math.pow(parseFloat(e.target.value), 4.5) * 50;
                    }
                },
                type: {
                    type: "selector",
                    options: types,
                    currentOption: _type,
                    onChange: function(e) {
                        filter.type = _type = e.target.value;
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
