define([], function() {

    if (!navigator.requestMIDIAccess) {
        return {
            connect: function() {
                console.log("If this browser supported the Web MIDI API, you could have played this synth with an external MIDI device.");
            }
        };
    }

    var selectMIDI,
        midiAccess,
        midiIn,
        targets = [];

    function connect(target) {
        targets.push(target);
    }

    function send(type, data) {
        for (var i = 0; i < targets.length; i++) {
            targets[i](type, data);
        }
    }

    function midiMessageReceived(ev) {
        var cmd = ev.data[0] >> 4,
            channel = ev.data[0] & 0xf,
            noteNumber = ev.data[1],
            velocity = ev.data[2];

        if (cmd == 8 || ((cmd == 9) && (velocity === 0))) { // with MIDI, note on with velocity zero is the same as note off
            // note off
            send("noteOff", {
                note: noteNumber
            });
        } else if (cmd == 9) {
            // note on
            send("noteOn", {
                note: noteNumber,
                velocity: velocity / 127.0
            });
        } else if (cmd == 11) {
            send("controller", {
                note: noteNumber,
                velocity: velocity / 127.0,
                event: ev
            });
        } else if (cmd == 14) {
            // pitch wheel
            send("pitchWheel", {
                data: ((velocity * 128.0 + noteNumber) - 8192) / 8192.0
            });
        }
    }

    function onMIDIStarted(midi) {
        console.log("midi started");
        midiAccess = midi;
        var list = midiAccess.inputs();
        for (var i = 0; i < list.length; i++) {
            if (list[i].name.search("FastTrack") !== -1) {
                midiIn = list[i];
                break;
            }
        }
        if (midiIn === undefined) {
            midiIn = list[0];
        }
        midiIn.onmidimessage = midiMessageReceived;
    }

    function onMIDISystemError(err) {
        console.log("Error encountered:" + err.code);
    }

    navigator.requestMIDIAccess().then(onMIDIStarted, onMIDISystemError);

    return {
        connect: connect
    };
});