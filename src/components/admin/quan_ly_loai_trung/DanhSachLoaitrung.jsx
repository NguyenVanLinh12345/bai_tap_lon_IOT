import { Fragment, useState } from "react";

import TableBase from '../../base/table/TableBase';
import ThemLoaiTrung from "./ThemLoaiTrung";
import XemLoaiTrung from "./XemLoaiTrung";
import SuaLoaiTrung from "./SuaLoaiTrung";
import api from "../../../config/api";

function DanhSachLoaiTrung() {
    //demo data
    const urlFetch = api.getListTypeEgg;
    const urlDelete = api.deleteTypeEgg;
    const title = "Loại trứng";
    const colums = [
        {
            title: "Tên trứng",
            dataIndex: "name",
            width: "35%",
        },
        {
            title: "Nhiệt độ",
            dataIndex: "temperature",
            width: "15%",
        },
        {
            title: "Độ ẩm",
            dataIndex: "humidity",
            width: "15%",
        },
        {
            title: "Số ngày ấp",
            dataIndex: "numberHatch",
            width: "20%",
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
                setModalType(<ThemLoaiTrung reloadTableFunc={reloadTable} />)
                break;
            case "edit":
                setModalType(<SuaLoaiTrung wId={value.wId} reloadTableFunc={reloadTable} />)
                break;
            case "view":
                setModalType(<XemLoaiTrung wId={value.wId} />)
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

export default DanhSachLoaiTrung;