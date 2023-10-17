import style from './ToastMessageProvider.module.scss';

import ToastMessageItem from './ToastMessageItem';

function ToastMessageProvider(){

    return (
        <div className='ToastMessageProvider'>
            <ToastMessageItem />
        </div>
    )
}

export default ToastMessageProvider;