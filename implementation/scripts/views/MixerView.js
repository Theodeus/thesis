define(["utils"], function(utils) {

    return function(data){
        console.log("generating view", data);
        var channels = data.channels,
            i = 0;
        for(var c in channels){
            var container = utils.createElement("div", c, 200, 200, 205 * i, 200, "#456"),
                title = utils.createParagraph("title", c),
                slider = utils.createSlider("level", 0, 1, 0.5, 0.01, function(e){console.log(e.target.value)});

            container.appendChild(title);
            container.appendChild(slider);
            document.body.appendChild(container);

            i++;
        }

        return {

        };
    };
});