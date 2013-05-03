define(["context", "statics"], function(context, STATICS) {

    return function() {
        var pitch = 440,
            destination,
            playing = false,
            currentNote = -1,
            BUFFERLENGTH = 1024,
            oscillator,
            filter,
            output = context.createGain();

        function start(note, time) {
            if (!playing) {
                playing = true;
                oscillator = context.createJavaScriptNode(BUFFERLENGTH, 1, 2);
                oscillator.onaudioprocess = generateNoiseCallback();
                filter = context.createBiquadFilter();
                filter.type = "highpass";
                filter.Q.value = 20;
                oscillator.connect(filter);
                filter.connect(output);
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
                type: "noise",
                properties: {
                    color: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 0,
                        step: 0.001,
                        onChange: function(e){
                            filter.frequency.value = parseFloat(e.target.value) * 10000;
                        }
                    },
                    punch: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 0,
                        step: 0.001,
                        onChange: function(e){
                            filter.Q.value = parseFloat(e.target.value) * 50;
                        }
                    }
                }
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