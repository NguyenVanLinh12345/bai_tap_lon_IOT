import { useContext, useEffect, useState } from 'react';
import style from './MyInfo.module.scss';

import fetchData from '../../../function/fetch';
import api from '../../../config/api';
import ToastMessageContext from '../toast_message/ToastMessageContext';

function MyInfo() {
    const showToast = useContext(ToastMessageContext);
    const [info, setInfo] = useState(
        {
            name: "null",
            email: "null",
            password: "",
            description: "null",
            roles: "null"
        }
    );
    useEffect(() => {
        fetchData({
            subUrl: api.getMyInfo,
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setInfo(data);
            })
            .catch(error => {
                showToast("Lấy thông tin bản thân", error.message, "error");
            })
    }, []);

    return (
        <div className={style.MyInfo}>
            <h2>Thông tin cá nhân</h2>
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
                <label className={style.label_input}>Mật khẩu cũ</label>
                <input value={info.password} className={style.input_noi_dung} id='password' type="password" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input}>Mật khẩu mới</label>
                <input value={info.password} className={style.input_noi_dung} id='password' type="password" />
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
                <span>{info.roles}</span>
            </div>

            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default MyInfo;
