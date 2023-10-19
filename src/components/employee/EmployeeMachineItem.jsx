import style from './EmployeeMachineItem.module.scss';

function EmployeeMachineItem() {

    return (
        <div className={style.EmployeeMachineItem}>
            <div className={style.thong_so_container}>
                <span className={`${style.thong_so} ${style.nomal}`}>Nhiệt độ: 37<span>&deg;</span>C</span>
                <span className={`${style.thong_so} ${style.nomal}`}>Độ ấm: 80<span>%</span></span>
            </div>

            <div className={style.thong_so_container}>
                <span className={`${style.thong_so} ${style.nomal}`}>Chất lượng không khí: 30ppm</span>
            </div>

            <div>
                <div className={style.thong_so_container}>
                <button className={style.button}>Đảo trứng</button>
                <span className={`${style.thong_so} ${style.activate}`}>Trạng thái: Đang đảo</span>
                {/* <span className={`${style.thong_so} ${style.disable}`}>Trạng thái: Đang đảo</span> */}
                </div>
                <p>Lần đảo trứng gần đây:
                    <p>
                        10 giờ 32 phút ngày 19/10/2023
                    </p>
                </p>
            </div>
            <div>
                <button>Lên lịch ấp trứng</button>
                <input type="date" />
            </div>

            <div>
                <p>Lượng nước trong bình còn lại: 500ml</p>
                <p>Dự đoán: còn sử dụng được 4 ngày</p>
            </div>

            <div>
                <p>Tình trạng: máy hoạt động bình thường</p>
            </div>
        </div>
    )
}

export default EmployeeMachineItem;