import { Fragment, useContext, useState } from 'react';
import style from './ThemNhanVien.module.scss';
import fetchData from '../../../function/fetch';

import ToastMessageContext from '../../base/toast_message/ToastMessageContext';
import api from '../../../config/api';

function ThemNhanVien({ reloadTableFunc }) {
    const showToast = useContext(ToastMessageContext);
    const [info, setInfo] = useState({
        name: "",
        email: "",
        password: "",
        description: "",
        role: 0
    });

    const listRole = [
        {
            role: "EMPLOYEE",
            value: 0
        },
        {
            role: "ADMIN",
            value: 1
        }
    ]

    const submit = () => {
        fetchData({
            subUrl: api.createUser + info.role,
            method: "POST",
            data: {
                name: info.name,
                email: info.email,
                password: info.password,
                description: info.description
            }
        })
            // .then((response) => response.json())
            .then((data) => {
                showToast("Thêm nhân viên", "Thêm nhân viên thành công", "success");
                reloadTableFunc();
            })
            .catch((error) => {
                showToast("Thêm nhân viên", error.message, "error");
                // reloadTableFunc();
            })

    };

    return (
        <div className={style.ThemNhanVien}>
            <h2>Thêm nhân viên</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên</label>
                <input value={info.name} className={style.input_noi_dung} id='name' type="text"
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="email">Email</label>
                <input value={info.email} className={style.input_noi_dung} id='email' type="email"
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="password">Mật khẩu</label>
                <input value={info.password} className={style.input_noi_dung} id='password' type="text"
                    onChange={(e) => setInfo({ ...info, password: e.target.value })}
                />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="description">Mô tả</label>
                <textarea
                    onChange={(e) => setInfo({ ...info, description: e.target.value })}
                    value={info.description}
                    className={style.input_noi_dung} id='description' type="text" />
            </div>


            <div className={style.input_container}>
                <span className={style.label_input}>Quyền</span>
                {
                    listRole.map((value) => (
                        <Fragment key={value.value}>
                            <label htmlFor={value.role}>{value.role}</label>
                            <input
                                onChange={() => setInfo({ ...info, role: value.value })}
                                checked={value.value == info.role}
                                id={value.role}
                                name='role'
                                type="radio"
                                value={value.value}
                            />
                        </Fragment>
                    ))
                }

            </div>

            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default ThemNhanVien;
