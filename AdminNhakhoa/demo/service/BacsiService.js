export const BacsiService = {
    getbacsi() {
        const token = localStorage.getItem("token");

        return fetch('http://localhost:3000/bacsis', { 
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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
            // console.log("Lấy danh sách bác sĩ thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi lấy danh sách bác sĩ:", error);
            return null;
        });
    },
    login(taikhoan,matkhau){
        return fetch('http://localhost:3000/auth/login', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } ,
            body: JSON.stringify({taikhoan, matkhau})
        })
        .then((res) => res.json())
        .then((data) => data);
    },
    postbacsi(bacsi){
        return fetch('http://localhost:3000/bacsis', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(bacsi)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json(); // Trả về dữ liệu phản hồi từ server
        })
        .then((data) => {
            console.log("Thêm khách hàng thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi thêm khách hàng:", error);
            return null;
        });
    },
    putbacsi(id, bacsi){
        return fetch(`http://localhost:3000/bacsis/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(bacsi)
        })
        .then(async(res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            const text = await res.text(); 
            try {
                return JSON.parse(text); // Chuyển về JSON nếu có thể
            } catch (error) {
                console.warn("Phản hồi không phải JSON:", text);
                return text; // Nếu không phải JSON, trả về nội dung gốc
            }
        })
        .then((data) => {
            console.log("Cập nhập khách hàng thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhập khách hàng:", error);
            return null;
        });
    },
    deletebacsi(id, bacsi) {
        return fetch(`http://localhost:3000/bacsis/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(bacsi)
        })
        .then(async(res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            const text = await res.text(); 
            try {
                return JSON.parse(text); // Chuyển về JSON nếu có thể
            } catch (error) {
                console.warn("Phản hồi không phải JSON:", text);
                return text; // Nếu không phải JSON, trả về nội dung gốc
            }
        })
        .then((data) => {
            console.log("Xóa khách hàng thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi xóa khách hàng:", error);
            return null;
        });
    },
};

export default BacsiService;