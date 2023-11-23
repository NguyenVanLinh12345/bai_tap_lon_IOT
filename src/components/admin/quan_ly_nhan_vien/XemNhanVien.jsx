import { useEffect } from 'react';
import style from './XemNhanVien.module.scss';
import { useState } from 'react';

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
        console.log("id của nhân viên là: " + wId);
        fetch(`https://mocki.io/v1/3790f23f-4421-4ae8-817b-97e1a1cc15a7`)
            .then(response => response.json())
            .then(data => {
                setInfo({
                    name: data.name,
                    email: data.email,
                    description: data.description,
                    role: data.role
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
