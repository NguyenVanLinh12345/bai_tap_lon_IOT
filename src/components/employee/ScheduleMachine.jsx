import { useContext, useEffect, useState } from 'react';
import style from './ScheduleMachine.module.scss';

import { AiOutlineCloseCircle, AiOutlinePause } from 'react-icons/ai';
import api from '../../config/api';
import fetchData from '../../function/fetch';
import ToastMessageContext from '../base/toast_message/ToastMessageContext';

function ScheduleMachine({ closeFunc, machineId }) {
    const showToast = useContext(ToastMessageContext);
    const [listSchedule, setListSchedule] = useState([]);
    const [listTypeEgg, setListTypeEgg] = useState([]);
    const [chooseInfo, setChooseInfo] = useState({
        idTrung: null,
        ngayAp: new Date(),
        ngayNgungDao: new Date(),
        ngayNo: new Date(),
        nhietDo: 0,
        doAm: 0,
        soLuong: 0,
        moTa: ""
    })
    function formatDate(myDate) {
        // myDate = new Date(myDate);
        const day = myDate.getDate();
        const month = myDate.getMonth();
        const year = myDate.getFullYear();

        return `Ngày ${day} tháng ${month} năm ${year}`;
    }
    useEffect(() => {
        fetchData({
            subUrl: api.getListTypeEgg,
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                setListTypeEgg(data);
            })
            .catch((error) => {
                showToast("Lấy danh sách trứng", error.message, "error");
            })

    }, []);

    useEffect(() => {
        fetchData({
            subUrl: api.getListScheduleById + machineId,
            method: "GET"
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.length > 0){
                    setListSchedule(data);
                }
            })
            .catch((error) => {
                showToast("Lấy danh sách lịch ấp", error.message, "error");
            })
    }, [])

    const submit = () => {
        fetchData({
            subUrl: api.createSchedule,
            method: "POST",
            data: {
                fistDay: chooseInfo.ngayAp,
                lastDay: chooseInfo.ngayNo,
                quantity: chooseInfo.soLuong,
                description: chooseInfo.moTa,
                machineId: machineId,
                typeEggId: chooseInfo.idTrung
            }
        })
            .then((data) => {
                showToast("Thêm lịch ấp", "Thêm lịch ấp thành công", "success");
                closeFunc();
            })
            .catch((error) => {
                showToast("Thêm lịch ấp", error.message, "error");
            })
    }
    return (
        <div className={style.ScheduleMachine}>
            <div className={style.close_container}>
                <span onClick={closeFunc}>
                    <AiOutlineCloseCircle />
                </span>
            </div>

            <div className={style.chon_thong_tin_trung}>
                <div className={style.chon_loai_trung}>
                    <label htmlFor="loaiTrung">Chọn loại trứng</label>
                    <select
                        onChange={(e) => {
                            const myChooose = listTypeEgg.find(element => element.id === Number(e.target.value));
                            //    console.log(myChooose);
                            const ngayNgungDao = new Date(chooseInfo.ngayAp);
                            const ngayNo = new Date(chooseInfo.ngayAp);
                            ngayNgungDao.setDate(ngayNgungDao.getDate() + myChooose.numberTurn);
                            ngayNo.setDate(ngayNo.getDate() + myChooose.numberHatch);
                            setChooseInfo({
                                ...chooseInfo,
                                nhietDo: myChooose.temperature,
                                doAm: myChooose.humidity,
                                ngayNgungDao: ngayNgungDao,
                                ngayNo: ngayNo,
                                idTrung: myChooose.id
                            })
                        }}
                        id='loaiTrung' name="typeEgg">
                        {
                            listTypeEgg.map(value => (
                                <option key={value.id} value={value.id}>{value.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className={style.chon_ngay_ap}>
                    <div className={style.ngay_ap}>
                        <label htmlFor="ngayAp">Chọn ngày ấp</label>
                        <input
                            onChange={(e) => setChooseInfo({ ...chooseInfo, ngayAp: new Date(e.target.value) })}
                            value={chooseInfo.ngayAp} id='ngayAp' type="date" />

                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày ấp:</span>
                        <span>{formatDate(chooseInfo.ngayAp)}</span>
                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày ngưng đảo:</span>
                        <span>{formatDate(chooseInfo.ngayNgungDao)}</span>
                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày nở:</span>
                        <span>{formatDate(chooseInfo.ngayNo)}</span>
                    </div>
                </div>

                <div className={style.thong_tin_nhiet_am}>
                    <span>Nhiệt độ</span><span>{chooseInfo.nhietDo}°C</span>
                    <span><AiOutlinePause /></span>
                    <span>Độ ẩm</span><span>{chooseInfo.doAm}%</span>
                </div>
            </div>

            <div className={style.mo_ta_trung}>
                <label htmlFor="soTrung">Số lượng trứng</label>
                <input
                    value={chooseInfo.soLuong}
                    onChange={(e) => setChooseInfo({ ...chooseInfo, soLuong: Number(e.target.value) })}
                    type="number" id="soTrung" />

                <label htmlFor="moTa">Mô tả</label>
                <textarea
                    value={chooseInfo.moTa}
                    onChange={(e) => setChooseInfo({ ...chooseInfo, moTa: e.target.value })}
                    name="mota" id="moTa"></textarea>
            </div>

            <div>
                <button onClick={() => submit()}>Tạo lịch</button>
            </div>

            <div className={style.danh_sach_dang_ap}>
                <h3>Danh sách trứng đang ấp</h3>
                <ul>
                    {
                        listSchedule.map((value) => (
                            <li key={value.id}>
                                <div>
                                    <p>Loại trứng: <span>Trứng chim cút</span></p>
                                    <p>Ngày ấp: <span>{value.fistDay}</span></p>
                                    <p>Ngày nở: <span>{value.lastDay}</span></p>
                                    <p>Số lượng: <span>{value.quantity}</span></p>
                                    <p>Mô tả: <span>{value.description}</span></p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ScheduleMachine;