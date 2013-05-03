define(["modules/envelopeGenerator", "modules/LFO", "context"], function(envGenerator, lfo, context) {
    var modules = {},
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
        for(var i in modules){
            modules[i].start(data);
        }
    }

    function stop(data){
        for(var i in modules){
            modules[i].stop(data);
        }
    }
    function route(modType, destination, modulatorName, propertyName){
        var modulator = getModulator(modulatorName, modType);
        modulator.name = modulatorName;
        modules[modulatorName] = modulator;
        modulator.modulate(destination[propertyName]);
    }

    function getModulator(modulatorName, modType){

        if(modules[modulatorName]){
            return modules[modulatorName];
        }

        switch(modType){
            case "LFO":
                modules[modulatorName] = new lfo();
                return modules[modulatorName];
            case "envelopeGenerator":
                modules[modulatorName] = new envGenerator();
                return modules[modulatorName];
            default:
                console.error("unknown modulation source", modType);
                break;
        }
    }

    function getViewData(){
        var data = {modules: {}};

        for(var mod in modules){
            data["modules"][mod] = modules[mod].getViewData();
        }
        return data;
    }

    return {
        input: input,
        route: route,
        getViewData: getViewData
    };
});