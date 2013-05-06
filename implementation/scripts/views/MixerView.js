define(["utils"], function(utils) {
    return function(data, x, y){
        var channels = data.channels,
            i = 0;
        var container = utils.createElement("div", x, y, "#345", "mixerSection");
        title = utils.createParagraph("Mixer", "sectionTitle");
        container.appendChild(title);

        for(var c in channels){

            var levelPropert = channels[c].properties.level;
            var channel = utils.createElement("div", 51 * i + 2, 30, "#456", "mixerChannel"),
                title = utils.createParagraph(c, "propertyTitle"),
                slider = utils.createSlider(levelPropert.onChange, levelPropert.min, levelPropert.max, levelPropert.value, levelPropert.step, "mixerSlider");

            channel.appendChild(title);
            channel.appendChild(slider);
            container.appendChild(channel);
            i++;
        }
        document.body.appendChild(container);
    };
});