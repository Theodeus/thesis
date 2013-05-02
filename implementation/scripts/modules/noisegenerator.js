define(["context", "statics"], function(context, STATICS) {

    return function() {
        var pitch = 440,
            destination,
            playing = false,
            currentNote = -1,
            controllers = {},
            BUFFERLENGTH = 1024,
            oscillator = context.createJavaScriptNode(BUFFERLENGTH, 1, 2);

        function start(note, time) {
            //create a new oscillator if there's none playing (oscillators are one shot in Web Audio)
            if (!playing) {
                playing = true;
                oscillator.onaudioprocess = generateNoiseCallback();
                oscillator.connect(destination);
            }
            currentNote = note;
        }

        function generateNoiseCallback(){
            return function(e){
                var left = e.outputBuffer.getChannelData(0);
                var right = e.outputBuffer.getChannelData(1);
                for(var i = 0; i < BUFFERLENGTH; i++){
                    left[i] = Math.random() * 2 - 1;
                    right[i] = Math.random() * 2 - 1;
                }
            };
        }

        function stop(note, time) {
            //if (note !== undefined && note !== currentNote) {
            //    return;
            //}
            //playing = false;
            //oscillator.onaudioprocess = null;
            //oscillator.disconnect();
        }

        function setValue(propertyName, value) {
            switch(propertyName){
                default:
                    console.log("set", propertyName, value);
                    return;
            }
        }

        function connect(target) {
            destination = target;
            oscillator.connect(destination);
            start();
        }

        function disconnect() {
            destination = null;
            oscillator.disconnect();
        }

        return {
            start: start,
            stop: stop,
            setValue: setValue,
            connect: connect,
            disconnect: disconnect
        };
    };
});