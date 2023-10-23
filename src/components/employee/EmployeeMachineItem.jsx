import style from './EmployeeMachineItem.module.scss';

import { WiHumidity, WiThermometer } from 'react-icons/wi';

function EmployeeMachineItem() {

    return (
        <div className={style.EmployeeMachineItem}>
            {/* <div className={style.thong_so_container}>
                <span className={`${style.thong_so} ${style.dark_blue}`}>Nhiệt độ: 37<span>&deg;</span>C</span>
                <span className={`${style.thong_so} ${style.dark_blue}`}>Độ ấm: 80<span>%</span></span>
            </div> */}

            <div className={style.thong_so_header_container}>
                <div className={style.thong_so_chinh}>
                    <p>
                        <span className={`${style.icon_thong_so} ${style.color_red}`}><WiThermometer /></span>
                        <span>37</span>
                        <span>&deg;</span>
                        <span>C</span>
                    </p>
                    <p>
                        <span className={`${style.icon_thong_so} ${style.color_blue}`}><WiHumidity /></span>
                        <span>80</span>
                        <span>%</span>
                    </p>
                </div>
                <div className={style.thong_so_phu}>
                    <p className={style.thong_so}>CO2: 30ppm</p>
                    <p className={style.thong_so}>NH3: 345ppm</p>
                </div>
            </div>

            <div className={style.thong_so_trung}>
                <span className={`${style.thong_so} ${style.dark_blue}`}>Loại trứng: Trứng Gà</span>
                <br/>
                <span className={`${style.thong_so} ${style.dark_blue}`}>Ngày nở dự kiến: 20/10/2023</span>
            </div>

            <div className={style.thong_tin_container}>
                <div className={style.thong_so_container}>
                    <button className={style.button}>Đảo trứng</button>
                    <span className={`${style.thong_so} ${style.green}`}>Trạng thái: Đang đảo</span>
                    <br></br>
                    <span className={`${style.thong_so} ${style.green}`}>Chu kỳ đảo: 2h/lần</span>
                    {/* <span className={`${style.thong_so} ${style.red}`}>Trạng thái: Đang đảo</span> */}
                </div>
                <p>Lần đảo trứng gần đây:</p>
                <p>10 giờ 32 phút ngày 19/10/2023</p>
            </div>


            <div className={style.thong_tin_container}>
                <p>Lượng nước trong bình còn lại: 5000ml</p>
                <p>Dự đoán: còn sử dụng được 4 ngày</p>
            </div>

            <div className={style.tinh_trang_may}>
                {/* <p>Tình trạng: <span>máy hoạt động bình thường</span></p> */}
                <p>Tình trạng: <span>máy đang có lỗi ở bộ phận gia nhiệt cho lò ấp</span></p>
            </div>
        </div>
    )
}

export default EmployeeMachineItem;