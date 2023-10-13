import { AiOutlineClose } from "react-icons/ai";

import style from './Container.module.scss';

function Container({ title, children, closeContainer }) {

    return (
        <div className={style.detail_information_container}>
            <div className={style.detail_information}>
                <h2>{title}</h2>
                <span onClick={closeContainer} className={style.close_detail_icon}><AiOutlineClose /></span>

                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Container;