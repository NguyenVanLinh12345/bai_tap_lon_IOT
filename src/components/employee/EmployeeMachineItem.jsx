import style from './EmployeeMachineItem.module.scss';

import { useEffect, useState } from 'react';

import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { CgAddR } from 'react-icons/cg';

import getMqtt from "../../config/mqttConfig";
// import api from '../../config/api';

// const [tinhTrang, setTinhTrang] = useState([]);
// const tinhTrang = ["Trứng sắp nở","Hỏng Phần gia nhiệt (bóng đèn)","Hỏng quạt tản nhiệt","Hỏng cảm biết nhiệt độ - độ ẩm"];

function EmployeeMachineItem({ name, setScheduleState, clientId, machineId, cycle, lastEggTurning, listProblem }) {
    const [thongSoMayAp, setThongSoMayAp] = useState({
        nhietDo: 0,
        doAm: 0,
        kk: "Tốt",
        trangThaiDao: false,
        luongNuoc: 0.5, // day la luong nuoc con lai trong may ap, gia tri tu 0 -> 1
        checkND: true
    });

    const [myClient, setClient] = useState(null);
    const daoTrung = () => {
        // tat dao trung
        if (thongSoMayAp.trangThaiDao === true) {
            setThongSoMayAp({ ...thongSoMayAp, trangThaiDao: false });
            myClient.publish(`${name}/motor-btn`, '0');
        }
        // bat dao trung
        else {
            setThongSoMayAp({ ...thongSoMayAp, trangThaiDao: true });
            myClient.publish(`${name}/motor-btn`, '1');
        }
    }
    useEffect(() => {
        const client = getMqtt(name);
        setClient(client);
        const actionMessage = (topic, message) => {
            try {
                const dataRecei = JSON.parse(message);
                // Nhiệt độ - độ ẩm
                if (topic === `${name}/aht-10`) {
                    // console.log(dataRecei)
                    const ndRecei = Number(dataRecei.temp).toFixed(2);
                    const daRecei = Number(dataRecei.humidity).toFixed(2);
                    if (thongSoMayAp.checkND && thongSoMayAp.nhietDo !== 0) {
                        setThongSoMayAp({ ...thongSoMayAp, nhietDo: ndRecei, doAm: daRecei });
                        thongSoMayAp.checkND = false;
                    }
                }

                // Lượng nước
                if (topic === `${name}/hc-sr04`) {
                    // console.log(dataRecei)
                    setThongSoMayAp({ ...thongSoMayAp, luongNuoc: Number(((dataRecei.maxHeight - dataRecei.currentHeight) / dataRecei.maxHeight), 0) })
                }

                // Chất lượng không khí
                if (topic === `${name}/mq-135`) {
                    // console.log(dataRecei);
                    if (dataRecei.analog > 2200) {
                        setThongSoMayAp({ ...thongSoMayAp, kk: "Không tốt" });
                    }
                    else {
                        setThongSoMayAp({ ...thongSoMayAp, kk: "Tốt" });
                    }
                }

                // Đảo trứng
                if (topic === `${name}/motor`) {
                    console.log(dataRecei);
                }

                // Đảo trứng
                if (topic === `${name}/light-bulb`) {
                    console.log(dataRecei);
                }

                // Đảo trứng
                if (topic === `${name}/humidifier`) {
                    console.log(dataRecei);
                }


            } catch (error) {
                const decoder = new TextDecoder('utf-8');
                const decodedString = decoder.decode(message);
                console.log("EmployeeMachineItem" + decodedString);
            }
        }
        if (client) {
            client.onMessage(actionMessage);

            client.subscribe(`${name}/aht-10`);
            client.subscribe(`${name}/hc-sr04`);
            client.subscribe(`${name}/mq-135`);

            // phan nay de phat hien loi
            client.subscribe(`${name}/motor`);
            client.subscribe(`${name}/light-bulb`);
            client.subscribe(`${name}/humidifier`);
        }
        return () => {
            client.end();
        };
    }, []);

    return (
        <div title={name} className={style.EmployeeMachineItem}>

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
                    <p className={style.thong_so}>Không khí: {thongSoMayAp.kk}</p>
                </div>
            </div>

            {/* <div className={style.thong_tin_trung}>
                <div className={style.item_thong_tin_trung}>
                    <p>Loại trứng:</p>
                    <p>{loaiTrung}</p>
                </div>
                <div className={style.item_thong_tin_trung}>
                    <p>Dự kiến nở:</p>
                    <p>{ngayNo}</p>
                </div>
            </div> */}


            <div className={style.thong_tin_may_ap}>
                <div className={style.item_thong_tin_may_ap}>
                    <div className={style.thong_tin_dao}>
                        <div>
                            <button onClick={() => daoTrung()} className={`${style.button_dao_trung} ${thongSoMayAp.trangThaiDao ? style.bg_red : style.bg_green}`}>{thongSoMayAp.trangThaiDao ? "Ngưng đảo" : "Đảo trứng"}</button>

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
                    <div className={`${style.tinh_trang_may} ${listProblem.length === 0 ? style.bg_green : style.bg_red}`}>
                        <span>Tình trạng</span>
                        {
                            listProblem.length === 0
                                ?
                                null
                                :
                                <ul className={style.danh_sach_van_de}>
                                    {
                                        listProblem.map((value, index) => (
                                            <li key={index}>{index + 1}. {value.description}</li>
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