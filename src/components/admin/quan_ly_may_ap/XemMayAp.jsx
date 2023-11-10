import { useEffect } from 'react';
import style from './XemMayAp.module.scss';
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
        fetch(`https://dummyjson.com/products/${wId}`)
            .then(response => response.json())
            .then(data => {
                setInfo({
                    name: data.title,
                    email: data.category,
                    description: data.description,
                    role: data.brand
                });
            })
            .catch(error => {
                console.error(error);
            })
    }, [wId]);

    return (
        <div className={style.XemMayAp}>
            <h2>Xem Máy ấp</h2>
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
