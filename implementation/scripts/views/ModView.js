define(["utils"], function(utils) {
    return function(data, x, y){
        var modules = data.modules,
            i = 0,
            j = 0;

        var container = utils.createElement("div", "modSection");
        title = utils.createParagraph("Modulation", "sectionTitle");
        container.appendChild(title);

        for(var m in modules){
            var section = utils.createElement("div", "modUnit"),
                title = utils.createParagraph(m, "sectionTitle");
            section.appendChild(title);
            j = 0;
            if(modules[m].properties){
                for(var prop in modules[m].properties){
                    var propSection = utils.createElement("div", "modProperty"+modules[m].properties[prop].type);
                    title = utils.createParagraph(prop, "propertyTitle");
                    propSection.appendChild(title);

                    if(modules[m].properties[prop].type === "slider"){
                        var propdata = modules[m].properties[prop];
                        var slider = utils.createSlider(propdata.onChange, propdata.min, propdata.max, propdata.value, propdata.step, "modSlider");
                        propSection.appendChild(slider);
                    } else if(modules[m].properties[prop].type === "selector"){
                        var selection = utils.createSelector(modules[m].properties[prop].onChange, modules[m].properties[prop].currentOption, modules[m].properties[prop].options, "selector");
                        propSection.appendChild(selection);
                    } else if(modules[m].properties[prop].type === "switch"){
                        var s = utils.createSwitch(modules[m].properties[prop].onChange, modules[m].properties[prop].value, "modChecker");
                        propSection.appendChild(s);
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