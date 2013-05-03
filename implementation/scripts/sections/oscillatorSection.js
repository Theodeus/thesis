define(["modules/oscillator", "modules/noisegenerator", "sections/modulationSection", "context"], function(osc, noiseGen, modSection, context) {
    var oscillators = {
            osc1: new osc(),
            osc2: new osc(),
            noise: new noiseGen()
        };
        output = context.createGain(),
        input = function(type, data){
            switch(type){
                case "noteOn":
                    start(data.note, data.time);
                    break;
                case "noteOff":
                    stop(data.note, data.time);
                    break;
                default:
                    console.error("received an unknow type of message", type, data);
                    break;
            }
        };

    function start(note, time) {
        for(var osc in oscillators){
            oscillators[osc].start(note, time || context.currentTime);
        }
    }

    function stop(note, time) {
        for(var osc in oscillators){
            oscillators[osc].stop(note, time || context.currentTime);
        }
    }

    function connect(destination) {
        for(var osc in oscillators){
            oscillators[osc].connect(destination);
        }
    }

    function disconnect() {
        for(var osc in oscillators){
            oscillators[osc].disconnect();
        }
    }

    function useMixer(targetMixer){
        for(var osc in oscillators){
            if(osc === "noise"){
                targetMixer.addChannel(osc, 0);
            } else {
                targetMixer.addChannel(osc);
            }
            targetMixer.routeInput(osc, oscillators[osc].output);
        }
    }

    function getViewData(){
        var data = {oscillators: {}};

        for(var osc in oscillators){
            data["oscillators"][osc] = oscillators[osc].getViewData();
        }
        return data;
    }


    return {
        start: start,
        stop: stop,
        input: input,
        connect: connect,
        disconnect: disconnect,
        useMixer: useMixer,
        getViewData: getViewData
    };
});