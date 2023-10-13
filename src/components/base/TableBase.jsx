import style from './TableBase.module.scss';
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

// https://dummyjson.com/products
function TableBase() {
    const colums = [
        {
            title: "Tên",
            dataIndex: "ten",
            width: "35%",
        },
        {
            title: "Tuổi",
            dataIndex: "tuoi",
            width: "35%",
        },
        {
            title: "Giới tính",
            dataIndex: "gioiTinh",
            width: "15%",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            width: "15%",
        }
    ];

    const data = [
        {
            ten: "Nguyen Van A",
            tuoi: 20,
            gioiTinh: "Nam"
        },
        {
            ten: "Nguyen Van B",
            tuoi: 18,
            gioiTinh: "Nam"
        },
        {
            ten: "Nguyen Van C",
            tuoi: 18,
            gioiTinh: "Nam"
        }
    ];
    return (
        <div className={style.TableBase}>
            <div className={style.table}>
                <table>
                    <thead>
                        <tr>{colums.map((value, index) => (<th key={index} style={{ width: value.width }}>{value.title}</th>))}</tr>
                    </thead>

                    <tbody>
                        {
                            data.map((value, rowIndex) => (
                                <tr key={rowIndex}>
                                    {
                                        colums.map((colum, columIndex) => (
                                            colum.dataIndex !== "action" ? <td key={columIndex}>{value[colum.dataIndex]}</td> : ""
                                        ))
                                    }
                                    <td>
                                        <span title='Xem' className={`${style.action_icon} ${style.blue}`}><AiFillEye /></span>
                                        <span title='Sửa' className={`${style.action_icon} ${style.green}`}><AiFillEdit /></span>
                                        <span title='Xóa' className={`${style.action_icon} ${style.red}`}><AiFillDelete /></span>
                                    </td>
                                </tr>
                            ))
                        }
                        
                        {/* <tr>
                            <td>Nguyễn Văn A</td>
                            <td>18</td>
                            <td>Nam</td>
                            <td style={{ width: "15%" }}>
                                <span title='Xem' className={`${style.action_icon} ${style.blue}`}><AiFillEye /></span>
                                <span title='Sửa' className={`${style.action_icon} ${style.green}`}><AiFillEdit /></span>
                                <span title='Xóa' className={`${style.action_icon} ${style.red}`}><AiFillDelete /></span>
                            </td>
                        </tr> */}
                    </tbody>

                </table>
            </div>
        </div>
    )
}
export default TableBase;