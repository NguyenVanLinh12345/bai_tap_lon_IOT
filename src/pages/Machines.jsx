import { Fragment } from "react";

import Header from '../components/base/header/Header';
import DanhSachMayAp from "../components/admin/quan_ly_may_ap/DanhSachMayAp";

function Machines() {
    return (
        <Fragment>
            <Header />
            <DanhSachMayAp />
        </Fragment>
    )
}

export default Machines;