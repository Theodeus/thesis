define(["modules/envelopeGenerator", "modules/LFO", "context"], function(envGenerator, lfo, context) {

    function createElement(type, className, x, y, bgColor){
        var elem = document.createElement(type);
        elem.style.position = "absolute";
        elem.className = className;
        if(x !== undefined){ elem.style.left = x + "px"; }
        if(y !== undefined){ elem.style.top = y + "px"; }
        if(bgColor !== undefined){ elem.style.backgroundColor = bgColor; }
        return elem;
    }

    function createSlider(callback, className, min, max, value, step, rotation){
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

    function createParagraph(className, text){
        var p = document.createElement("p");
        p.className = className;
        p.innerHTML = text;
        return p;
    }

    function createSelector(className, options, value, callback){
        var select = document.createElement("select");
        for(var o in options){
            var option = document.createElement("option");
            option.value = options[o];
            option.innerHTML = options[o];
            select.appendChild(option);
        }
        select.value = value;
        select.onchange = callback;
        console.dir(select);
        return select;
    }

    function generateChangeCallback(target){
        return function(e){
            if(target.value !== undefined){
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
        createSelector: createSelector
    };
});