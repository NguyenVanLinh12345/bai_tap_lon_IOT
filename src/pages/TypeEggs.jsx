import { Fragment } from "react";

import Header from '../components/base/header/Header';
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