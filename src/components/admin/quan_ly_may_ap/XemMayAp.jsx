import { useEffect } from 'react';
import style from './XemMayAp.module.scss';
import { useState } from 'react';

function XemMayAp({ wId }) {
    const [info, setInfo] = useState(
        {
            name: "null",
            lastEggTurning: "null",
            cycle: "null",
        }
    );
    useEffect(() => {
        console.log("ID may ap: " + wId);
        fetch(`https://mocki.io/v1/1ce2c4e3-67de-433a-a595-1ffa3d89966c`)
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
