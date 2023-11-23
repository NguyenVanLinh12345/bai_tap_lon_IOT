import style from './ThemMayAp.module.scss';

function ThemMayAp({reloadTableFunc}) {

    const submit = () => {
        reloadTableFunc();
    };

    return (
        <div className={style.ThemMayAp}>
            <h2>Thêm máy ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên máy ấp</label>
                <input className={style.input_noi_dung} id='name' type="text" />
            </div>
            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default ThemMayAp;
