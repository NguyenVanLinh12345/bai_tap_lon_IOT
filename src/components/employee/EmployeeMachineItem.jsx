import style from './EmployeeMachineItem.module.scss';

import { useEffect, useState } from 'react';

import { getDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';


import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { CgAddR } from 'react-icons/cg';

import database from '../../config/fireBaseConfig';

function EmployeeMachineItem({setScheduleState}) {
    const id = 'may1';
    const databaseRef = doc(database, 'ap-trung-iot', 'may1');
    const [thongSoMayAp, setThongSoMayAp] = useState({
        nhietDo: 0,
        doAm: 0,
        co2: 0,
        nh3: 0,
        trangThaiDao: false,
        luongNuoc: 0 // day la luong nuoc con lai trong may ap, gia tri tu 0 -> 1
    });

    // Loại trứng nở sớm nhất
    const loaiTrung = "Trứng gà";
    // Ngày nở của loại trứng nở sớm nhất
    const ngayNo = "20/11/2023";
    const chuKy = 2;

    const daoTrung = (value) => {
        updateDoc(databaseRef, { isTurning: value });
    }

    const tinhTrang = [];
    // const tinhTrang = ["Trứng sắp nở","Hỏng Phần gia nhiệt (bóng đèn)","Hỏng quạt tản nhiệt","Hỏng cảm biết nhiệt độ - độ ẩm"];

    useEffect(() => {

        getDoc(databaseRef)
            .then((docSnapshot) => {
                if (docSnapshot.exists()) {
                    const data = docSnapshot.data();
                    setThongSoMayAp({
                        nhietDo: data.temperature,
                        doAm: data.humidity,
                        co2: data.oxygen,
                        nh3: data.heartbeat,
                        trangThaiDao: data.isTurning,
                        luongNuoc: (data.currentWater / data.maxWater).toFixed(2)
                    }
                    );
                } else {
                    console.log("File EmployeeMachineItem");
                }
            });

        const unsubscribe = onSnapshot(databaseRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.data();
                setThongSoMayAp({
                    nhietDo: data.temperature,
                    doAm: data.humidity,
                    co2: data.oxygen,
                    nh3: data.heartbeat,
                    trangThaiDao: data.isTurning,
                    luongNuoc: (data.currentWater / data.maxWater).toFixed(2)
                }
                );
            } else {
                alert("Mất kết nối máy ấp trứng");
            }
        })

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div className={style.EmployeeMachineItem}>

            <div className={style.thong_so}>
                <div className={style.nhiet_do_do_am}>
                    <p>
                        <span className={`${style.icon_thong_so} ${style.color_red}`}><WiThermometer /></span>
                        <span>{thongSoMayAp.nhietDo}</span>
                        <span>&deg;</span>
                        <span>C</span>
                    </p>
                    <p>
                        <span className={`${style.icon_thong_so} ${style.color_blue}`}><WiHumidity /></span>
                        <span>{thongSoMayAp.doAm}</span>
                        <span>%</span>
                    </p>
                </div>
                <div className={style.thong_so_phu}>
                    <p className={style.thong_so}>CO2: {thongSoMayAp.co2}ppm</p>
                    <p className={style.thong_so}>NH3: {thongSoMayAp.nh3}ppm</p>
                </div>
            </div>

            <div className={style.thong_tin_trung}>
                <div className={style.item_thong_tin_trung}>
                    <p>Loại trứng:</p>
                    <p>{loaiTrung}</p>
                </div>
                <div className={style.item_thong_tin_trung}>
                    <p>Dự kiến nở:</p>
                    <p>{ngayNo}</p>
                </div>
            </div>


            <div className={style.thong_tin_may_ap}>
                <div className={style.item_thong_tin_may_ap}>
                    <div className={style.thong_tin_dao}>
                        <div>
                            <button onClick={() => daoTrung(!thongSoMayAp.trangThaiDao)} className={`${style.button_dao_trung} ${thongSoMayAp.trangThaiDao ? style.bg_red : style.bg_green}`}>{thongSoMayAp.trangThaiDao ? "Ngưng đảo" : "Đảo trứng"}</button>

                        </div>
                        <div className={style.thong_tin_dao_chi_tiet}>
                            <p>Chu kỳ:</p>
                            <p>{chuKy}h/lần</p>
                        </div>
                    </div>

                    <div className={style.thong_tin_dao_truoc}>
                        <p>Lần đảo trứng trước:</p>
                        <p>10 giờ 32 phút</p>
                        <p>Ngày 19/10/2023</p>
                    </div>

                    <div className={style.thong_tin_lich}>
                        <button onClick={()=>setScheduleState({state: true, id: id})}><CgAddR/> <span>Thêm lịch ấp</span></button>
                    </div>
                </div>
                <div className={style.item_thong_tin_may_ap}>
                    <div className={style.binh_nuoc}>
                        <div style={{ marginTop: `${15 * (1 - thongSoMayAp.luongNuoc)}rem` }} className={style.nuoc}></div>
                        <div className={style.thong_tin_nuoc}>
                            <p>{thongSoMayAp.luongNuoc * 100}%</p>
                            <p>~20 ngày</p>
                        </div>
                    </div>
                    <div className={`${style.tinh_trang_may} ${tinhTrang.length === 0 ? style.bg_green : style.bg_red}`}>
                        <span>Tình trạng</span>
                        {
                            tinhTrang.length === 0
                                ?
                                null
                                :
                                <ul className={style.danh_sach_van_de}>
                                    {
                                        tinhTrang.map((value, index) => (
                                            <li key={index}>{index + 1}. {value}</li>
                                        ))
                                    }
                                </ul>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EmployeeMachineItem;