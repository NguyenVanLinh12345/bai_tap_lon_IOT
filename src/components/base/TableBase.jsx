import { useContext, useEffect, useState } from 'react';
import style from './TableBase.module.scss';

import Container from './Container';

import Context from '../../myContext/Context';
import TableLineBase from './TableLineBase';
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
                                <TableLineBase
                                colums={colums}
                                row={value}
                                key={rowIndex}
                                editComponent={editComponent}
                                viewComponent={viewComponent}
                                setModalType={setModalType}
                                urlDelete={urlDelete}
                                />
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