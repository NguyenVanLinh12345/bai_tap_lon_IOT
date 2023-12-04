import { Fragment, useContext, useEffect, useState } from 'react';
import style from './Schedule.module.scss';
import api from '../../../config/api';
import fetchData from '../../../function/fetch';
import ToastMessageContext from '../toast_message/ToastMessageContext';
import { IoMdCloseCircleOutline } from "react-icons/io";

function Schedule() {
    const [name, setName] = useState("");
    const [temp, setTemp] = useState("");
    const [humidity, setHumidity] = useState("");
    const [numberTurn, setNumberTurn] = useState("");
    const [numberHatch, setNumberHatch] = useState("");

    const showToast = useContext(ToastMessageContext);
    const [result, setResult] = useState("");
    const [listEggSend, setListEggSend] = useState([]);
    const [listTypeEgg, setListTypeEgg] = useState([]);

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

    const addEggToListEgg = () => {
        if (name && temp && humidity && numberTurn && numberHatch) {
            const findName = listEggSend.find(value => value.name === name);
            if (findName) {
                showToast("Cảnh báo", `${name} đã có trong danh sách, vui lòng chọn loại trứng khác`, "warn")
            }
            else {
                setListEggSend(
                    [...listEggSend, {
                        name: name,
                        temp: temp,
                        humidity: humidity,
                        numberTurn: numberTurn,
                        numberHatch: numberHatch
                    }])
            }
        }
    }

    const removeEggToListEgg = (thisName) => {
        const newList = listEggSend.filter(value => value.name !== thisName);
        setListEggSend(newList);
    }

    const submit = () => {
        const check = window.confirm("Bạn muốn tìm kiếm lịch ấp trứng phù hợp?");
        if (check) {
            let url = "http://localhost:8000/make-schedule";
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(listEggSend)
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then(result => {
                    showToast("Thành công", "Đã tìm được lịch phù hợp", "success");
                    setResult(result.result);
                })
                .catch(error => {
                    showToast("Lỗi khi tìm lịch", "Hãy kiểm tra lại server python nhé.", "error");
                });
        }
    }

    return (
        <div className={style.Schedule}>
            <h2>Chức năng lập lịch</h2>
            <div className={style.chon_loai_trung}>
                <label htmlFor="loaiTrung">Chọn loại trứng</label>
                <select
                    onChange={(e) => {
                        const myChooose = listTypeEgg.find(element => element.id === Number(e.target.value));
                        // console.log(myChooose);
                        const findName = listEggSend.find(value => value.name === myChooose.name);
                        if (findName) {
                            showToast("Cảnh báo", `${name} đã có trong danh sách, vui lòng chọn loại trứng khác`, "warn")
                        }
                        else {
                            setListEggSend(
                                [...listEggSend, {
                                    name: myChooose.name,
                                    temp: myChooose.temperature,
                                    humidity: myChooose.humidity,
                                    numberTurn: myChooose.numberTurn,
                                    numberHatch: myChooose.numberHatch
                                }])
                        }
                    }}
                    id='loaiTrung' name="typeEgg">
                    {
                        listTypeEgg.map(value => (
                            <option key={value.id} value={value.id}>{`${value.name} (${value.numberHatch} ngày ấp)`}</option>
                        ))
                    }
                </select>
            </div>
            <div className={style.info}>
                <div className={style.info_item}>
                    <label htmlFor="name">Tên trứng</label>
                    <input
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        id='name' type="text" />
                </div>

                <div className={style.info_item}>
                    <label htmlFor="temp">Nhiệt độ ấp</label>
                    <input
                        value={temp}
                        onChange={(e) => { setTemp(e.target.value) }}
                        id='temp' type="text" />
                </div>

                <div className={style.info_item}>
                    <label htmlFor="humidity">Độ ẩm</label>
                    <input
                        value={humidity}
                        onChange={(e) => { setHumidity(e.target.value) }}
                        id='humidity' type="text" />
                </div>

                <div className={style.info_item}>
                    <label htmlFor="numberTurn">Số ngày đảo trứng</label>
                    <input
                        value={numberTurn}
                        onChange={(e) => { setNumberTurn(Number(e.target.value)) }}
                        id='numberTurn' type="number" />
                </div>

                <div className={style.info_item}>
                    <label htmlFor="numberHatch">Số ngày ấp</label>
                    <input
                        value={numberHatch}
                        onChange={(e) => { setNumberHatch(Number(e.target.value)) }}
                        id='numberHatch' type="number" />
                </div>

                <div className={style.info_button}>
                    <button onClick={() => addEggToListEgg()} className={style.button_add}>Thêm loại trứng</button>
                </div>
            </div>

            <div className={style.list_egg_submit}>
                <h3>Danh sách trứng muốn lập lịch</h3>
                <ul className={style.list_ul}>
                    {
                        listEggSend.map((value, index) => (
                            <li key={index} className={style.list_li}>
                                <span className={style.item_egg_submit}>{value.name}</span>
                                <span
                                    onClick={() => { removeEggToListEgg(value.name); }}
                                    className={style.item_icon}><IoMdCloseCircleOutline /></span>

                                <div className={style.item_detail}>
                                    <h4>Thông tin chi tiết</h4>
                                    <p>Tên trứng:   <span>{value.name}</span></p>
                                    <p>Nhiệt độ:    <span>{value.temp}</span></p>
                                    <p>Độ ẩm:       <span>{value.humidity}</span></p>
                                    <p>Số ngày đảo: <span>{value.numberTurn}</span></p>
                                    <p>Số ngày ấp:  <span>{value.numberHatch}</span></p>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <div className={style.button_submit}>
                    <button onClick={() => submit()}>Lập lịch</button>
                </div>
            </div>

            {
                result === ""
                    ?
                    <Fragment />
                    :
                    <div className={style.result_text}>
                        <h3>kết quả trả về</h3>
                        <p>{result}</p>
                    </div>
            }

        </div>
    )
}

export default Schedule;

// let data = [
// {
//     "name": "Trứng gà",
//     "temp": 35.5,
//     "humidity": 60.0,
//     "numberTurn": 18,
//     "numberHatch": 20
// },
// {
//     "name": "Trứng Cút",
//     "temp": 35.5,
//     "humidity": 60.0,
//     "numberTurn": 16,
//     "numberHatch": 28
// },
// {
//     "name": "Trứng chim trĩ",
//     "temp": 35.5,
//     "humidity": 60.0,
//     "numberTurn": 19,
//     "numberHatch": 23
// },
// {
//     "name": "Trứng vịt",
//     "temp": 35.0,
//     "humidity": 70.0,
//     "numberTurn": 20,
//     "numberHatch": 22
// },
// {
//     "name": "Trứng ngan",
//     "temp": 35.5,
//     "humidity": 65.0,
//     "numberTurn": 22,
//     "numberHatch": 25
// },
// {
//     "name": "Trứng ngỗng",
//     "temp": 35.0,
//     "humidity": 65.0,
//     "numberTurn": 19,
//     "numberHatch": 23
// },
// {
//     "name": "Trứng gà gô",
//     "temp": 37.0,
//     "humidity": 62.0,
//     "numberTurn": 19,
//     "numberHatch": 22
// }
// ];

// let url = "http://localhost:8000/make-schedule";
// fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// })
//     .then(response => {
//         if (response.ok) {
//             return response.json();
//         }
//         throw new Error('Network response was not ok.');
//     })
//     .then(result => {
//         console.log('Kết quả từ API:', result.result);
//     })
//     .catch(error => {
//         console.error('Có lỗi xảy ra khi gửi request:', error);
//     });
