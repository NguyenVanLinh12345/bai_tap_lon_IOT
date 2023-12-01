import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineLogout } from "react-icons/hi";

import style from './Header.module.scss';
import logo from '../../../assets/image/logo.jpg';
import user from '../../../assets/image/User-avatar.svg.png';

import { logout } from '../../../function/AccountFunction';
import { useState } from 'react';
import Container from '../container/Container';
import MyInfo from '../my_info/MyInfo';
import getHeaderNav from '../../../config/header_nav';

function Header() {
    const [detailOpenState, setDetailOpenState] = useState(false);
    const listHeader = getHeaderNav();
    const navigate = useNavigate();
    return (
        <div className={style.Header}>
            <div className={style.main_header}>
                <div className={style.left_side}>
                    <Link to={"/home"}>
                        <div className={style.logo} style={{ backgroundImage: `url('${logo}')` }}></div>
                    </Link>
                    <ul>
                        {
                            listHeader.map((value) => (
                                <li key={value.id}>
                                    <Link to={value.link}>{value.title}</Link>
                                </li>
                            ))
                        }
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
                    <Container closeContainer={() => setDetailOpenState(false)}><MyInfo /></Container>
                    : ""
            }
        </div>
    )
}

export default Header;