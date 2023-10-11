function login(email, password, callback) {
    // Gửi yêu cầu đăng nhập đến API
    console.log("email: " + email);
    console.log("password: " + password);
    if (email !== null && email !== "" & password !== null & password !== "") {
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem("token", JSON.stringify(data));
                callback();
            })
            .catch((error) => {
                console.error("Đăng nhập không thành công: " + error);
            });
    }
}

function logout(callback) {
    localStorage.removeItem("token");
    callback();
    console.log("logout");
}

export { login, logout };