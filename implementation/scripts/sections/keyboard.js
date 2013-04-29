define(["sections/oscillatorSection"], function(oscSection) {
    var note,
        realNote,
        octave = 4,
        down = false,
        keysDown = {};

    window.addEventListener("keydown", function(e) {
        if (keysDown[e.keyCode]) {
            return;
        }
        keysDown[e.keyCode] = true;
        switch (e.keyCode) {
            case 90:
                note = 0;
                break;
            case 83:
                note = 1;
                break;
            case 88:
                note = 2;
                break;
            case 68:
                note = 3;
                break;
            case 67:
                note = 4;
                break;
            case 86:
                note = 5;
                break;
            case 71:
                note = 6;
                break;
            case 66:
                note = 7;
                break;
            case 72:
                note = 8;
                break;
            case 78:
                note = 9;
                break;
            case 74:
                note = 10;
                break;
            case 77:
                note = 11;
                break;
            case 188:
                note = 12;
                break;
            case 81:
                octave--;
                if (octave < 0) {
                    octave = 0;
                }
                return;
            case 87:
                octave++;
                if (octave > 10) {
                    octave = 10;
                }
                return;
            default:
                return;
        }

        realNote = note + (12 * octave);

        if (realNote > 127) {
            realNote = 127;
        }
        oscSection.start(realNote);
    });

    window.addEventListener("keyup", function(e) {
        keysDown[e.keyCode] = false;
        switch (e.keyCode) {
            case 90:
                note = 0;
                break;
            case 83:
                note = 1;
                break;
            case 88:
                note = 2;
                break;
            case 68:
                note = 3;
                break;
            case 67:
                note = 4;
                break;
            case 86:
                note = 5;
                break;
            case 71:
                note = 6;
                break;
            case 66:
                note = 7;
                break;
            case 72:
                note = 8;
                break;
            case 78:
                note = 9;
                break;
            case 74:
                note = 10;
                break;
            case 77:
                note = 11;
                break;
            case 188:
                note = 12;
                break;
            default:
                return;
        }

        realNote = note + (12 * octave);

        if (realNote > 127) {
            realNote = 127;
        }
        oscSection.stop(realNote);
    });
});