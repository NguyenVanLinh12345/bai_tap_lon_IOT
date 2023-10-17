import style from './ToastMessageItem.module.scss';

import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

function ToastMessageItem({ title = "Thành công", message = "Bạn đã đăng nhập thành công", type = "success" }) {
    // , duration = 5000
    // type = "error";
    // type = "warn";
    let getColorMessage = (typeMessage) => {
        switch (typeMessage) {
            case "success":
                return style.green;
            case "warn":
                return style.orange;
            case "error":
                return style.red;
            default:
                return style.gray;
        }
    }
    return (
        <div className={`${style.ToastMessageItem} ${getColorMessage(type)}`} >
            <div className={`${style.icon} ${style.toast_icon}`}>
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
            <div className={`${style.icon} ${style.close_icon}`}>
                <AiOutlineClose />
            </div>
        </div>
    )
}
export default ToastMessageItem;