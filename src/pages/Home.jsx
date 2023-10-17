import { Fragment } from "react";

import Header from "../components/Header";
import ToastMessageProvider from "../components/base/toast_message/ToastMessageProvider";

function Home() {

    return (
        <Fragment>
            <Header />
            <ToastMessageProvider />
        </Fragment>
    )
}

export default Home;