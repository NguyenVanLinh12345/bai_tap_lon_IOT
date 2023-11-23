import api from "../config/api";

function login(email, password, callback, showToast) {
    // Gửi yêu cầu đăng nhập đến API
    if (email !== null && email !== "" & password !== null & password !== "") {
        fetch(api.baseAPI + api.login, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Sai mật khẩu hoặc email");
                }
                return response.text();
            })
            .then((data) => {
                localStorage.setItem("token", data);
                showToast("Đăng nhập", "Đăng nhập thành công", "success");
                callback();
                setTimeout(()=>{
                    localStorage.removeItem("token");
                    window.location.reload();
                },30 * 60 * 1000)
                window.location.reload();
            })
            .catch((error) => {
                // console.log(Object.keys(error));
                showToast("Đăng nhập không thành công", error.message, "error");
            });
    }
    else{
        showToast("Cảnh báo", "Vui lòng điền đầy đủ thông tin đăng nhập", 'warn');
    }
}

function logout(callback) {
    localStorage.removeItem("token");
    callback();
    window.location.reload();
}

export { login, logout };


// fetch("http://localhost:8080/api/login", {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     email: email,
//                     password: pass
//                 })
//             })
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error("Sai mat khau hoac email");
//                     }
//                     return response.text();
//                 })
//                 .then((data) => {
//                     document.querySelector("#token").value = data;
//                 })
//                 .catch((error) => alert(error.message));


// fetch("http://localhost:8080/api/welcome", {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 }
//             })
//                 .then((response) => response.text())
//                 .then((data) => console.log(data))
//                 .catch((error) => console.error(error))