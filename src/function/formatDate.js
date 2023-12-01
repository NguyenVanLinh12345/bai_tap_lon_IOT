function formatDateForView(myDate) {
    myDate = new Date(myDate);
    const day = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();

    return `Ngày ${day} tháng ${month} năm ${year}`;
}
function formatDateForInput(myDate){
    let day = myDate.getDate();
    let month = myDate.getMonth() + 1;
    let year = myDate.getFullYear();

    // Đảm bảo rằng tháng và ngày có độ dài 2 ký tự bằng cách thêm số 0 phía trước nếu cần
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    // Tạo chuỗi có định dạng YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}
export {formatDateForView, formatDateForInput};