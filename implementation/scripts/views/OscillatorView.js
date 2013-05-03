define(["utils"], function(utils) {
    return function(data){
        console.log("generating osc view", data);
        var oscillators = data.oscillators,
            i = 0;

        var container = utils.createElement("div", "oscillatorSection", 0, 400, "#654");
        for(var o in oscillators){
            var section = utils.createElement("div", "oscillator", 101 * i, 2, "#543"),
                title = utils.createParagraph("sectionTitle", o),
                slider;
            section.appendChild(title);

            if(oscillators[o].properties && oscillators[o].properties.waveform){
                var selection = utils.createSelector("selector", oscillators[o].properties.waveform.options, oscillators[o].properties.waveform.currentOption, oscillators[o].properties.waveform.onChange);
                section.appendChild(selection);
            }

            if(oscillators[o].properties && oscillators[o].properties.glide){
                var glideProp = oscillators[o].properties.glide;
                slider = utils.createSlider(glideProp.onChange, "oscSlider", glideProp.min, glideProp.max, glideProp.value, glideProp.step);
                title = utils.createParagraph("sectionTitle", "glide");
                section.appendChild(title);
                section.appendChild(slider);
            }

            if(oscillators[o].properties && oscillators[o].properties.tune){
                var tuneProp = oscillators[o].properties.tune;
                slider = utils.createSlider(tuneProp.onChange, "oscSlider", tuneProp.min, tuneProp.max, tuneProp.value, tuneProp.step);
                title = utils.createParagraph("sectionTitle", "tune");
                section.appendChild(title);
                section.appendChild(slider);
            }
            i++;

            /*var levelPropert = oscillators[c].properties.level;
            var container = utils.createElement("div", "mixerChannel", 51 * i, 200, "#456"),
                title = utils.createParagraph("sliderTitle", c),
                slider = utils.createSlider(levelPropert.onChange, "mixerSlider", levelPropert.min, levelPropert.max, levelPropert.value, levelPropert.step);

            container.appendChild(title);
            container.appendChild(slider);
            document.body.appendChild(container);*/
            container.appendChild(section);
        }

        document.body.appendChild(container);
    };
});