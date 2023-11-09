import style from './TableLineBase.module.scss';
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

function TableLineBase({ row, colums, viewComponent, editComponent, setModalType, urlDelete }) {
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

    return (
        <tr className={style.TableLineBase}>
            {
                colums.map((colum, columIndex) => (
                    colum.dataIndex !== "action" ? <td key={columIndex}>{row[colum.dataIndex]}</td> : ""
                ))
            }
            <td>
                <span title='Xem' onClick={() => setModalType(viewComponent)} className={`${style.action_icon} ${style.blue}`}><AiFillEye /></span>
                <span title='Sửa' onClick={() => setModalType(editComponent)} className={`${style.action_icon} ${style.green}`}><AiFillEdit /></span>
                <span title='Xóa' onClick={() => deleteRow(row.id)} className={`${style.action_icon} ${style.red}`}><AiFillDelete /></span>
            </td>
        </tr>
    )
}

export default TableLineBase;