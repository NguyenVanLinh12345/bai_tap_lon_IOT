import { useState } from 'react';

import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

import style from './Login.module.scss';
import { useNavigate } from 'react-router-dom';

import { login } from '../function/AccountFunction';

function AdminLogin() {
    const [seePass, setSeePass] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className={style.AdminLogin}>
            <div className={style.form}>
                <h2>Đăng nhập</h2>
                <label className={style.label} htmlFor="email">Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} className={style.input} placeholder='Nhập email' id='email' type='text'/>

                <label className={style.label} htmlFor="password">Mật khẩu</label>
                <div className={style.password}>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} className={style.input} placeholder='Nhập mật khẩu' type={seePass ? "text" : "password"} id='password' />
                    <span title='Xem mật khẩu' onClick={()=>setSeePass(!seePass)} className={style.password_icon}>{seePass ? <AiFillEye /> : <AiFillEyeInvisible />}</span>
                </div>

                <button onClick={()=>{login(email, password, ()=>navigate("/"))}} className={style.button_login}>Đăng nhập</button>
            </div>
        </div>
    )
}

export default AdminLogin; 