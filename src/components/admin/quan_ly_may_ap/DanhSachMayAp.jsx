import { Fragment, useState } from "react";

import TableBase from '../../base/TableBase';
import ThemMayAp from "./ThemMayAp";
import XemMayAp from "./XemMayAp";
import SuaMayAp from "./SuaMayAp";

function DanhSachMayAp() {
    //demo data
    const urlFetch = "https://dummyjson.com/products";
    const urlDelete = "https://dummyjson.com/products/";
    const title = "Máy ấp";
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

    const [modalType, setModalType] = useState(null);
    const [reloadKey, setReloadKey] = useState(false);
    const reloadTable = () => {
        setModalType(null);
        setReloadKey(!reloadKey);
    }

    const openModalTypeFunc = (value) => {
        switch (value.type) {
            case "add":
                setModalType(<ThemMayAp reloadTableFunc={reloadTable} />)
                break;
            case "edit":
                setModalType(<SuaMayAp wId={value.wId} reloadTableFunc={reloadTable} />)
                break;
            case "view":
                setModalType(<XemMayAp wId={value.wId} />)
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

export default DanhSachMayAp;