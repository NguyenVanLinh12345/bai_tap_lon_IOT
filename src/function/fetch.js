import api from '../config/api';

async function fetchData(subUrl, method, data) {
  const headers = {
    "Content-Type": "application/json",
    "Authentication": "Bearer " + (localStorage.getItem("token") ? localStorage.getItem("token") : "")
  };

  const requestOptions = {
    method: method,
    headers: headers,
  };

  if (method !== "GET") {
    requestOptions.body = JSON.stringify(data);
  }

  return fetch(api.baseAPI + subUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error("Có lỗi trong việc nhận dữ liệu");
      }
      return response;
    })
}

export default fetchData;