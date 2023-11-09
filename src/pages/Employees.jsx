import { Fragment } from "react";
import Header from "../components/Header";
import DanhSachNhanVien from "../components/admin/quan_ly_nhan_vien/DanhSachNhanVien";

function Employees() {


    return (
        <Fragment>
            <Header />
            <DanhSachNhanVien />
        </Fragment>
    )
}

export default Employees;