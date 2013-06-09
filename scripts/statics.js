define([], function() {

    var statics = {
        waveforms: ["sawtooth", "square", "noise"]
    };

    statics = Object.freeze(statics);
    return statics;
});