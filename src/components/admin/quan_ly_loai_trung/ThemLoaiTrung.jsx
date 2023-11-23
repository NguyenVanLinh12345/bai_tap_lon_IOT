import style from './ThemLoaiTrung.module.scss';

function ThemLoaiTrung({reloadTableFunc}) {

    const submit = () => {
        reloadTableFunc();
    };

    return (
        <div className={style.ThemLoaiTrung}>
            <h2>Thêm loại trứng để ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên trứng</label>
                <input className={style.input_noi_dung} id='name' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="temp">Nhiệt độ ấp</label>
                <input className={style.input_noi_dung} id='temp' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="humidity">Độ ẩm tối thiểu</label>
                <input className={style.input_noi_dung} id='humidity' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberHatch">Số ngày ấp</label>
                <input className={style.input_noi_dung} id='numberHatch' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="numberTurn">Số ngày đảo trứng</label>
                <input className={style.input_noi_dung} id='numberTurn' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="description">Mô tả</label>
                <textarea className={style.input_noi_dung} id='description' type="text"></textarea>
            </div>

            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default ThemLoaiTrung;
