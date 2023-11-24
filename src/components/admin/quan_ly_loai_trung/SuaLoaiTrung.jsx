import { useContext, useEffect, useState } from 'react';
import style from './SuaLoaiTrung.module.scss';
import fetchData from '../../../function/fetch';
import api from '../../../config/api';
import ToastMessageContext from '../../base/toast_message/ToastMessageContext';

function SuaLoaiTrung({ wId, reloadTableFunc }) {
    const showToast = useContext(ToastMessageContext);
    const [info, setInfo] = useState(
        {
            name: "",
            description: "",
            temperature: "",
            numberHatch: "",
            numberTurn: "",
            humidity: 0
        }

    );
    useEffect(() => {
        fetchData({
            subUrl: api.getTypeEgg + wId,
            method: "GET",
        })
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
        fetchData({
            subUrl: api.updateTypeEgg,
            method: "PUT",
            data: {
                id: wId,
                name: info.name,
                humidity: info.humidity,
                temperature: info.temperature,
                numberHatch: info.numberHatch,
                numberTurn: info.numberTurn,
                description: info.description
            }
        })
            // .then((response) => response.json())
            .then((data) => {
                showToast("Sửa loại trứng", "Sửa loại trứng thành công", "success");
                reloadTableFunc();
            })
            .catch((error) => {
                showToast("Sửa loại trứng", error.message, "error");
                // reloadTableFunc();
            })
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
                    onChange={(e) => setInfo({ ...info, temperature: e.target.value })}
                    className={style.input_noi_dung} id='temp' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="humidity">Độ ẩm tối thiểu</label>
                <input
                    value={info.humidity}
                    onChange={(e) => setInfo({ ...info, humidity: e.target.value })}
                    className={style.input_noi_dung} id='humidity' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberHatch">Số ngày ấp</label>
                <input
                    value={info.numberHatch}
                    onChange={(e) => setInfo({ ...info, numberHatch: e.target.value })}
                    className={style.input_noi_dung} id='numberHatch' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberTurn">Số ngày đảo trứng</label>
                <input
                    value={info.numberTurn}
                    onChange={(e) => setInfo({ ...info, numberTurn: e.target.value })}
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
