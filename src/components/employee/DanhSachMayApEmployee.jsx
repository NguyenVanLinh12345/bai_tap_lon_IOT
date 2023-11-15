import { Fragment, useEffect, useState } from "react";

import ScheduleMachine from "./ScheduleMachine";
import EmployeeMachineItem from "./EmployeeMachineItem";
// import testMqtt from "../../config/mqttConfig";
import mqtt from "mqtt";

function DanhSachMayApEmployee() {
    const [scheduleState, setScheduleState] = useState({
        state: false,
        id: null
    });

    useEffect(() => {
        var options = {
            protocol: 'mqtts',
            clientId: 'b0908853',
            username: 'backend_iot',
            password: '12345678'
        }

        // initialize the MQTT client
        var client = mqtt.connect("mqtt://8daa878d98eb446e8b60cfb52db1277e.s2.eu.hivemq.cloud:8884/mqtt", options);

        // setup the callbacks
        client.on('connect', function () {
            console.log('Connected');
        });

        client.on('error', function (error) {
            console.log(error);
        });

        client.on('message', function (topic, message) {
            // called each time a message is received
            console.log('Received message:', topic, message.toString());
        });

        // subscribe to topic 'my/test/topic'
        client.subscribe('backend_iot/recei');

        // publish message 'Hello' to topic 'my/test/topic'
        client.publish('backend_iot/send', 'Hello');

        return () => {
            console.log("Ngắt kết nối client");
            client.end(); // Disconnect from MQTT broker when component unmounts
          };
    }, [])
    return (
        <Fragment>
            <EmployeeMachineItem setScheduleState={setScheduleState} />
            {
                scheduleState.state
                    ?
                    <ScheduleMachine closeFunc={() => setScheduleState({ state: false, id: null })} />
                    :
                    null
            }
        </Fragment>
    )
}

export default DanhSachMayApEmployee;