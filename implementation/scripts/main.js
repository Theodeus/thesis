define(["sections/oscillatorSection", "sections/mixerSection", "sections/filterSection", "sections/amplifierSection", "sections/modulationSection", "views/MixerView", "views/OscillatorView", "context", "sections/keyboard"], function(oscSection, mixSection, filterSection, ampSection, modSection, MixerView, OscillatorView, context, keyboard) {

    //audio routing
    //oscSection.connect(mixSection.input);
    oscSection.useMixer(mixSection);
    mixSection.connect(filterSection.input);
    filterSection.connect(ampSection.input);
    ampSection.connect(context.destination);

    new OscillatorView(oscSection.getViewData(), 0, 200);
    new MixerView(mixSection.getViewData(), 350, 200);

    //keyboard routing
    keyboard.connect(oscSection.input);
    keyboard.connect(modSection.input);
});