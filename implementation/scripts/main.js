define(["sections/oscillatorSection", "sections/filterSection", "sections/amplifierSection", "context", "sections/keyboard"], function(oscSection, filterSection, ampSection, context) {
    oscSection.connect(filterSection.input);
    filterSection.connect(ampSection.input);
    ampSection.connect(context.destination);
});