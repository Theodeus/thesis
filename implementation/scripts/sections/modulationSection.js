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

    //create a modulator and register it at the destination
    function route(modType, destination, propertyName){
        var modulator = createModulator(modType);
        destination.registerModulator(modulator, propertyName);
    }

    function createModulator(modType){
        switch(modType){
            case "LFO":
                return new lfo();
            case "envelopeGenerator":
                return new envGenerator();
            default:
                console.error("unknown modulation source", modType);
                break;
        }
    }

    return {
        input: input,
        route: route
    };
});