define(["context"], function(context) {

    var runningModulators = [],
        interval,
        i,
        running = false;

    function addCustomModulator(mod) {
        runningModulators.push(mod);
        if (!running) {
            startModulationEngine();
        }
    }

    function startModulationEngine() {
        interval = setTimeout(function loop() {
            for (i = 0; i < runningModulators.length; i++) {
                runningModulators[i].callback(runningModulators[i].input.gain.value);
                console.log(runningModulators[i].input.gain.value);
            }
            interval = setTimeout(loop, 16);
        }, 16);
    }

    function removeCustomModulator(mod) {
        var index = runningModulators.indexOf(mod);
        runningModulators[index].disconnect();
        runningModulators.splice(index, 1);
    }

    function createCustomModulationDestination(callback) {
        var input = context.createGain();
        input.gain.pick = "custom";
        console.log(input);
        var destination = {
            input: input,
            callback: callback
        };
        addCustomModulator(destination);
        return destination;
    }

    return {
        createCustomModulationDestination: createCustomModulationDestination
    };
});
