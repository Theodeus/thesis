SINE = SINE || {};
SINE.ampSection = (function(){
    var context = SINE.context,
        amplifier = context.createGainNode(),
        level = 0.2;


    function init(){
        amplifier.gain.value = level;
    }

    function connect(target){
        amplifier.connect(target);
    }

    function disconnect(){
        amplifier.disconnect();
    }

    function setLevel(value){
        amplifier.gain.level = level = value;
    }

    return {
        init: init,
        connect: connect,
        disconnect: disconnect,
        input: amplifier
    };
})();