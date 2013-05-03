define(["utils"], function(utils) {
    return function(data, x, y){
        var oscillators = data.oscillators,
            i = 0;

        var container = utils.createElement("div", "oscillatorSection", x, y, "#654");
        title = utils.createParagraph("sectionTitle", "Oscillators");
        container.appendChild(title);

        for(var o in oscillators){
            var section = utils.createElement("div", "oscillator", 101 * i + 2, 30, "#543"),
                title = utils.createParagraph("sectionTitle", o),
                slider;
            section.appendChild(title);

            if(oscillators[o].properties){
                for(var prop in oscillators[o].properties){

                    title = utils.createParagraph("propertyTitle", prop);
                    section.appendChild(title);

                    if(oscillators[o].properties[prop].type === "slider"){
                        var propdata = oscillators[o].properties[prop];
                        slider = utils.createSlider(propdata.onChange, "oscSlider", propdata.min, propdata.max, propdata.value, propdata.step);
                        section.appendChild(slider);
                    } else if(oscillators[o].properties[prop].type === "selector"){
                        var selection = utils.createSelector("selector", oscillators[o].properties[prop].options, oscillators[o].properties[prop].currentOption, oscillators[o].properties[prop].onChange);
                        section.appendChild(selection);
                    }
                }

            }


            i++;
            container.appendChild(section);
        }

        document.body.appendChild(container);
    };
});