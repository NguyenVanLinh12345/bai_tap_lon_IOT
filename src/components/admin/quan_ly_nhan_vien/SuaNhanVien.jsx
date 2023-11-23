import { useContext, useEffect, useState } from 'react';
import style from './SuaNhanVien.module.scss';
import fetchData from '../../../function/fetch';
import api from '../../../config/api';
import ToastMessageContext from '../../base/toast_message/ToastMessageContext';

function SuaNhanVien({ wId, reloadTableFunc }) {
    const showToast = useContext(ToastMessageContext);
    const [info, setInfo] = useState(
        {
            name: "null",
            email: "null",
            description: "null",
            role: "null"
        }
    );
    useEffect(() => {
        fetchData({
            subUrl: api.getUser + wId,
            method: "GET",
        })
            .then(response => response.json())
            .then(data => {
                setInfo({
                    name: data.name,
                    email: data.email,
                    description: data.description,
                    role: data.roles
                });
            })
            .catch(error => {
                console.error(error);
            })
    }, [wId]);

    const submit = () => {
        fetchData({
            subUrl: api.updateUser,
            method: "PUT",
            data: {
                id: wId,
                name: info.name,
                description: info.description,
                roles: info.role
            }
        })
            .then(response => response.json())
            .then(data => {
                showToast("Sửa nhân viên", "Sửa nhân viên thành công", "success");
                reloadTableFunc();
            })
            .catch(error => {
                showToast("SỬa nhân viên", error.message, "error");
            })
    };

    return (
        <div className={style.SuaNhanVien}>
            <h2>Sửa nhân viên</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên</label>
                <input
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className={style.input_noi_dung} id='name' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input}>Email</label>
                <input readOnly value={info.email} className={style.input_noi_dung} id='email' type="email" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="description">Mô tả</label>
                <textarea
                    value={info.description}
                    onChange={(e) => setInfo({ ...info, description: e.target.value })}
                    className={style.input_noi_dung} id='description' type="text"></textarea>
            </div>


            <div className={style.input_container}>
                <span className={style.label_input}>Quyền</span>
                <label htmlFor="admin">ADMIN</label>
                <input
                    checked={info.role === "ADMIN"}
                    onChange={() => setInfo({ ...info, role: "ADMIN" })}
                    id='admin' name='role' type="radio" />

                <label htmlFor="employee">EMPLOYEE</label>
                <input
                    checked={info.role === "EMPLOYEE"}
                    onChange={() => setInfo({ ...info, role: "EMPLOYEE" })}
                    id='employee' name='role' type="radio" />
            </div>

            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default SuaNhanVien;
