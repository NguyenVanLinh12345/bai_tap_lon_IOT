import { Fragment, useState } from "react";

import ScheduleMachine from "./ScheduleMachine";
import EmployeeMachineItem from "./EmployeeMachineItem";

function DanhSachMayApEmployee(){
    const [scheduleState, setScheduleState] = useState({
        state: false,
        id: null
    });

    return (
        <Fragment>
            <EmployeeMachineItem setScheduleState={setScheduleState} />
            {
                scheduleState.state
                ?
                <ScheduleMachine closeFunc={()=>setScheduleState({state: false, id: null})} />
                :
                null
            }
        </Fragment>
    )
}

export default DanhSachMayApEmployee;