define(["sections/modulationSection", "context"], function(modSection, context) {
    var input = context.createGain(),
        output = context.createGain(),
        _level = 0.5;

    output.gain.value = 0;
    input.connect(output);

    function connect(destination) {
        output.connect(destination);
        output.gain.parameterValue = _level;
        modSection.route("envelopeGenerator", output, "ampEnv", "gain", {amountMin: 0});
    }

    function disconnect() {
        output.disconnect();
    }

    function getViewData() {
        var data = {
            type: "amplifier",
            properties: {
                level: {
                    type: "slider",
                    min: 0,
                    max: 1,
                    value: 0.65,
                    step: 0.001,
                    onChange: function(e) {
                        output.gain.parameterValue = _level = Math.pow(parseFloat(e.target.value), 1.5);
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