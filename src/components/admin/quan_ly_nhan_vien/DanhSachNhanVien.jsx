import { Fragment, useState } from "react";

import TableBase from '../../base/table/TableBase';
import ThemNhanVien from "./ThemNhanVien";
import XemNhanVien from "./XemNhanVien";
import SuaNhanVien from "./SuaNhanVien";

import api from "../../../config/api";

function DanhSachNhanVien() {
    //demo data
    const urlFetch = api.getListUser;
    const urlDelete = api.deleteUser;
    const title = "Nhân viên";
    const colums = [
        {
            title: "Tên nhân viên",
            dataIndex: "name",
            width: "20%",
        },
        {
            title: "Email",
            dataIndex: "email",
            width: "20%",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            width: "30%",
        },
        {
            title: "Quyền",
            dataIndex: "roles",
            width: "15%",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            width: "15%",
        }
    ];

    const [modalType, setModalType] = useState(null);
    const [reloadKey, setReloadKey] = useState(false);
    const reloadTable = () => {
        setModalType(null);
        setReloadKey(!reloadKey);
    }

    const openModalTypeFunc = (value) => {
        switch (value.type) {
            case "add":
                setModalType(<ThemNhanVien reloadTableFunc={reloadTable} />)
                break;
            case "edit":
                setModalType(<SuaNhanVien wId={value.wId} reloadTableFunc={reloadTable} />)
                break;
            case "view":
                setModalType(<XemNhanVien wId={value.wId} />)
                break;
            default:
                console.error("không phát hiện được sự kiện trong danh sách nhân viên");
        }
    }
    return (
        <Fragment>
            <TableBase
                colums={colums}
                title={title}
                urlFetch={urlFetch}
                urlDelete={urlDelete}
                modalType={modalType}
                openModalTypeFunc={openModalTypeFunc}
                closeModalTypeFunc={() => setModalType(null)}
                reloadKey={reloadKey}
            >
            </TableBase>
        </Fragment>
    )
}

export default DanhSachNhanVien;