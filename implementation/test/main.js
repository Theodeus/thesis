var SINE = SINE || {};
SINE.context = new webkitAudioContext();
var setPitch;
window.addEventListener("load", function(){
    SINE.oscSection.init();
    setPitch = SINE.oscSection.setPitch;
    SINE.filterSection.init();
    SINE.ampSection.init();
    SINE.oscSection.connect(SINE.filterSection.input);
    SINE.filterSection.connect(SINE.ampSection.input);
    SINE.ampSection.connect(SINE.context.destination);
    document.getElementById("startButton").addEventListener("click", SINE.oscSection.play);
});