(function(){

    var oscillator,
        LFO,
        gainNode,
        testStarted = false,
        context = new webkitAudioContext(),
        LFOStartFrequency = 400;

    function init(){
        document.getElementById("startButton").addEventListener("click", startTest);
        document.getElementById("addButton").addEventListener("click", increaseFrequency);
    }

    function startTest(){
        document.getElementById("startButton").removeEventListener("click", startTest);
        document.body.removeChild(document.getElementById("startButton"));
        testStarted = true;

        gainNode = context.createGain();

        oscillator = context.createOscillator();
        oscillator.type = "sawtooth";
        oscillator.frequency.value = 350;
        oscillator.start(0);

        LFO = context.createOscillator();
        LFO.type = "sine";
        LFO.frequency.value = LFOStartFrequency;
        LFO.start(0);

        oscillator.connect(gainNode);
        gainNode.connect(context.destination);
        //LFO.connect(gainNode.gain);
        LFO.connect(oscillator.frequency);
        setInterval(function(){
            console.log(oscillator.frequency.value);
        }, 100);
    }

    function increaseFrequency(){
        LFO.frequency.value++;
    }

    window.addEventListener("load", init);
})();