define(["sections/oscillatorSection", "sections/mixerSection", "sections/filterSection", "sections/amplifierSection", "sections/modulationSection", "views/MixerView", "views/OscillatorView", "context", "sections/keyboard"], function(oscSection, mixSection, filterSection, ampSection, modSection, MixerView, OscillatorView, context, keyboard) {

    //audio routing
    //oscSection.connect(mixSection.input);
    oscSection.useMixer(mixSection);
    mixSection.connect(filterSection.input);
    filterSection.connect(ampSection.input);
    ampSection.connect(context.destination);

    new MixerView(mixSection.getViewData());
    new OscillatorView(oscSection.getViewData());
    //keyboard routing
    keyboard.connect(oscSection.input);
    keyboard.connect(modSection.input);
});