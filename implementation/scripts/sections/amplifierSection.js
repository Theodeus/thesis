define(["sections/modulationSection", "context"], function(modSection, context) {
    var input = context.createGain(),
        output = context.createGain(),
        level = 0.2;

    output.gain.value = 0;
    input.connect(output);

    function connect(destination) {
        output.connect(destination);
        output.gain.parameterValue = level;
        modSection.routePassive("envelopeGenerator", output, "ampEnv", "gain");
    }

    function disconnect() {
        output.disconnect();
    }

    function setValue(propertyName, value) {
        switch (propertyName) {
            case "level":
                level = value;
                setLevel(value);
                return;
            default:
                console.log("set", propertyName, value);
                return;
        }
    }

    function setLevel(value){
        output.gain.value = value;
    }


    return {
        input: input,
        connect: connect,
        disconnect: disconnect
    };
});