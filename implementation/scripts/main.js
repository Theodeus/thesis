define(["sections/oscillatorSection", "sections/mixerSection", "sections/filterSection", "sections/amplifierSection", "sections/modulationSection", "context", "sections/keyboard"], function(oscSection, mixSection, filterSection, ampSection, modSection, context, keyboard) {

    //audio routing
    oscSection.connect(mixSection.input);
    mixSection.connect(filterSection.input);
    filterSection.connect(ampSection.input);
    ampSection.connect(context.destination);

    //keyboard routing
    keyboard.connect(oscSection.input);
    keyboard.connect(modSection.input);
});