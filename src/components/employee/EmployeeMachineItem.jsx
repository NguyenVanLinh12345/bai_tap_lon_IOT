import style from './EmployeeMachineItem.module.scss';

import { useEffect, useState } from 'react';

import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { CgAddR } from 'react-icons/cg';

import getMqtt from "../../config/mqttConfig";
// import api from '../../config/api';

function EmployeeMachineItem({ setScheduleState, clientId, machineId, cycle, lastEggTurning }) {
    const [tinhTrang, setTinhTrang] = useState([]);
    // const tinhTrang = ["Trứng sắp nở","Hỏng Phần gia nhiệt (bóng đèn)","Hỏng quạt tản nhiệt","Hỏng cảm biết nhiệt độ - độ ẩm"];
    const [thongSoMayAp, setThongSoMayAp] = useState({
        nhietDo: 37.5,
        doAm: 68,
        co2: 2360,
        nh3: 0,
        trangThaiDao: false,
        luongNuoc: 0.5 // day la luong nuoc con lai trong may ap, gia tri tu 0 -> 1
    });

    // Loại trứng nở sớm nhất
    const loaiTrung = "Trứng gà";
    // Ngày nở của loại trứng nở sớm nhất
    const ngayNo = "20/11/2023";

    const daoTrung = (thisClient) => {
        thisClient.publish(`${clientId}/esp32`, "bat den");
        // updateDoc(databaseRef, { isTurning: value });
    }
    useEffect(() => {
        const client = getMqtt(clientId);
        const actionMessage = (topic, message) => {
            try {
                const dataRecei = JSON.parse(message);
                // Nhiệt độ - độ ẩm
                if (topic === `${clientId}/aht-10`) {
                    const ndRecei =  Number(dataRecei.temp).toFixed(2)
                    const daRecei =  Number(dataRecei.humidity).toFixed(2)
                    setThongSoMayAp({...thongSoMayAp, nhietDo: ndRecei, doAm: daRecei});
                }

                // Lượng nước
                if (topic === `${clientId}/hc-sr04`) {
                    console.log(dataRecei)

                }

                // Đảo trứng
                if (topic === `${clientId}/motor`) {
                    console.log(dataRecei)

                }

                // Chất lượng không khí
                // if (topic === `${clientId}/chat-luong-kk`) {

                // }
            } catch (error) {
                const decoder = new TextDecoder('utf-8');
                const decodedString = decoder.decode(message);
                console.log("EmployeeMachineItem" + decodedString);
            }
        }
        if (client) {
            client.onMessage(actionMessage);

            client.subscribe(`${clientId}/aht-10`);
            client.subscribe(`${clientId}/hc-sr04`);
            client.subscribe(`${clientId}/motor`);
            client.subscribe(`${clientId}/esp32`);
        }
        return () => {
            client.end();
        };
    }, [clientId]);

    // useEffect(() => {
    //     fetchData({
    //         // tương lai phải đổi lại thành get by user id để chỉ lấy ra các máy mà user quản lý
    //         subUrl: api,
    //         method: "GET"
    //     })
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setTinhTrang(data);
    //         })
    //         .catch((error) => {
    //             showToast("Thêm lịch ấp", error.message, "error");
    //         })
    // }, []);
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
                    <p className={style.thong_so}>Không khí: {thongSoMayAp.co2}</p>
                    {/* <p className={style.thong_so}>CO2: {thongSoMayAp.co2}ppm</p> */}
                    {/* <p className={style.thong_so}>NH3: {thongSoMayAp.nh3}ppm</p> */}
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
                            <p>{cycle}h/lần</p>
                        </div>
                    </div>

                    <div className={style.thong_tin_dao_truoc}>
                        <p>Lần đảo trứng trước:</p>
                        <p>{lastEggTurning}</p>
                        {/* <p>Ngày 19/10/2023</p> */}
                    </div>

                    <div className={style.thong_tin_lich}>
                        <button onClick={() => setScheduleState({ state: true, id: machineId })}><CgAddR /> <span>Thêm lịch ấp</span></button>
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