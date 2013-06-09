define(["modules/envelopeGenerator", "modules/LFO", "context"], function(envGenerator, lfo, context) {

    function createElement(type, className) {
        var elem = document.createElement(type);
        elem.className = className;
        return elem;
    }

    function createSlider(callback, min, max, value, step, className) {
        var slider = document.createElement("input");
        slider.type = "range";
        slider.className = className;
        slider.min = min;
        slider.max = max;
        slider.step = step;
        slider.value = value;
        slider.onchange = callback;
        return slider;
    }

    function createParagraph(value, className) {
        var p = document.createElement("p");
        p.className = className;
        p.innerHTML = value;
        return p;
    }

    function createSelector(callback, value, options, className) {
        var select = document.createElement("select");
        for (var o in options) {
            var option = document.createElement("option");
            option.value = options[o];
            option.innerHTML = options[o];
            select.appendChild(option);
        }
        select.value = value;
        select.onchange = callback;
        return select;
    }

    function createSwitch(callback, value, className) {
        var s = document.createElement("input");
        s.type = "checkbox";
        s.className = className;
        s.checked = value === "selected" ? true : false;
        s.onchange = callback;
        return s;
    }

    function createNumericInput(callback, value, className) {
        var s = document.createElement("input");
        s.type = "number";
        s.className = className;
        s.value = value;
        s.onchange = callback;
        return s;
    }

    function generateChangeCallback(target) {
        return function(e) {
            if (target.value !== undefined) {
                target.value = e.target.value;
            } else {
                target = e.target.value;
            }
        };
    }

    return {
        createElement: createElement,
        createSlider: createSlider,
        createParagraph: createParagraph,
        generateChangeCallback: generateChangeCallback,
        createSelector: createSelector,
        createSwitch: createSwitch,
        createNumericInput: createNumericInput
    };
});