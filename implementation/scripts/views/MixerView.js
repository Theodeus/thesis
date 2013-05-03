define(["utils"], function(utils) {
    return function(data, x, y){
        var channels = data.channels,
            i = 0;
        var container = utils.createElement("div", "mixerSection", x, y, "#345");
        for(var c in channels){

            var levelPropert = channels[c].properties.level;
            var channel = utils.createElement("div", "mixerChannel", 51 * i + 2, 2, "#456"),
                title = utils.createParagraph("sliderTitle", c),
                slider = utils.createSlider(levelPropert.onChange, "mixerSlider", levelPropert.min, levelPropert.max, levelPropert.value, levelPropert.step);

            channel.appendChild(title);
            channel.appendChild(slider);
            container.appendChild(channel);
            i++;
        }
        document.body.appendChild(container);
    };
});