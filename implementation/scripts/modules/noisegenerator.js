define(["context", "statics"], function(context, STATICS) {

    return function() {
        var pitch = 440,
            destination,
            playing = false,
            currentNote = -1,
            controllers = {},
            BUFFERLENGTH = 1024,
            oscillator,
            output = context.createGain();

        function start(note, time) {
            if (!playing) {
                playing = true;
                oscillator = context.createJavaScriptNode(BUFFERLENGTH, 1, 2);
                oscillator.onaudioprocess = generateNoiseCallback();
                oscillator.connect(output);
                start();
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

        }

        function setValue(propertyName, value) {
            switch(propertyName){
                default:
                    console.log("set", propertyName, value);
                    return;
            }
        }

        function connect(target) {
            ouput.connect(target);
        }

        function disconnect() {
            output.disconnect();
        }

        function getViewData(){
            var data = {


            };

            return data;
        }

        return {
            start: start,
            stop: stop,
            setValue: setValue,
            connect: connect,
            disconnect: disconnect,
            output: output,
            getViewData: getViewData
        };
    };
});