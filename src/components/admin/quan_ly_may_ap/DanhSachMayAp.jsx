import { Fragment, useState } from "react";

import TableBase from '../../base/table/TableBase';
import ThemMayAp from "./ThemMayAp";
import XemMayAp from "./XemMayAp";
import SuaMayAp from "./SuaMayAp";

function DanhSachMayAp() {
    //demo data
    const urlFetch = "https://mocki.io/v1/e2ded413-95ce-4a00-8fc6-6a72d0610cff";
    const urlDelete = "https://dummyjson.com/products/";
    const title = "Máy ấp";
    const colums = [
        {
            title: "Tên máy ấp",
            dataIndex: "name",
            width: "35%",
        },
        {
            title: "Lần đảo trứng trước",
            dataIndex: "lastEggTurning",
            width: "35%",
        },
        {
            title: "Chu kỳ đảo trứng (giờ)",
            dataIndex: "cycle",
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