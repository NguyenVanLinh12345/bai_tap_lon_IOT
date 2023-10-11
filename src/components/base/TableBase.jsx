import style from './TableBase.module.scss';
import { AiFillEye, AiFillEdit, AiFillDelete } from "react-icons/ai";

function TableBase() {

    return (
        <div className={style.TableBase}>
            <div className={style.table}>
                <table>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Tuổi</th>
                            <th>Giới tính</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>18</td>
                            <td>Nam</td>
                            <td style={{width: "15%"}}>
                                <span title='Xem' className={`${style.action_icon} ${style.blue}`}><AiFillEye /></span>
                                <span title='Sửa' className={`${style.action_icon} ${style.green}`}><AiFillEdit /></span>
                                <span title='Xóa' className={`${style.action_icon} ${style.red}`}><AiFillDelete /></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>18</td>
                            <td>Nam</td>
                            <td style={{width: "15%"}}>
                                <span title='Xem' className={`${style.action_icon} ${style.blue}`}><AiFillEye /></span>
                                <span title='Sửa' className={`${style.action_icon} ${style.green}`}><AiFillEdit /></span>
                                <span title='Xóa' className={`${style.action_icon} ${style.red}`}><AiFillDelete /></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Nguyễn Văn A</td>
                            <td>18</td>
                            <td>Nam</td>
                            <td style={{width: "15%"}}>
                                <span title='Xem' className={`${style.action_icon} ${style.blue}`}><AiFillEye /></span>
                                <span title='Sửa' className={`${style.action_icon} ${style.green}`}><AiFillEdit /></span>
                                <span title='Xóa' className={`${style.action_icon} ${style.red}`}><AiFillDelete /></span>
                            </td>
                        </tr>
                    </tbody>
                    
                </table>
            </div>
        </div>
    )
}
export default TableBase;