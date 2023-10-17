import style from './ToastMessageItem.module.scss';

import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

function ToastMessageItem(title = "Thành công", message = "Bạn đã đăng nhập thành công", type = "success") {
    // , duration = 5000
    // type = error
    return (
        <div className={style.ToastMessageItem}>
            <div className={style.icon}>
                {
                    type === "success"
                        ?
                        <AiFillCheckCircle />
                        :
                        <AiFillCloseCircle />
                }
            </div>
            <div className={style.toast_body}>
                <h3>{title}</h3>
                <p>{message}</p>
            </div>
        </div>
    )
}
export default ToastMessageItem;