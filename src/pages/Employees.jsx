import { Fragment } from "react";
import Header from "../components/Header";
import TableBase from "../components/base/TableBase";

import ThemNhanVien from "../components/admin/quan_ly_nhan_vien/ThemNhanVien";
import XemNhanVien from "../components/admin/quan_ly_nhan_vien/XemNhanVien";
import SuaNhanVien from "../components/admin/quan_ly_nhan_vien/SuaNhanVien";

function Employees() {
    //demo data
    const urlFetch = "https://dummyjson.com/products";
    const urlDelete = "https://dummyjson.com/products/";
    const title = "Nhân viên";
    const colums = [
        {
            title: "Title",
            dataIndex: "title",
            width: "35%",
        },
        {
            title: "Description",
            dataIndex: "description",
            width: "35%",
        },
        {
            title: "Brand",
            dataIndex: "brand",
            width: "15%",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            width: "15%",
        }
    ];

    return (
        <Fragment>
            <Header />
            <TableBase
                colums={colums}
                title={title}
                urlFetch={urlFetch}
                urlDelete={urlDelete}
                createComponent={<ThemNhanVien />}
                editComponent={<SuaNhanVien />}
                viewComponent={<XemNhanVien />}
            />
        </Fragment>
    )
}

export default Employees;