import { getRole } from "../function/AccountFunction";

function getHeaderNav() {
    const header_admin = [
        {
            id: 1,
            link: "/employee",
            title: "Danh sách nhân viên"
        },
        {
            id: 2,
            link: "/machine",
            title: "Danh sách máy ấp"
        },
        {
            id: 3,
            link: "/type-egg",
            title: "Danh sách loại trứng"
        }
    ];
    const header_employee = [
        {
            id: 4,
            link: "/employee-machine",
            title: "Danh sách máy ấp"
        }
    ];

    if(getRole() === "ADMIN"){
        return header_admin;
    }
    return header_employee;
}

export default getHeaderNav;