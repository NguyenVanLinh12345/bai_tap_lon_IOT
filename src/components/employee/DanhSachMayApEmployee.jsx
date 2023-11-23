import { Fragment, useEffect, useRef, useState } from "react";

import ScheduleMachine from "./ScheduleMachine";
import EmployeeMachineItem from "./EmployeeMachineItem";

function DanhSachMayApEmployee() {
    const [scheduleState, setScheduleState] = useState({
        state: false,
        id: null // day la id cua may
    });

    const listMachine = [
        {
            id: 1,
            lastEggTurning: "20/11/2023",
            cycle: 2
        }
    ]

    return (
        <Fragment>
            {
                listMachine.map(value=>(
                    <EmployeeMachineItem key={value.id} clientId={`may_${value.id}`} setScheduleState={setScheduleState} />
                ))
            }
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