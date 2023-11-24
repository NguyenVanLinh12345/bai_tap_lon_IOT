import { useEffect } from 'react';
import style from './XemLoaiTrung.module.scss';
import { useState } from 'react';
import fetchData from '../../../function/fetch';
import api from '../../../config/api';

function XemNhanVien({ wId }) {
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

    return (
        <div className={style.XemLoaiTrung}>
            <h2>Xem thông tin trứng</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên trứng</label>
                <span className={style.input_noi_dung} id='name'>{info.name}</span>
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="temp">Nhiệt độ ấp</label>
                <span className={style.input_noi_dung} id='temp'>{info.temperature}</span>
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="humidity">Độ ẩm tối thiểu</label>
                <span className={style.input_noi_dung} id='humidity'>{info.humidity}</span>
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberHatch">Số ngày ấp</label>
                <span className={style.input_noi_dung} id='numberHatch'>{info.numberHatch}</span>
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberTurn">Số ngày đảo trứng</label>
                <span className={style.input_noi_dung} id='numberTurn'>{info.numberTurn}</span>
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="description">Mô tả</label>
                <span className={style.input_noi_dung} id='description'>{info.description}</span>
            </div>
        </div>
    )
}
export default XemNhanVien;
