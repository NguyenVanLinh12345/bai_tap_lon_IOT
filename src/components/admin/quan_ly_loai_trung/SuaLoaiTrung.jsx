import { useEffect, useState } from 'react';
import style from './SuaLoaiTrung.module.scss';

function SuaLoaiTrung({ wId, reloadTableFunc }) {
    const [info, setInfo] = useState(
        {
            name: "null",
            email: "null",
            description: "null",
            role: "null"
        }
    );
    useEffect(() => {
        fetch("https://mocki.io/v1/6d27e355-38dc-48a0-b861-ed9e006f485e")
            .then(response => response.json())
            .then(data => {
                setInfo(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [wId]);

    const submit = () => {
        reloadTableFunc();
    };

    return (
        <div className={style.SuaLoaiTrung}>
            <h2>Sửa thông tin trứng</h2>
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
export default SuaLoaiTrung;
