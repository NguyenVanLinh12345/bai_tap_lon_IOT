import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { HiOutlineLogout } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import style from './Header.module.scss';
import logo from '../assets/image/logo.jpg';
import user from '../assets/image/User-avatar.svg.png';

import { logout } from '../function/AccountFunction';
function Header() {
    const [containerState, setContainerState] = useState(false);
    const navigate = useNavigate();
    return (
        <div className={style.Header}>
            <div className={style.main_header}>
                <div className={style.left_side}>
                    <Link to={"/login"}>
                        <div className={style.logo} style={{ backgroundImage: `url('${logo}')` }}></div>
                    </Link>
                    <ul>
                        <li>
                            <Link to={"/login"}>Danh sách nhân viên</Link>
                            <Link to={"/login"}>Danh sách máy ấp trứng</Link>
                            <Link to={"/login"}>Danh sách máy ấp trứng (employee)</Link>
                        </li>
                    </ul>
                </div>
                <div className={style.right_side}>
                    <div className={style.drop_list}>
                        <div className={style.logo} style={{ backgroundImage: `url('${user}')` }}>
                            <ul className={style.list}>
                                <li><button onClick={() => setContainerState(true)}>Xem thông tin chi tiết</button></li>
                                <li><button onClick={()=>{logout(()=>navigate("/login"))}}>Đăng xuất <span><HiOutlineLogout /></span></button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.background_header}></div>
            {
                containerState
                    ?
                    <div className={style.detail_information_container}>
                        <div className={style.detail_information}>
                            <h2>Thông tin chi tiết</h2>
                            <span onClick={() => setContainerState(false)} className={style.close_detail_icon}><AiOutlineClose /></span>
                        </div>
                    </div>
                    :
                    ""
            }
        </div>
    )
}

export default Header;