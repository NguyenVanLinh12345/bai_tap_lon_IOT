import { Fragment, useEffect, useState } from 'react';
import style from './ToastMessageItem.module.scss';

import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineClose } from "react-icons/ai";

function ToastMessageItem({ title = "No title", message = "No message", type = "null"}) {
    // , duration = 5000
    // type = "error";
    // type = "warn";
    const [itemState, setItemState] = useState(true);
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
    useEffect(() => {
        const timeOutID = setTimeout(() => {
            setItemState(false);
        }, 6500);

        return ()=>{
            clearTimeout(timeOutID);
        }
    }, [])
    return (
        <Fragment>
            {
                itemState
                    ?
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
                        <div onClick={() => setItemState(false)} className={`${style.icon} ${style.close_icon}`}>
                            <AiOutlineClose />
                        </div>
                    </div >
                    : null
            }
        </Fragment>
    )
}
export default ToastMessageItem;