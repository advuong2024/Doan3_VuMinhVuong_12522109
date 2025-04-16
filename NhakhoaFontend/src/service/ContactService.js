export const ContactService = {
    getdichvu(){
        return fetch('http://localhost:3000/dichvus', { 
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache' 
            } 
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then((data) => {
            // console.log("Lấy danh sách dịch vụ thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi lấy danh sách dịch vụ:", error);
            return null;
        });
    },
    postdatlich(datlich) {
        return fetch('http://localhost:3000/datlichs', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify(datlich)
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Thêm lịch hẹn thành công: ", data)
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi thêm lịch hẹn: ", error)
            return null;
        })
    },
    postkhachhang(khachhang) {
        return fetch('http://localhost:3000/benhnhans', {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body : JSON.stringify(khachhang)
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Thêm khách hàng thành công: ", data)
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi thêm khách hàng: ", error)
            return null;
        })
    },
};

export default ContactService;