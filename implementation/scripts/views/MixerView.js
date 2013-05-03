define(["utils"], function(utils) {
    return function(data){
        var channels = data.channels,
            i = 0;
        for(var c in channels){

            var levelPropert = channels[c].properties.level;
            var container = utils.createElement("div", "mixerChannel", 51 * i, 200, "#456"),
                title = utils.createParagraph("sliderTitle", c),
                slider = utils.createSlider(levelPropert.onChange, "mixerSlider", levelPropert.min, levelPropert.max, levelPropert.value, levelPropert.step);

            container.appendChild(title);
            container.appendChild(slider);
            document.body.appendChild(container);

            i++;
        }
    };
});