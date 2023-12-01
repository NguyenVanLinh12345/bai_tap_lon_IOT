import api from '../config/api';
import { getToken } from './AccountFunction';

// doi tuong nhan vao:
// value = {subUrl: "stirng", method: "string", data: Object}
async function fetchData(value) {
  // console.log(value)
  const headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + getToken()
  };

  const requestOptions = {
    method: value.method,
    headers: headers,
  };

  if (value.method !== "GET") {
    if(value.data){
      requestOptions.body = JSON.stringify(value.data);
    }
  }

  // console.log(requestOptions)
  return fetch(api.baseAPI + value.subUrl, requestOptions)
    .then(response => {
      if (!response.ok) {
        console.log(response)
        throw new Error("Có lỗi trong việc gửi/nhận dữ liệu");
      }
      return response;
    })
}

export default fetchData;