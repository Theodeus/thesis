define(["modules/envelopeGenerator", "modules/LFO", "context"], function(envGenerator, lfo, context) {

    function createElement(type, id, width, height, x, y, bgColor){
        var elem = document.createElement(type);
        elem.style.position = "absolute";
        elem.id = id;
        if(width !== undefined){ elem.style.width = width + "px"; }
        if(height !== undefined){ elem.style.height = height + "px"; }
        if(x !== undefined){ elem.style.left = x + "px"; }
        if(y !== undefined){ elem.style.top = y + "px"; }
        if(bgColor !== undefined){ elem.style.backgroundColor = bgColor; }
        return elem;
    }

    function createSlider(id, min, max, value, step, callback){
        var slider = document.createElement("input");
        slider.type = "range";
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

    return {
        createElement: createElement,
        createSlider: createSlider,
        createParagraph: createParagraph
    };
});