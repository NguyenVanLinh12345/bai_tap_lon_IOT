import { AiOutlineClose } from "react-icons/ai";

import style from './Container.module.scss';

function Container({ children, closeContainer }) {
    
    return (
        <div className={style.detail_information_container}>
            <div className={style.detail_information}>
                <span onClick={closeContainer} className={style.close_detail_icon}><AiOutlineClose /></span>

                <div className={style.content}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default Container;