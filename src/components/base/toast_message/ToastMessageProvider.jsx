import style from './ToastMessageProvider.module.scss';

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import ToastMessageItem from './ToastMessageItem';

import ToastMessageContext from './ToastMessageContext';

function ToastMessageProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const showToast = (title, message, type) => {
        const newToast = { id: uuidv4(), title, message, type};
        setToasts([...toasts, newToast]);
    };

    return (
        <ToastMessageContext.Provider value={showToast}>
            {children}
            <div className={style.ToastMessageProvider}>
                {
                    toasts.map((value) => (
                        <ToastMessageItem 
                        key={value.id} 
                        message={value.message} 
                        title={value.title} 
                        type={value.type} 
                        removeFromListFunc={value.removeFromListFunc}
                        />
                    ))
                }
            </div>
        </ToastMessageContext.Provider>
    )
}

export default ToastMessageProvider;