import style from './ThemLoaiTrung.module.scss';

import { useState } from 'react'

function ThemLoaiTrung({reloadTableFunc}) {
    const [eggInfo, setEggInfo] = useState({
        name: null,
        temp: null,
        humidity: null,
        dayHatch: null,
        dayTurn: null,
        description: null
    })

    const submit = () => {
        fetchData({
            subUrl: api.createUser + info.role,
            method: "POST",
            data: {
                name: info.name,
                email: info.email,
                password: info.password,
                description: info.description
            }
        })
            // .then((response) => response.json())
            .then((data) => {
                showToast("Thêm nhân viên", "Thêm nhân viên thành công", "success");
                reloadTableFunc();
            })
            .catch((error) => {
                showToast("Thêm nhân viên", error.message, "error");
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
                value={eggInfo.dayHatch}
                onChange = {(e)=>{setEggInfo({...eggInfo, dayHatch: e.target.value})}}
                 className={style.input_noi_dung} id='numberHatch' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberTurn">Số ngày đảo trứng</label>
                <input 
                value={eggInfo.dayTurn}
                onChange = {(e)=>{setEggInfo({...eggInfo, dayTurn: e.target.value})}}
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
