import { Fragment, useEffect, useState } from "react";

import ScheduleMachine from "./ScheduleMachine";
import EmployeeMachineItem from "./EmployeeMachineItem";
// import testMqtt from "../../config/mqttConfig";
import mqtt from "mqtt";
import getMqtt from "../../config/mqttConfig";

function DanhSachMayApEmployee() {
    const [scheduleState, setScheduleState] = useState({
        state: false,
        id: null
    });

    useEffect(() => {
        const client = getMqtt();

        const actionMessage = (topic, message) => {

            console.log(topic);
            console.log(JSON.parse(message));
        }

        const data = {
            test: "data1",
            test1: "data2"
        }
        client.onMessage(actionMessage);

        client.subscribe('backend_iot/recei');

        client.publish('backend_iot/send', JSON.stringify(data));
        return () => {
            client.end();
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