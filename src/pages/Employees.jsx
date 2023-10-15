import { Fragment } from "react";
import Header from "../components/Header";
import TableBase from "../components/base/TableBase"

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
    const createComponent = <div>Đây là component tạo mới</div>
    const editComponent = <div>Đây là component sửa</div>
    const viewComponent = <div>Đây là component xem</div>
    return (
        <Fragment>
            <Header />
            <TableBase
                colums={colums}
                title={title}
                urlFetch={urlFetch}
                urlDelete={urlDelete}
                createComponent={createComponent}
                editComponent={editComponent}
                viewComponent={viewComponent}
            />
        </Fragment>
    )
}

export default Employees;