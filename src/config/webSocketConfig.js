function webSocketConfig() {
    var ws = new WebSocket("ws://localhost:8000/nhom_21_iot");
    // ws.onopen = () => ws.send("Connected");
    // const onmeaage = () => {
    //     ws.onmessage = (event) => {
    //         console.log("WebSocket message received:", event);
    //     };
    // };
    // onmeaage();

    const mySocket = {
        onOpen: function (actionFunc) {
            actionFunc();
        },
        onMessage: function (actionFunc) {
            ws.onmessage = (value)=>{
                actionFunc(value);
            };
        },
        send: function (value) {
            ws.send(value);
        },
        close: function () {
            ws.close();
        }
    }
    return mySocket;
}

export default webSocketConfig;