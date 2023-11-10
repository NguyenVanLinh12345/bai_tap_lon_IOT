import style from './ThemMayAp.module.scss';

function ThemMayAp({reloadTableFunc}) {

    const submit = () => {
        reloadTableFunc();
    };

    return (
        <div className={style.ThemMayAp}>
            <h2>Thêm máy ấp</h2>
            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="name">Tên</label>
                <input className={style.input_noi_dung} id='name' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="email">Email</label>
                <input className={style.input_noi_dung} id='email' type="email" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="password">Mật khẩu</label>
                <input className={style.input_noi_dung} id='password' type="text" />
            </div>

            <div className={style.input_container}>
                <label className={style.label_input} htmlFor="description">Mô tả</label>
                <textarea className={style.input_noi_dung} id='description' type="text"></textarea>
            </div>


            <div className={style.input_container}>
                <span className={style.label_input}>Quyền</span>
                <label htmlFor="admin">ADMIN</label>
                <input id='admin' name='role' type="radio" value={"ADMIN"} />
               
                <label htmlFor="employee">EMPLOYEE</label>
                <input id='employee' name='role' type="radio" value={"EMPLOYEE"} />
            </div>

            <div className={style.end_button}>
                <button className='delete_btn'>Xóa hết</button>
                <button onClick={submit} className='submit_btn'>Gửi</button>
            </div>
        </div>
    )
}
export default ThemMayAp;
