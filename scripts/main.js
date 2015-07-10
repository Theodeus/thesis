define(["sections/oscillatorSection",
        "sections/mixerSection",
        "sections/filterSection",
        "sections/amplifierSection",
        "sections/modulationSection",
        "views/MixerView",
        "views/OscillatorView",
        "views/FilterView",
        "views/AmpView",
        "views/ModView",
        "context",
        "sections/keyboard",
        "sections/midiInput",], function(oscSection, mixSection, filterSection, ampSection, modSection, MixerView, OscillatorView, FilterView, AmpView, ModView, context, keyboard, midiInput) {

    //audio routing
    //oscSection.connect(mixSection.input);
    oscSection.useMixer(mixSection);
    mixSection.connect(filterSection.input);
    filterSection.connect(ampSection.input);
    ampSection.connect(context.destination);

    new OscillatorView(oscSection.getViewData(), 10, 200);
    new MixerView(mixSection.getViewData(), 350, 200);
    new FilterView(filterSection.getViewData(), 550, 200);
    new AmpView(ampSection.getViewData(), 10, 500);
    new ModView(modSection.getViewData(), 130, 500);

    //keyboard routing
    keyboard.connect(oscSection.input);
    keyboard.connect(modSection.input);

    midiInput.connect(oscSection.input);
    midiInput.connect(modSection.input);


    //content position
    document.getElementById("content").style.top = (window.innerHeight/2 - (696/2)) + "px";
});
