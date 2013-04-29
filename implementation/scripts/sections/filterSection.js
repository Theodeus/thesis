define(["context"], function(context) {
    var input = context.createGain(),
        filter = context.createBiquadFilter(),
        output = context.createGain(),
        cutoffFrequency = 1200,
        resonance = 10,
        type = "lowpass";

    input.connect(filter);
    filter.connect(output);

    filter.type = type;
    filter.frequency.value = cutoffFrequency;
    filter.Q.value = resonance;

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

    return {
        input: input,
        connect: connect,
        disconnect: disconnect
    };
});