import { useContext, useEffect, useState } from 'react';
import style from './SuaMayAp.module.scss';
import api from '../../../config/api';
import fetchData from '../../../function/fetch';
import ToastMessageContext from '../../base/toast_message/ToastMessageContext';

function SuaMayAp({ wId, reloadTableFunc }) {
    const showToast = useContext(ToastMessageContext);
    const [listEmployee, setListEmployee] = useState([]);
    const [info, setInfo] = useState(
        {
            name: "null",
            employeeId: 0,
        }
    );
    useEffect(() => {
        fetchData({
            subUrl: api.getMachine + wId,
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setInfo({
                    name: data.name,
                    employeeId: data.employeeId
                });
            })
            .catch(error => {
                console.error(error);
            })
    }, [wId]);

    useEffect(() => {
        fetchData({
            subUrl: api.getListUserByrole + "EMPLOYEE",
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setInfo({ ...info, employeeId: data[0].id })
                }
                setListEmployee(data);
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [])

    const submit = () => {
        fetchData({
            subUrl: api.updateMachine,
            method: "PUT",
            data: {
                id: wId,
                name: info.name,
                employeeId: info.employeeId
            }
        })
            .then((data) => {
                console.log(data);
                showToast("Sửa máy ấp", "Sửa máy ấp thành công", "success");
                reloadTableFunc();
            })
            .catch((error) => {
                showToast("Sửa máy ấp", error.message, "error");
            })
    };

    const handleSelectChange = (e) => {
        const selectedEmployeeId = e.target.value;

        setInfo(prevState => ({
            ...prevState,
            employeeId: selectedEmployeeId
        }));
    };

    return (
        <div className={style.SuaMayAp}>
            <h2>Sửa máy ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên máy ấp</label>
                <input
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    value={info.name} className={style.input_noi_dung} id='name' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="nhanvien">Nhân viên quản lý</label>
                <select value={info.employeeId} onChange={handleSelectChange} id="nhanvien" name="nhanvien">
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
export default SuaMayAp;
