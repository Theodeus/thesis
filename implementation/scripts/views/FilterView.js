define(["utils"], function(utils) {
    return function(data, x, y){

        var container = utils.createElement("div", "filterSection"),
            title = utils.createParagraph("Filter", "sectionTitle"),
            propSection;
        container.appendChild(title);
        if(data.properties){
            for(var prop in data.properties){
                propSection = utils.createElement("div", "filterProperty");
                title = utils.createParagraph(prop, "propertyTitle");
                propSection.appendChild(title);

                if(data.properties[prop].type === "slider"){
                    var propdata = data.properties[prop];
                    slider = utils.createSlider(propdata.onChange, propdata.min, propdata.max, propdata.value, propdata.step, "filterSlider");
                    propSection.appendChild(slider);
                } else if(data.properties[prop].type === "selector"){
                    var selection = utils.createSelector(data.properties[prop].onChange, data.properties[prop].currentOption, data.properties[prop].options, "selector");
                    propSection.appendChild(selection);
                }
                container.appendChild(propSection);
            }
        }
        document.body.appendChild(container);
    };
});