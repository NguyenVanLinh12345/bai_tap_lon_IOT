import { Fragment, useContext } from "react";

import Header from "../components/Header";
// import ToastMessageProvider from "../components/base/toast_message/ToastMessageProvider";
import ToastMessageContext from "../components/base/toast_message/ToastMessageContext";

function Home() {
    const showToast = useContext(ToastMessageContext);

    return (
        <Fragment>
            <Header />
            {/* <ToastMessageProvider /> */}
            <button onClick={()=> showToast("Thành Công", "Đăng nhập thành công", "success")}>Thành Công</button>
            <button onClick={()=> showToast("Lỗi", "Xuất hiện lỗi ở vị trí...", "error")}>Lỗi</button>
            <button onClick={()=> showToast("Cảnh Báo", "Lò ấp trứng sắp nở", "warn")}>Cảnh báo</button>
            <button onClick={()=> showToast("Không xác định", "Lỗi không xác định", "non detector")}>Không xác định</button>
        </Fragment>
    )
}

export default Home;