define(["context"], function(context) {
    var input = context.createGain(),
        output = context.createGain();

    input.connect(output);

    function connect(destination) {
        output.connect(destination);
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