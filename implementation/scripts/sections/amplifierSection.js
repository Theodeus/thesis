define(["sections/modulationSection", "context"], function(modSection, context) {
    var input = context.createGain(),
        left = context.createGain(),
        right = context.createGain(),
        output = context.createGain(),
        splitter = context.createChannelSplitter(2),
        merger = context.createChannelMerger(2),
        _level = 0.5;

    output.gain.value = 0;
    left.gain.value = 0.5;
    right.gain.value = 0.5;
    input.connect(splitter);
    splitter.connect(left, 0);
    splitter.connect(right, 1);
    left.connect(merger, 0, 0);
    right.connect(merger, 0, 1);
    merger.connect(output);

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
                panning: {
                    type: "slider",
                    min: -0.5,
                    max: 0.5,
                    value: 0,
                    step: 0.01,
                    onChange: function(e){
                        var value = parseFloat(e.target.value);
                        left.gain.value = 0.5 - value;
                        right.gain.value = 0.5 + value;
                    }
                },
                level: {
                    type: "slider",
                    min: 0,
                    max: 1,
                    value: 0.65,
                    step: 0.001,
                    onChange: function(e) {
                        var value =  Math.pow(parseFloat(e.target.value), 1.5);
                        output.gain.cancelScheduledValues(context.currentTime);
                        output.gain.setValueAtTime(value, context.currentTime);
                        output.gain.parameterValue = _level = value;
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