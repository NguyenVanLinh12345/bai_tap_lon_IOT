import style from './EmployeeMachineItem.module.scss';

import { useContext } from 'react';

import { Fragment, useEffect, useState } from 'react';

import { WiHumidity, WiThermometer } from 'react-icons/wi';
import { CgAddR } from 'react-icons/cg';
import { MdOutlineAir } from "react-icons/md";

import getMqtt from "../../config/mqttConfig";
// import api from '../../config/api';

import ToastMessageContext from '../base/toast_message/ToastMessageContext';

// const [tinhTrang, setTinhTrang] = useState([]);
// const tinhTrang = ["Trứng sắp nở","Hỏng Phần gia nhiệt (bóng đèn)","Hỏng quạt tản nhiệt","Hỏng cảm biết nhiệt độ - độ ẩm"];

function EmployeeMachineItem({ name, setScheduleState, machineId, cycle, lastEggTurning, listProblem }) {
    const showToast = useContext(ToastMessageContext);

    const [tempHumi, setTempHumi] = useState({ nhietDo: 0, doAm: 0 });
    const [waterLevel, setWaterLevel] = useState(0);
    const [airQuality, setAirQuality] = useState("Tốt");
    const [turnState, setTurnState] = useState(false);
    const [predictWater, setPredictWater] = useState("");

    const [myClient, setClient] = useState(null);
    const daoTrung = () => {
        myClient.publish(`${name}/motor-btn`, '1');
        // // tat dao trung
        // if (turnState === true) {
        //     setTurnState(true);
        //     myClient.publish(`${name}/motor-btn`, '0');
        // }
        // // bat dao trung
        // else {
        //     setTurnState(false);
        //     myClient.publish(`${name}/motor-btn`, '1');
        // }
    }

    const predictWaterFunc = () => {
        const dataSend = {
            id: 0,
            temp: tempHumi.nhietDo,
            humidity: tempHumi.doAm,
            currentWater: waterLevel
        }
        let url = "http://localhost:8000/predict-water";
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataSend)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(result => {
                setPredictWater(result.predict);
            })
            .catch(error => {
                showToast("Lỗi khi dự đoán lượng nước", "Hãy kiểm tra lại server python nhé.", "error");
            });
    }

    useEffect(() => {
        const client = getMqtt(name);
        setClient(client);
        const actionMessage = (topic, message) => {
            try {
                const dataRecei = JSON.parse(message);
                // Nhiệt độ - độ ẩm
                if (topic === `${name}/aht-10`) {
                    const ndRecei = Number(dataRecei.temp).toFixed(2);
                    const daRecei = Number(dataRecei.humidity).toFixed(2);
                    setTempHumi({ nhietDo: ndRecei, doAm: daRecei });
                }

                // Lượng nước
                if (topic === `${name}/hc-sr04`) {
                    const waterLevelRecei = (dataRecei.maxHeight - dataRecei.currentHeight) / dataRecei.maxHeight;
                    setWaterLevel(Number(waterLevelRecei).toFixed(1));
                }

                // Chất lượng không khí
                if (topic === `${name}/mq-135`) {
                    if (dataRecei.analog > 2200) {
                        setAirQuality("Không tốt");
                    }
                    else {
                        setAirQuality("Tốt");
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

    useEffect(() => {
        function getRandomValue(min, max) {
            return (Math.random() * (max - min) + min).toFixed(2);
        }

        const aht_10 = setInterval(() => {
            const temp = getRandomValue(35, 38);
            const humidity = getRandomValue(50, 80);
            myClient.publish("may_1/aht-10", JSON.stringify({ temp: temp, humidity: humidity }));
        }, 2000);

        const hc_sr04 = setInterval(() => {
            const water = getRandomValue(3, 7);
            myClient.publish("may_1/hc-sr04", JSON.stringify({ currentHeight: water, maxHeight: 9 }));
        }, 2000);

        const mq_135 = setInterval(() => {
            const analog = getRandomValue(1700, 2500);
            myClient.publish("may_1/mq-135", JSON.stringify({ analog: analog }));
        }, 2000);

        return () => {
            clearInterval(aht_10);
            clearInterval(hc_sr04);
            clearInterval(mq_135);
        };
    }, [myClient])

    return (
        <div title={name} className={style.EmployeeMachineItem}>
            <div className={style.header}>
                <p>Tên máy: {name}</p>
            </div>
            <div className={style.thong_so}>
                <div className={style.nhiet_do_do_am}>
                    <p>
                        <span className={`${style.icon_thong_so} ${style.color_red}`}><WiThermometer /></span>
                        <span className={style.gia_tri_nhie_am}>{tempHumi.nhietDo}</span>
                        <span>&deg;</span>
                        <span>C</span>
                    </p>
                    <p>
                        <span className={`${style.icon_thong_so} ${style.color_blue}`}><WiHumidity /></span>
                        <span className={style.gia_tri_nhie_am}>{tempHumi.doAm}</span>
                        <span>%</span>
                    </p>
                </div>
                <div className={style.thong_so_phu}>
                    <p className={style.thong_so}>
                        <span className={`${style.icon_thong_so} ${style.color_blue}`}><MdOutlineAir /></span>
                        <span>{airQuality}</span>
                    </p>
                </div>
            </div>

            <div className={style.thong_tin_may_ap}>
                <div className={style.thong_tin_dao}>
                    <button onClick={() => daoTrung()} className={`${style.button_dao_trung} ${turnState ? style.bg_red : style.bg_green}`}>{turnState ? "Ngưng đảo" : "Đảo trứng"}</button>
                    <p>Chu kỳ: {cycle}h/lần</p>
                    <p>Lần đảo trước:</p>
                    <p>{lastEggTurning}</p>
                </div>
                <div onClick={() => predictWaterFunc()} title='Bấm vào để dự đoán lượng nước' className={style.binh_nuoc}>
                    <div style={{ marginTop: `${15 * (1 - waterLevel)}rem` }} className={style.nuoc}></div>
                    <div className={style.thong_tin_nuoc}>
                        <p>{waterLevel * 100}%</p>
                        {
                            predictWater === ""
                                ?
                                <Fragment />
                                :
                                <p>~{predictWater} ngày</p>
                        }
                    </div>
                </div>
            </div>

            <div className={style.end_item}>
                <div className={style.thong_tin_lich}>
                    <button onClick={() => setScheduleState({ state: true, id: machineId, clientMQTT: myClient, name_machine: name })}><CgAddR /> <span>Thêm lịch ấp</span></button>
                </div>
                <div className={style.item_thong_tin_may_ap}>
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