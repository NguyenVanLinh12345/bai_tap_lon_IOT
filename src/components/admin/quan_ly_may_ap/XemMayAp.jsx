import { useEffect } from 'react';
import style from './XemMayAp.module.scss';
import { useState } from 'react';
import fetchData from '../../../function/fetch';
import api from '../../../config/api';

function XemMayAp({ wId }) {
    const [info, setInfo] = useState(
        {
            name: "null",
            lastEggTurning: "null",
            cycle: "null",
        }
    );
    useEffect(() => {
        fetchData({
            subUrl: api.getMachine + wId,
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                setInfo({
                    name: data.name,
                    lastEggTurning: data.lastEggTurning,
                    cycle: data.cycle,
                });
            })
            .catch(error => {
                console.error(error);
            })
    }, [wId]);

    return (
        <div className={style.XemMayAp}>
            <h2>Xem Máy ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input}>Tên máy ấp</label>
                <span>{info.name}</span>
            </div>

            <div className={style.input_container}>
                <span className={style.label_input}>Lần đảo trứng trước</span>
                <span>{info.lastEggTurning}</span>
            </div>

            <div className={style.input_container}>
                <span className={style.label_input}>Chu kỳ đảo trứng</span>
                <span>{info.cycle}</span>
            </div>
        </div>
    )
}
export default XemMayAp;
