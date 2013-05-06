define(["utils"], function(utils) {
    return function(data, x, y){

        var container = utils.createElement("div", x, y, "#915", "ampSection"),
            title = utils.createParagraph("Amplifier", "sectionTitle");
        container.appendChild(title);
        if(data.properties){
            for(var prop in data.properties){
                title = utils.createParagraph(prop, "propertyTitle");
                container.appendChild(title);

                if(data.properties[prop].type === "slider"){
                    var propdata = data.properties[prop];
                    slider = utils.createSlider(propdata.onChange, propdata.min, propdata.max, propdata.value, propdata.step, "ampSlider");
                    container.appendChild(slider);
                } else if(data.properties[prop].type === "selector"){
                    var selection = utils.createSelector(data.properties[prop].onChange, data.properties[prop].currentOption, data.properties[prop].options, "selector");
                    container.appendChild(selection);
                }
            }
        }
        document.body.appendChild(container);
    };
});