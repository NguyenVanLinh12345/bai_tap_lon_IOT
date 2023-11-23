import { useEffect, useState } from 'react';
import style from './SuaLoaiTrung.module.scss';

function SuaLoaiTrung({ wId, reloadTableFunc }) {
    const [info, setInfo] = useState(
        {
            name: null,
            description: null,
            temperature: null,
            numberHatch: null,
            numberTurn: null,
            humidity: null
        }

    );
    useEffect(() => {
        console.log("ID trung: " + wId);

        fetch(`https://mocki.io/v1/315f0e70-301c-45c2-9fc7-c89f712391eb`)
            .then(response => response.json())
            .then(data => {
                setInfo({
                    name: data.name,
                    description: data.description,
                    temperature: data.temperature,
                    numberHatch: data.numberHatch,
                    numberTurn: data.numberTurn,
                    humidity: data.humidity
                });
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
                <label className={style.label_input} htmlFor="name">Tên trứng</label>
                <input
                    value={info.name}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    className={style.input_noi_dung} id='name' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="temp">Nhiệt độ ấp</label>
                <input
                    value={info.temperature}
                    className={style.input_noi_dung} id='temp' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="humidity">Độ ẩm tối thiểu</label>
                <input
                    value={info.humidity}
                    className={style.input_noi_dung} id='humidity' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberHatch">Số ngày ấp</label>
                <input
                    value={info.numberHatch}
                    className={style.input_noi_dung} id='numberHatch' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberTurn">Số ngày đảo trứng</label>
                <input
                    value={info.numberTurn}
                    className={style.input_noi_dung} id='numberTurn' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="description">Mô tả</label>
                <textarea
                    value={info.description}
                    onChange={(e) => setInfo({ ...info, description: e.target.value })}
                    className={style.input_noi_dung} id='description' type="text"></textarea>
            </div>

            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default SuaLoaiTrung;
