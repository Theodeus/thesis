define(["context", "statics"], function(context, STATICS) {

    return function() {
        var pitch = 440,
            destination,
            currentNote = -1,
            BUFFERLENGTH = 4096 * 12,
            noise = context.createBufferSource(),
            buffer = context.createBuffer(2, BUFFERLENGTH, context.sampleRate),
            filter,
            output = context.createGain();

        function start(note, time) {
            currentNote = note;
        }

        function stop(note, time) {

        }

        function setValue(propertyName, value) {
            switch (propertyName) {
                default: console.log("set", propertyName, value);
                return;
            }
        }

        function connect(target) {
            ouput.connect(target);
        }

        function disconnect() {
            output.disconnect();
        }

        function init() {
            var left = buffer.getChannelData(0);
                right = buffer.getChannelData(1);
            for (var i = 0; i < BUFFERLENGTH; i++) {
                left[i] = Math.random();
                right[i] = Math.random();
            }
            noise.buffer = buffer;
            noise.loop = true;
            noise.start(0);
            filter = context.createBiquadFilter();
            filter.type = "highpass";
            filter.Q.value = 0;
            noise.connect(filter);
            filter.connect(output);
            start();
        }

        function getViewData() {
            var data = {
                type: "noise",
                properties: {
                    color: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 0,
                        step: 0.001,
                        onChange: function(e) {
                            filter.frequency.value = parseFloat(e.target.value) * 10000;
                        }
                    },
                    whistle: {
                        type: "slider",
                        min: 0,
                        max: 1,
                        value: 0,
                        step: 0.001,
                        onChange: function(e) {
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
            getViewData: getViewData,
            init: init
        };
    };
});