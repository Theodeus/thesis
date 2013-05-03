define(["utils"], function(utils) {
    return function(data, x, y){

        var container = utils.createElement("div", "ampSection", x, y, "#915"),
            title = utils.createParagraph("sectionTitle", "Amplifier");
        container.appendChild(title);
        if(data.properties){
            for(var prop in data.properties){
                title = utils.createParagraph("propertyTitle", prop);
                container.appendChild(title);

                if(data.properties[prop].type === "slider"){
                    var propdata = data.properties[prop];
                    slider = utils.createSlider(propdata.onChange, "ampSlider", propdata.min, propdata.max, propdata.value, propdata.step);
                    container.appendChild(slider);
                } else if(data.properties[prop].type === "selector"){
                    var selection = utils.createSelector("selector", data.properties[prop].options, data.properties[prop].currentOption, data.properties[prop].onChange);
                    container.appendChild(selection);
                }
            }
        }
        document.body.appendChild(container);
    };
});