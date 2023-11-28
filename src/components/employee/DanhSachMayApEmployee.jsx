import { Fragment, useContext, useEffect, useState } from "react";

import ScheduleMachine from "./ScheduleMachine";
import EmployeeMachineItem from "./EmployeeMachineItem";
import fetchData from "../../function/fetch";
import api from "../../config/api";
import ToastMessageContext from "../base/toast_message/ToastMessageContext";

function DanhSachMayApEmployee() {
    const [listMachine, setListMachine] = useState([]);
    const showToast = useContext(ToastMessageContext);
    const [scheduleState, setScheduleState] = useState({
        state: false,
        id: null // day la id cua may
    });

    useEffect(() => {
        fetchData({
            // tương lai phải đổi lại thành get by user id để chỉ lấy ra các máy mà user quản lý
            subUrl: api.getMyMachine,
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setListMachine(data);
                // data = {
                //     cycle: 2,
                //     employeeId: null,
                //     employeeName: "Nguyen Van B",
                //     id: 23,
                //     lastEggTurning: null,
                //     message: null,
                //     name: "Thử nghiệm 123"
                //     listProblem: []
                // }
            })
            .catch((error) => {
                showToast("Thêm lịch ấp", error.message, "error");
            })
    }, []);

    return (
        <Fragment>
            {
                listMachine.map(value => (
                    <EmployeeMachineItem
                        key={value.id}
                        name={value.name}
                        cycle={value.cycle}
                        lastEggTurning={value.lastEggTurning ? value.lastEggTurning : "Chưa có dữ liệu"}
                        clientId={value.id}
                        machineId={value.id}
                        listProblem={value.listProblem}
                        setScheduleState={setScheduleState}
                    />
                ))
            }
            {
                scheduleState.state
                    ?
                    <ScheduleMachine machineId={scheduleState.id} closeFunc={() => setScheduleState({ state: false, id: null })} />
                    :
                    null
            }
        </Fragment>
    )
}

export default DanhSachMayApEmployee;