define(["modules/oscillator", "context"], function(osc, context) {
    var oscillatorOne = window.oscillatorOne = new osc(),
        oscillatorTwo = window.oscillatorTwo = new osc(),
        input = context.createGain(),
        output = context.createGain();

    function start(note) {
        oscillatorOne.start(note, context.currentTime);
        oscillatorTwo.start(note, context.currentTime);
    }

    function stop(note) {
        oscillatorOne.stop(note, context.currentTime);
        oscillatorTwo.stop(note, context.currentTime);
    }

    function connect(destination) {
        oscillatorOne.connect(destination);
        oscillatorTwo.connect(destination);
    }

    function disconnect() {
        oscillatorOne.disconnect();
        oscillatorTwo.disconnect();
    }


    return {
        start: start,
        stop: stop,
        input: input,
        connect: connect,
        disconnect: disconnect
    };
});