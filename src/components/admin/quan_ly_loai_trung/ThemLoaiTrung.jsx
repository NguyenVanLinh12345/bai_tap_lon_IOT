import style from './ThemLoaiTrung.module.scss';

import { useContext, useState } from 'react'

import fetchData from '../../../function/fetch';
import api from '../../../config/api';
import ToastMessageContext from '../../base/toast_message/ToastMessageContext';

function ThemLoaiTrung({reloadTableFunc}) {
    const showToast = useContext(ToastMessageContext);
    const [eggInfo, setEggInfo] = useState({
        name: "",
        temp: "",
        humidity: "",
        numberHatch: "",
        numberTurn: "",
        description: ""
    })

    const submit = () => {
        fetchData({
            subUrl: api.createTypeEgg,
            method: "POST",
            data: {
               name: eggInfo.name,
               temperature: eggInfo.temp,
               humidity: eggInfo.humidity,
               numberHatch: eggInfo.numberHatch,
               numberTurn: eggInfo.numberTurn,
               description: eggInfo.description
            }
        })
            // .then((response) => response.json())
            .then((data) => {
                showToast("Thêm loại trứng", "Thêm loại trứng thành công", "success");
                reloadTableFunc();
            })
            .catch((error) => {
                showToast("Thêm loại trứng", error.message, "error");
                // reloadTableFunc();
            })
    };

    return (
        <div className={style.ThemLoaiTrung}>
            <h2>Thêm loại trứng để ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên trứng</label>
                <input 
                value={eggInfo.name}
                onChange = {(e)=>{setEggInfo({...eggInfo, name: e.target.value})}}
                 className={style.input_noi_dung} id='name' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="temp">Nhiệt độ ấp</label>
                <input 
                value={eggInfo.temp}
                onChange = {(e)=>{setEggInfo({...eggInfo, temp: e.target.value})}}
                 className={style.input_noi_dung} id='temp' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="humidity">Độ ẩm tối thiểu</label>
                <input 
                value={eggInfo.humidity}
                onChange = {(e)=>{setEggInfo({...eggInfo, humidity: e.target.value})}}
                 className={style.input_noi_dung} id='humidity' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberHatch">Số ngày ấp</label>
                <input 
                value={eggInfo.numberHatch}
                onChange = {(e)=>{setEggInfo({...eggInfo, numberHatch: e.target.value})}}
                 className={style.input_noi_dung} id='numberHatch' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberTurn">Số ngày đảo trứng</label>
                <input 
                value={eggInfo.numberTurn}
                onChange = {(e)=>{setEggInfo({...eggInfo, numberTurn: e.target.value})}}
                 className={style.input_noi_dung} id='numberTurn' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="description">Mô tả</label>
                <textarea 
                value={eggInfo.description}
                onChange = {(e)=>{setEggInfo({...eggInfo, description: e.target.value})}}
                 className={style.input_noi_dung} id='description' type="text"></textarea>
            </div>

            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default ThemLoaiTrung;
