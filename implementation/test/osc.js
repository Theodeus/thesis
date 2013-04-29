SINE = SINE || {};
SINE.oscSection = (function(){
    var oscillators = [],
        pitch = 500,
        numOscillators = 1,
        context = SINE.context,
        waveforms = ["sine", "square", "triangle", "sawtooth", "noise"];


    function init(){
        var osc;
        for(var i = 0; i < numOscillators; i++){
            osc = context.createOscillator();
            osc.frequency.value = pitch;
            oscillators.push(osc);
        }
    }

    function play(pitch){
        if(pitch !== undefined){
            for(var i = 0; i < oscillators.length; i++){
                oscillators[i].frequency.value = pitch;
            }
        }
        for(var j = 0; j < oscillators.length; j++){
            oscillators[j].start(0);
        }
    }

    function stop(){
        for(var i = 0; i < oscillators.length; i++){
            oscillators[i].stop(0);
        }
    }

    function connect(target){
        for(var i = 0; i < oscillators.length; i++){
            oscillators[i].connect(target);
        }
    }

    function disconnect(){
        for(var i = 0; i < oscillators.length; i++){
            oscillators[i].disconnect();
        }
    }

    function setPitch(value){
        pitch = value;
        for(var i = 0; i < oscillators.length; i++){
            oscillators[i].frequency.value = pitch;
        }
    }

    return {
        init: init,
        play: play,
        stop: stop,
        connect: connect,
        disconnect: disconnect,
        setPitch: setPitch
    };
})();