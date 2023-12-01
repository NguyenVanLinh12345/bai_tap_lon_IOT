import mqtt from "mqtt";

function getMqtt(machineID) {
    const options = {
        protocol: 'mqtt',
        clientId: machineID,
        username: 'backend_iot',
        password: '12345678'
    }
    // initialize the MQTT client
    const client = mqtt.connect("mqtt://localhost:8083/mqtt", options);
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
        unsubscribe: function(){
            client.unsubscribe();
        },
        end: function(){
            client.end();
        }
    };

    return myClientMqtt;
}

export default getMqtt;