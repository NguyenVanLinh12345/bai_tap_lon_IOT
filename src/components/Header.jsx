import { Link, useNavigate } from 'react-router-dom';

import { HiOutlineLogout } from "react-icons/hi";

import style from './Header.module.scss';
import logo from '../assets/image/logo.jpg';
import user from '../assets/image/User-avatar.svg.png';

import { logout } from '../function/AccountFunction';
import { useState } from 'react';
import Container from './Container';
function Header() {
    const [detailOpenState, setDetailOpenState] = useState(false);
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
                                <li><button onClick={() => setDetailOpenState(true)}>Xem thông tin chi tiết</button></li>
                                <li><button onClick={() => { logout(() => navigate("/login")) }}>Đăng xuất <span><HiOutlineLogout /></span></button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.background_header}></div>
            {
                detailOpenState
                    ?
                    <Container title={"Thông tin chi tiết"} closeContainer={()=>setDetailOpenState(false)}><div>hello nha</div></Container>
                    : ""
            }
        </div>
    )
}

export default Header;