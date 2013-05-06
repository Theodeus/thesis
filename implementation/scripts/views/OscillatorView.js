define(["utils"], function(utils) {
    return function(data, x, y){
        var oscillators = data.oscillators,
            i = 0;

        var container = utils.createElement("div", x, y, "#654", "oscillatorSection");
        title = utils.createParagraph("Oscillators", "sectionTitle");
        container.appendChild(title);

        for(var o in oscillators){
            var section = utils.createElement("div", 101 * i + 2, 30, "#543", "oscillator"),
                title = utils.createParagraph(o, "sectionTitle"),
                slider;
            section.appendChild(title);

            if(oscillators[o].properties){
                for(var prop in oscillators[o].properties){

                    title = utils.createParagraph(prop, "propertyTitle");
                    section.appendChild(title);

                    if(oscillators[o].properties[prop].type === "slider"){
                        var propdata = oscillators[o].properties[prop];
                        slider = utils.createSlider(propdata.onChange, propdata.min, propdata.max, propdata.value, propdata.step, "oscSlider");
                        section.appendChild(slider);
                    } else if(oscillators[o].properties[prop].type === "selector"){
                        var selection = utils.createSelector(oscillators[o].properties[prop].onChange, oscillators[o].properties[prop].currentOption, oscillators[o].properties[prop].options, "selector");
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