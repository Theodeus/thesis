define(["modules/envelopeGenerator", "modules/LFO", "context"], function(envGenerator, lfo, context) {
    var activeModules = {},
        passiveModules = {},
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
        for(var i in passiveModules){
            passiveModules[i].start(data);
        }
    }

    function stop(data){
        for(var i in passiveModules){
            passiveModules[i].stop(data);
        }
    }

    //create a modulator for a destination that changes (oscillators are replaced etc.), the destination tells the source when to start
    function routeActive(modType, destination, modulatorName, propertyName){
        var modulator = createModulator(modType);
        modulator.name = modulatorName;
        activeModules[modulatorName] = modulator;
        destination.registerModulator(modulator, propertyName);
    }

    //create a modulator for a destination that never changes (always the same gain node in the amp section etc.), the source starts on keyboard actions
    function routePassive(modType, destination, modulatorName, propertyName){
        var modulator = createModulator(modType);
        modulator.name = modulatorName;
        passiveModules[modulatorName] = modulator;
        modulator.modulate(destination[propertyName]);
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
        routeActive: routeActive,
        routePassive: routePassive
    };
});