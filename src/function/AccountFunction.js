function login(email, password, callback) {
    // Gửi yêu cầu đăng nhập đến API
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