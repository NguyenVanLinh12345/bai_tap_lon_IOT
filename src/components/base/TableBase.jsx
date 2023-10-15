import { useContext, useEffect, useState } from 'react';
import style from './TableBase.module.scss';
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

import Container from './Container';

import Context from '../../myContext/Context';
function TableBase({ title = "Tiêu đề trống", colums = [], createComponent = null, editComponent = null, viewComponent = null, urlDelete = "", urlFetch = ""}) {
    const [state, dispatch] = useContext(Context);
    const [modalType, setModalType] = useState(null);
    const [data, setData] = useState([]);

    const loadTableData = () => {
        dispatch({ type: "loading", payload: null });
        fetch(urlFetch)
            .then((response) => response.json())
            .then((data) => {
                setData(data.products);
                dispatch({ type: "un-loading", payload: null });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const deleteRow = (myId) => {
        const result = window.confirm(`Bạn muốn xóa hàng ${myId}`);
        if (result) {
            fetch(urlDelete + myId)
                .then((response) => response.json())
                .then((data) => {
                    alert("Xóa thành công " + data.id);
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    useEffect(() => {
        loadTableData();
    }, [])
    return (
        <div className={style.TableBase}>
            <div className={style.header_container}>
                <span className={style.list_name}>Danh sách {title}</span>
                <button onClick={()=>setModalType(createComponent)}>Thêm {title}</button>
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
                                        <span title='Xem' onClick={()=>setModalType(viewComponent)} className={`${style.action_icon} ${style.blue}`}><AiFillEye /></span>
                                        <span title='Sửa' onClick={()=>setModalType(editComponent)} className={`${style.action_icon} ${style.green}`}><AiFillEdit /></span>
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
                    < Container title={"Danh sách nhân viên"} closeContainer={()=>setModalType(null)}>
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