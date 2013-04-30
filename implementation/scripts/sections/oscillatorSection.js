define(["modules/oscillator", "modules/noisegenerator", "context"], function(osc, noiseGen, context) {
    var oscillatorOne = window.oscillatorOne = new osc(),
        oscillatorTwo = window.oscillatorTwo = new osc(),
        noise = new noiseGen(),
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
        oscillatorOne.start(note, time || context.currentTime);
        oscillatorTwo.start(note, time || context.currentTime);
        noise.start(note, time || context.currentTime);
    }

    function stop(note, time) {
        oscillatorOne.stop(note, time || context.currentTime);
        oscillatorTwo.stop(note, time || context.currentTime);
        noise.stop(note, time || context.currentTime);
    }

    function connect(destination) {
        oscillatorOne.connect(destination);
        oscillatorTwo.connect(destination);
        noise.connect(destination);
    }

    function disconnect() {
        oscillatorOne.disconnect();
        oscillatorTwo.disconnect();
        noise.disconnect();
    }


    return {
        start: start,
        stop: stop,
        input: input,
        connect: connect,
        disconnect: disconnect
    };
});