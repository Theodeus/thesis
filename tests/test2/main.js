(function(){

    var filters = [],
        oscillator,
        filter,
        previousFilter,
        numFilters = 0,
        testStarted = false,
        context = new webkitAudioContext(),
        mixNode = context.createGainNode(),
        waveforms = ["sine", "square", "sawtooth", "triangle"],
        randomWaveforms = true,
        filterStartFreqency = 2000;

    function init(){
        document.getElementById("startButton").addEventListener("click", startTest);
        document.getElementById("addButton").addEventListener("click", addFilter);
    }

    function addFilter(){
        numFilters++;
        filter = context.createBiquadFilter();
        console.log(filter);
        filter.frequency.value = filterStartFreqency;
        filter.Q.value = 0;
        if(previousFilter){
            filter.connect(previousFilter);
        } else {
            filter.connect(context.destination);
        }
        oscillator.disconnect();
        oscillator.connect(filter);
        previousFilter = filter;
        document.getElementById("numOsc").innerHTML = numFilters + ", with a lowest cutoff frequency of " + filterStartFreqency;
        filterStartFreqency -= 5;
    }

    function startTest(){
        document.getElementById("startButton").removeEventListener("click", startTest);
        document.body.removeChild(document.getElementById("startButton"));
        testStarted = true;
        oscillator = context.createOscillator();
        oscillator.connect(context.destination);
        oscillator.type = "sawtooth";
        oscillator.frequency.value = 350;
        oscillator.start(0);
    }

    function randomizeWaveform(){
        var randomIndex = Math.floor(Math.random() * (waveforms.length - 0.00000001));
        return waveforms[randomIndex];
    }

    window.addEventListener("load", init);
})();