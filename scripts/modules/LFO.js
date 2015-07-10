define(["context", "statics"], function(context, STATICS) {

    return function(data) {

        if (!data) {
            data = {};
        }

        var destinations = [],
            oscillator = context.createOscillator(),
            _frequency = data.frequency || 2,
            _amount = 1,
            _LFOreset = true,
            _waveform = "triangle",
            _tempoSync = false,
            _tempo = 120,
            maxRate = data.maxRate || 20,
            maxAmount = data.maxAmount || 24;

        var amountNode = context.createGain();
        amountNode.gain.value = _amount;

        oscillator = context.createOscillator(),
        oscillator.frequency.value = _frequency;
        oscillator.type = _waveform;
        oscillator.start(0);
        amountNode.gain.value = _amount;
        oscillator.connect(amountNode);

        function start(data) {
            if (_LFOreset) {
                //new oscillator to reset the phase of the LFO
                oscillator.disconnect();
                oscillator = context.createOscillator(),
                changeFrequency(_frequency);
                oscillator.type = _waveform;
                oscillator.start(0);
                amountNode.gain.value = _amount;
                oscillator.connect(amountNode);
            }
        }

        function stop(data) {

        }

        function modulate(destination) {
            destinations.push(destination);
            amountNode.connect(destination);
        }

        function getViewData() {
            var data = {
                type: "oscillator",
                properties: {
                    amount: {
                        type: "slider",
                        min: 0,
                        max: maxAmount,
                        value: 1,
                        step: 0.001,
                        onChange: function(e) {
                            amountNode.gain.value = _amount = Math.pow(parseFloat(e.target.value), 1.5);
                        }
                    },
                    rate: {
                        type: "slider",
                        min: 0,
                        max: maxRate,
                        value: 1,
                        step: 0.001,
                        onChange: function(e) {
                            _frequency = parseFloat(e.target.value);
                            changeFrequency(_frequency);
                        }
                    },
                    tempoSync: {
                        type: "switch",
                        value: "deselected",
                        onChange: function(e) {
                            if (e.target.checked) {
                                _tempoSync = true;
                            } else {
                                _tempoSync = false;
                            }
                            changeFrequency(_frequency);
                        }
                    },
                    LFOreset: {
                        type: "switch",
                        value: "selected",
                        onChange: function(e) {
                            if (e.target.checked) {
                                _LFOreset = true;
                            } else {
                                _LFOreset = false;
                            }
                        }
                    },
                    tempo: {
                        type: "numeric",
                        value: 120,
                        onChange: function(e) {
                            _tempo = parseFloat(e.target.value);
                            console.log(_tempo);
                            changeFrequency(_frequency);
                        }
                    },
                    waveform: {
                        type: "selector",
                        options: ["triangle", "square", "sine", "sawtooth"],
                        currentOption: "triangle",
                        onChange: function(e) {
                            oscillator.type = _waveform = e.target.value;
                        }
                    }
                }

            };
            return data;
        }

        function changeFrequency(freq) {
            if (_tempoSync) {
                var value = freq / maxRate;
                if (value >= 0 && value < 0.14) {
                    value = (60 / _tempo) * 16;
                } else if (value >= 0.14 && value < 0.28) {
                    value = (60 / _tempo) * 8;
                } else if (value >= 0.28 && value < 0.42) {
                    value = (60 / _tempo) * 4;
                } else if (value >= 0.42 && value < 0.56) {
                    value = (60 / _tempo) * 2;
                } else if (value >= 0.56 && value < 0.7) {
                    value = (60 / _tempo);
                } else if (value >= 0.7 && value < 0.84) {
                    value = (60 / _tempo) / 2;
                } else {
                    value = (60 / _tempo) / 4;
                }
                oscillator.frequency.value = 1 / value;
            } else {
                oscillator.frequency.value = freq;
            }
        }

        return {
            start: start,
            stop: stop,
            modulate: modulate,
            getViewData: getViewData
        };
    };
});
