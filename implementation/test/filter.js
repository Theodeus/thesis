SINE = SINE || {};
SINE.filterSection = (function(){
    var filters = [],
        cutoffFrequency = 440,
        numFilters = 1,
        context = SINE.context,
        input = context.createGainNode();


    function init(){
        var filter;
        for(var i = 0; i < numFilters; i++){
            filter = context.createBiquadFilter();
            filter.frequency.value = cutoffFrequency;
            input.connect(filter);
            filters.push(filter);
        }
    }

    function connect(target){
        for(var i = 0; i < filters.length; i++){
            filters[i].connect(target);
        }
    }

    function disconnect(){
        for(var i = 0; i < filters.length; i++){
            filters[i].disconnect();
        }
    }

    function setCutoff(value){
        cutoffFrequency = value;
        for(var i = 0; i < filters.length; i++){
            filters[i].frequency.value = cutoffFrequency;
        }
    }

    return {
        init: init,
        connect: connect,
        disconnect: disconnect,
        input: input,
        setCutoff: setCutoff
    };
})();