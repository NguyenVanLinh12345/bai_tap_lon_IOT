import { useContext, useEffect, useState } from 'react';
import style from './TableBase.module.scss';

import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

import Container from '../container/Container';
import Context from '../../../myContext/Context';
import ToastMessageContext from '../toast_message/ToastMessageContext';

import fetchData from '../../../function/fetch';

function TableBase({ title = "Tiêu đề trống", colums = [], urlFetch = "", urlDelete, modalType, openModalTypeFunc, closeModalTypeFunc, reloadKey}) {
    const [state, dispatch] = useContext(Context);
    const [data, setData] = useState([]);
    const showToast = useContext(ToastMessageContext);
    const [keyDelete, setKeyDeleteReload] = useState(false); 

    const deleteRow = (myId) => {
        const result = window.confirm(`Bạn muốn xóa thông tin có id=${myId}`);
        if (result) {
            fetchData({subUrl: urlDelete + myId, method: "DELETE"})
                // .then((response) => response.json())
                .then((data) => {
                    // console.log("Day la trong table base")
                    // console.log(data);
                    showToast("Đã xóa", "Xóa đối tượng thành công", "success");
                    setKeyDeleteReload(!keyDelete);
                })
                .catch((error) => {
                    showToast("Xóa không thành công", error.message, "error");
                })
        }
    }

    const loadTableData = () => {
        dispatch({ type: "loading", payload: null });
        fetchData({subUrl: urlFetch, method: "GET"})
        .then((response) => response.json())
        .then((data) => {
                setData(data);
                dispatch({ type: "un-loading", payload: null });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        loadTableData();
    }, [reloadKey, keyDelete])

    return (
        <div className={style.TableBase}>
            <div className={style.header_container}>
                <span className={style.list_name}>Danh sách {title}</span>
                <button onClick={() => openModalTypeFunc({type: "add", wId: null})}>Thêm {title}</button>
            </div>
            <table>
                <thead>
                    <tr>{colums.map((value, index) => (<th key={index} style={{ width: value.width }}>{value.title}</th>))}</tr>
                </thead>

                <tbody>
                    {
                        data.length === 0
                            ?
                            <tr className={style.no_data_table}>
                                <td colSpan={colums.length}>
                                    Không có dữ liệu
                                </td>
                            </tr>
                            :
                            data.map((value, rowIndex) => (
                                <tr key={rowIndex}>
                                    {
                                        colums.map((colum, columIndex) => (
                                            colum.dataIndex !== "action" ? <td key={columIndex}>{value[colum.dataIndex]}</td> : ""
                                        ))
                                    }
                                    <td>
                                        <span
                                            title='Xem'
                                            onClick={() => {
                                                openModalTypeFunc({type: "view", wId: value.id});
                                            }}
                                            className={`${style.action_icon} ${style.blue}`}>
                                            <AiFillEye />
                                        </span>

                                        <span
                                            title='Sửa'
                                            onClick={() => {
                                                openModalTypeFunc({type: "edit", wId: value.id});
                                            }}
                                            className={`${style.action_icon} ${style.green}`}>
                                            <AiFillEdit />
                                        </span>
                                        <span title='Xóa' onClick={() => deleteRow(value.id)} className={`${style.action_icon} ${style.red}`}><AiFillDelete /></span>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>

            {
                modalType
                    ?
                    < Container closeContainer={() => closeModalTypeFunc()}>
                        {
                            modalType
                        }
                    </ Container>
                    : null
            }

        </div >
    )
}

export default TableBase;