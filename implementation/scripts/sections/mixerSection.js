define(["context", "utils"], function(context, utils) {
    var input = context.createGain(),
        output = context.createGain(),
        channels = {};

    input.connect(output);


    function connect(destination) {
        output.connect(destination);
    }

    function disconnect() {
        output.disconnect();
    }

    function addChannel(channelName){
        if(channels[channelName]){
            console.error("channel already exists", channelName, channels);
            return;
        }
        var channelGain = context.createGain();
        channelGain.connect(output);
        channels[channelName] = [channelGain];
    }

    function routeInput(targetChannel, source){
        if(!channels[targetChannel]){
            console.error("trying to connect to non existing channel", targetChannel, source, channels);
            return;
        }
        channels[targetChannel].push(source);
        source.connect(channels[targetChannel][0]);
    }

    function setValue(propertyName, value) {
        switch (propertyName) {
            default:
                console.log("set", propertyName, value);
                return;
        }
    }

    //generate data that the view can use to create its elements
    function getViewData(){
        var data = {channels: {}};

        for(var channel in channels){
            data["channels"][channel] = {
                properties: {
                    level: {
                        min: 0,
                        max: 1,
                        step: 0.01,
                        value: channels[channel][0].gain.value,
                        type: "slider",
                        onChange: utils.generateChangeCallback(channels[channel][0].gain)
                    }
                },
                name: channel
            };
        }

        return data;
    }

    return {
        input: input,
        connect: connect,
        disconnect: disconnect,
        addChannel: addChannel,
        routeInput: routeInput,
        getViewData: getViewData
    };
});