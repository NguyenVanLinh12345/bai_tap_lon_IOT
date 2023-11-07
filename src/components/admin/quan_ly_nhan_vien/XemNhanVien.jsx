import { useEffect } from 'react';
import style from './XemNhanVien.module.scss';
import { useState } from 'react';

function XemNhanVien() {
    const [info, setInfo] = useState(
        {
            name: "null",
            email: "null",
            description: "null",
            role: "null"
        }
    );
    useEffect(()=>{
        fetch("https://mocki.io/v1/6d27e355-38dc-48a0-b861-ed9e006f485e")
        .then(response => response.json())
        .then(data =>{
            setInfo(data);
        })
        .catch(error =>{
            console.error(error);
        })
    },[]);
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
