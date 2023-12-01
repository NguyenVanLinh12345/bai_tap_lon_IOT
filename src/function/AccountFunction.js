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
                return response.json();
            })
            .then((data) => {
                sessionStorage.setItem("token", data.token);
                sessionStorage.setItem("role", data.role);
                showToast("Đăng nhập", "Đăng nhập thành công", "success");
                callback();
                window.location.reload();
            })
            .catch((error) => {
                // console.log(Object.keys(error));
                showToast("Đăng nhập không thành công", error.message, "error");
            });
    }
    else {
        showToast("Cảnh báo", "Vui lòng điền đầy đủ thông tin đăng nhập", 'warn');
    }
}

function logout(callback) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("role");
    callback();
    window.location.reload();
}

function getRole() {
    if (sessionStorage.getItem("role")) {
        return sessionStorage.getItem("role");
    }
    return null;
};

function checkHaveToken() {
    if (sessionStorage.getItem("token")) {
        return true;
    }
    return false;
};

function getToken() {
    if (sessionStorage.getItem("token")) {
        return sessionStorage.getItem("token");
    }
    return null;
}

export { login, logout, getRole, checkHaveToken, getToken };