(function(){

    var oscillators = [],
        oscillator,
        numOscillators = 0,
        testStarted = false,
        context = new webkitAudioContext(),
        mixNode = context.createGainNode(),
        waveforms = ["sine", "square", "sawtooth", "triangle"],
        randomWaveforms = true;

    function init(){
        document.getElementById("startButton").addEventListener("click", startTest);
        document.getElementById("addButton").addEventListener("click", addOscillator);
        mixNode.connect(context.destination);
    }

    function addOscillator(){
        numOscillators++;
        oscillator = context.createOscillator();
        oscillator.connect(mixNode);
        oscillators.push(oscillator);
        oscillator.frequency.value = (Math.random() * 1000) + 200;
        if(randomWaveforms){
            oscillator.type = randomizeWaveform();
        }
        if(testStarted){
            oscillator.start(0);
        }
        mixNode.gain.value = 1 / numOscillators;
        document.getElementById("numOsc").innerHTML = numOscillators;
    }

    function startTest(){
        document.getElementById("startButton").removeEventListener("click", startTest);
        document.body.removeChild(document.getElementById("startButton"));
        testStarted = true;
        for(var i = 0; i < oscillators.length; i++){
            oscillators[i].start(0);
        }
    }

    function randomizeWaveform(){
        var randomIndex = Math.floor(Math.random() * (waveforms.length - 0.00000001));
        return waveforms[randomIndex];
    }

    window.addEventListener("load", init);
})();