import { useContext, useEffect, useState } from 'react';
import style from './ScheduleMachine.module.scss';

import { AiOutlineCloseCircle, AiOutlinePause } from 'react-icons/ai';
import api from '../../config/api';
import fetchData from '../../function/fetch';
import ToastMessageContext from '../base/toast_message/ToastMessageContext';

import { formatDateForView, formatDateForInput } from '../../function/formatDate';

function ScheduleMachine({ closeFunc, machineId, clientMQTT, nameMachine }) {
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
        soLuong: "",
        moTa: "",
        soNgayDao: 0
    })

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
                if (data.length > 0) {
                    setListSchedule(data);
                }
            })
            .catch((error) => {
                showToast("Lấy danh sách lịch ấp", error.message, "error");
            })
    }, [])

    const configMachineMQTT = (clientMQTT) => {
        const dataSend = {
            temp: chooseInfo.nhietDo,
            humidity: chooseInfo.doAm,
            numberTurn: chooseInfo.soNgayDao
        };
        clientMQTT.publish(`${nameMachine}/config`, JSON.stringify(dataSend));
    };

    const submit = () => {
        const conFirmSubmit = window.confirm("Bạn muốn thêm lịch ấp");
        if (conFirmSubmit) {
            configMachineMQTT(clientMQTT);
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
    }

    const updatAfterDeleteSchedule = (myId)=>{
        const newSchedule = listSchedule.filter(value => value.id !== myId);
        setListSchedule(newSchedule);
    }

    const deleteSchedule = (myId) => {
        const checkDelete = window.confirm("Bạn chắc chắn muốn xóa lịch ấp?");
        if (checkDelete) {
            fetchData({
                subUrl: api.deleteSchedule + myId,
                method: "DELETE",
            })
                .then((data) => {
                    showToast("Xóa lịch ấp", "Xóa lịch ấp thành công", "success");
                    updatAfterDeleteSchedule(myId);
                    // closeFunc();
                    
                })
                .catch((error) => {
                    showToast("Xóa lịch ấp", error.message, "error");
                })
        }
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
                                idTrung: myChooose.id,
                                soNgayDao: myChooose.numberTurn
                            })
                        }}
                        id='loaiTrung' name="typeEgg">
                        {
                            listTypeEgg.map(value => (
                                <option key={value.id} value={value.id}>{`${value.name} (${value.numberHatch} ngày ấp)`}</option>
                            ))
                        }
                    </select>
                </div>

                <div className={style.chon_ngay_ap}>
                    <div className={style.ngay_ap}>
                        <label htmlFor="ngayAp">Chọn ngày ấp</label>
                        <input
                            onChange={(e) => setChooseInfo({ ...chooseInfo, ngayAp: new Date(e.target.value) })}
                            value={formatDateForInput(chooseInfo.ngayAp)} id='ngayAp' type="date" />

                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày ấp:</span>
                        <span>{formatDateForView(chooseInfo.ngayAp)}</span>
                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày ngưng đảo:</span>
                        <span>{formatDateForView(chooseInfo.ngayNgungDao)}</span>
                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày nở:</span>
                        <span>{formatDateForView(chooseInfo.ngayNo)}</span>
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

            <div className={style.submit_schedule}>
                <button className={style.submit_schedule_btn} onClick={() => submit()}>Tạo lịch</button>
            </div>

            <div className={style.danh_sach_dang_ap}>
                <h3>Danh sách trứng đang ấp</h3>
                <ul className={style.list_schedule}>
                    {
                        listSchedule.map((value) => (
                            <li className={style.schedule_item} key={value.id}>
                                <div>
                                    <p>Loại trứng: <span>Trứng chim cút</span></p>
                                    <p>Ngày ấp: <span>{formatDateForView(value.fistDay)}</span></p>
                                    <p>Ngày ấp: <span>{formatDateForView(value.lastDay)}</span></p>
                                    <p>Số lượng: <span>{value.quantity}</span></p>
                                    <p>Mô tả: <span>{value.description}</span></p>
                                </div>
                                <span
                                    onClick={() => deleteSchedule(value.id)}
                                    className={style.delete_schedule}>
                                    <AiOutlineCloseCircle />
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ScheduleMachine;