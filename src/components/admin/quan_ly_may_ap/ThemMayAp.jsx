import { useContext, useEffect, useState } from 'react';
import api from '../../../config/api';
import fetchData from '../../../function/fetch';
import style from './ThemMayAp.module.scss';
import ToastMessageContext from '../../base/toast_message/ToastMessageContext';

function ThemMayAp({ reloadTableFunc }) {
    const showToast = useContext(ToastMessageContext);
    const [listEmployee, setListEmployee] = useState([]);
    const [machineInfo, setMachineInfo] = useState({
        cycle: 2,
        name: "",
        employeeId: 0,
    })
    const submit = () => {
        fetchData({
            subUrl: api.createMachine,
            method: "POST",
            data: {
                cycle: machineInfo.cycle,
                name: machineInfo.name,
                employeeId: machineInfo.employeeId
            }
        })
            .then((data) => {
                showToast("Thêm máy ấp", "Thêm máy ấp thành công", "success");
                reloadTableFunc();
            })
            .catch((error) => {
                showToast("Thêm máy ấp", error.message, "error");
                // reloadTableFunc();
            })
    };

    useEffect(() => {
        fetchData({
            subUrl: api.getListUserByrole + "EMPLOYEE",
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setMachineInfo({ ...machineInfo, employeeId: data[0].id })
                }
                setListEmployee(data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [])

    // Hàm xử lý sự kiện khi thay đổi giá trị trong select
    const handleSelectChange = (e) => {
        const selectedEmployeeId = e.target.value;

        setMachineInfo(prevState => ({
            ...prevState,
            employeeId: selectedEmployeeId
        }));
    };

    return (
        <div className={style.ThemMayAp}>
            <h2>Thêm máy ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên máy ấp</label>
                <input
                    onChange={(e) => setMachineInfo({ ...machineInfo, name: e.target.value })}
                    value={machineInfo.name} className={style.input_noi_dung} id='name' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="nhanvien">Nhân viên quản lý</label>
                <select value={machineInfo.employeeId} onChange={handleSelectChange} id="nhanvien" name="nhanvien">
                    {
                        listEmployee.map((value) => (
                            <option key={value.id} value={value.id}>{value.name}</option>))
                    }
                </select>
            </div>
            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default ThemMayAp;
