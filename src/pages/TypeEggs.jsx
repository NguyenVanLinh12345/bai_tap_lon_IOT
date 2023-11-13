import { Fragment } from "react";

import Header from "../components/Header";
import DanhSachLoaiTrung from "../components/admin/quan_ly_loai_trung/DanhSachLoaitrung";

function TypeEggs() {
    return (
        <Fragment>
            <Header />
            <DanhSachLoaiTrung />
        </Fragment>
    )
}

export default TypeEggs;