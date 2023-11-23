import { Fragment, useEffect } from 'react';
import { useContext } from 'react';

import style from './Loading.module.scss';

import Context from '../../../myContext/Context';

function Loading() {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch({type: "un-loading", payload: null})
        }, 10000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [])
    return (
        <Fragment>
            {
                state.loading
                    ?
                    <div className={style.Loading}>
                        <div className={style.loader}></div>
                    </div>
                    :
                    null
            }
        </Fragment>
    )
}

export default Loading;