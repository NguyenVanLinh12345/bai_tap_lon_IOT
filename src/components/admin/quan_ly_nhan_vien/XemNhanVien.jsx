import { useEffect } from 'react';
import style from './XemNhanVien.module.scss';
import { useState } from 'react';

import api from '../../../config/api';
import fetchData from '../../../function/fetch';

function XemNhanVien({ wId }) {
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

    return (
        <div className={style.XemNhanVien}>
            <h2>Xem nhân viên</h2>
            <div className={style.input_container}>
                <label className={style.label_input}>Tên</label>
                <span>{info.name}</span>
            </div>

            <div className={style.input_container}>
                <span className={style.label_input}>Email</span>
                <span>{info.email}</span>
            </div>

            <div className={style.input_container}>
                <span className={style.label_input}>Mô tả</span>
                <span>{info.description}</span>
            </div>


            <div className={style.input_container}>
                <span className={style.label_input}>Quyền</span>
                <span>{info.role}</span>
            </div>
        </div>
    )
}
export default XemNhanVien;
