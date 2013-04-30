define(["modules/envelopeGenerator", "modules/LFO", "context"], function(envGenerator, lfo, context) {
    var modules = [],
        input = function(type, data){
            switch(type){
                case "noteOn":
                    start(data);
                    break;
                case "noteOff":
                    stop(data);
                    break;
                default:
                    console.error("received an unknow type of message", type, data);
                    break;
            }
        };

    function start(data){
        for(var i = 0; i < modules.length; i++){
            modules[i].start(data);
        }
    }

    function stop(data){
        for(var i = 0; i < modules.length; i++){
            modules[i].stop(data);
        }
    }

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