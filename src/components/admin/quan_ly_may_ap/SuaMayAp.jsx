import { useEffect, useState } from 'react';
import style from './SuaMayAp.module.scss';

function SuaMayAp({ wId, reloadTableFunc }) {
    const [info, setInfo] = useState(
        {
            name: "null",
        }
    );
    useEffect(() => {
        fetch("https://mocki.io/v1/1ce2c4e3-67de-433a-a595-1ffa3d89966c")
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
        <div className={style.SuaMayAp}>
            <h2>Sửa máy ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên máy ấp</label>
                <input
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className={style.input_noi_dung} id='name' type="text" />
            </div>          
            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default SuaMayAp;
