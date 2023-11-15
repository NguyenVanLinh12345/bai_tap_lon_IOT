import mqtt from "mqtt";

function getMqtt() {
    const options = {
        protocol: 'mqtts',
        clientId: 'b0908853',
        username: 'backend_iot',
        password: '12345678'
    }
    // initialize the MQTT client
    const client = mqtt.connect("mqtt://8daa878d98eb446e8b60cfb52db1277e.s2.eu.hivemq.cloud:8884/mqtt", options);
    // setup the callbacks
    client.on('connect', function () {
        console.log('Connected');
    });

    client.on('error', function (error) {
        console.log(error);
    });

    const myClientMqtt = {
        onMessage: function(actionMessage){
            client.on('message', function (topic, message) {
                actionMessage(topic, message);
            });
        },
        subscribe: function(subscribePath){
            client.subscribe(subscribePath);
        },
        publish: function(publicPath, payload){
            client.publish(publicPath, payload);
        },
        end: function(){
            client.end();
        }
    };

    return myClientMqtt;
}

export default getMqtt;