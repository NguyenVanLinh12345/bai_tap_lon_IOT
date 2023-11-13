import style from './ScheduleMachine.module.scss';

import { AiOutlineCloseCircle, AiOutlinePause } from 'react-icons/ai';

function ScheduleMachine({closeFunc}) {

    function getMyDate() {

        // Lấy ngày hôm nay
        const today = new Date();

        // In ra màn hình ngày/tháng/năm hôm nay
        console.log("Ngày hôm nay:", formatDate(today));

        // Tính ngày 21 ngày sau
        const futureDate = new Date();
        futureDate.setDate(today.getDate() + 21);

        // In ra màn hình ngày/tháng/năm 21 ngày sau
        console.log("Ngày 21 ngày sau:", formatDate(futureDate));

        // Hàm định dạng ngày/tháng/năm
        function formatDate(date) {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        }
    }
    getMyDate();

    const listTypeEgg = [
        {
            id: 1,
            name: "Trứng gà"
        },
        {
            id: 2,
            name: "Trứng vịt"
        },
        {
            id: 3,
            name: "Trứng ngan"
        },
        {
            id: 4,
            name: "Trứng ngỗng"
        },
        {
            id: 5,
            name: "Trứng chim cút"
        }
    ]
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
                    <select id='loaiTrung' name="typeEgg">
                        {
                            listTypeEgg.map(value => (
                                <option key={value.id} value={value.id}>{value.name}</option>
                            ))
                        }
                    </select>
                </div>

                <div className={style.chon_ngay_ap}>
                    <div className={style.ngay_ap}>
                        <label htmlFor="ngayAp">Chọn ngày ấp</label>
                        <input id='ngayAp' type="date" />
                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày ấp:</span>
                        <span>Ngày 01 tháng 11 năm 2023</span>
                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày ngưng đảo:</span>
                        <span>Ngày 18 tháng 11 năm 2023</span>
                    </div>

                    <div className={style.ngay_ap}>
                        <span>Ngày nở:</span>
                        <span>Ngày 20 tháng 11 năm 2023</span>
                    </div>
                </div>

                <div className={style.thong_tin_nhiet_am}>
                    <span>Nhiệt độ</span><span>37°C</span>
                    <span><AiOutlinePause /></span>
                    <span>Độ ẩm</span><span>80%</span>
                </div>
            </div>

            <div className={style.mo_ta_trung}>
                <label htmlFor="soTrung">Số lượng trứng</label>
                <input type="number" id="soTrung" />

                <label htmlFor="moTa">Mô tả</label>
                <textarea name="" id="moTa"></textarea>
            </div>

            <div className={style.danh_sach_dang_ap}>
                <h3>Danh sách trứng đang ấp</h3>
                <ul>
                    <li>
                        <div>
                            <p>Loại trứng: <span>Trứng chim cút</span></p>
                            <p>Ngày ấp: <span>01/10/2023</span></p>
                            <p>Ngày nở: <span>21/10/2023</span></p>
                            <p>Số lượng: <span>10</span></p>
                            <p>Mô tả: <span>Không có</span></p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p>Loại trứng: <span>Trứng gà</span></p>
                            <p>Ngày ấp: <span>01/10/2023</span></p>
                            <p>Ngày nở: <span>20/10/2023</span></p>
                            <p>Số lượng: <span>10</span></p>
                            <p>Mô tả: <span>Không có</span></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ScheduleMachine;