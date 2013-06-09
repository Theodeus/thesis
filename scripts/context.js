define([], function() {
    var context = new webkitAudioContext();
    context.tempo = 120;
    return context;
});