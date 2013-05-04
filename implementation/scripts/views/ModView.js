define(["utils"], function(utils) {
    return function(data, x, y){
        console.log("gen mod view", data);
        var modules = data.modules,
            i = 0,
            j = 0;

        var container = utils.createElement("div", "modSection", x, y, "#123");
        title = utils.createParagraph("sectionTitle", "Modulation");
        container.appendChild(title);

        for(var m in modules){
            var section = utils.createElement("div", "modUnit", 261 * i + 2, 30, "#234"),
                title = utils.createParagraph("sectionTitle", m);
            section.appendChild(title);
            j = 0;
            if(modules[m].properties){
                for(var prop in modules[m].properties){
                    var propSection = utils.createElement("div", "modProperty"+modules[m].properties[prop].type, 51 * j + 2, 30, "#456");
                    title = utils.createParagraph("propertyTitle", prop);
                    propSection.appendChild(title);

                    if(modules[m].properties[prop].type === "slider"){
                        var propdata = modules[m].properties[prop];
                        var slider = utils.createSlider(propdata.onChange, "modSlider", propdata.min, propdata.max, propdata.value, propdata.step);
                        propSection.appendChild(slider);
                    } else if(modules[m].properties[prop].type === "selector"){
                        var selection = utils.createSelector("selector", modules[m].properties[prop].options, modules[m].properties[prop].currentOption, modules[m].properties[prop].onChange);
                        propSection.appendChild(selection);
                    }
                    section.appendChild(propSection);
                    j++;
                }
            }


            i++;
            container.appendChild(section);
        }

        document.body.appendChild(container);
    };
});