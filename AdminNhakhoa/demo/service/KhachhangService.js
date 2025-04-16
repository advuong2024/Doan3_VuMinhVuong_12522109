export const KhachhangService = {
    getKhachhang() {
        return fetch('http://localhost:3000/benhnhans', { 
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
            // mode: 'cors'
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.status === 204 ? null : res.json(); // Tránh lỗi khi API trả về 204
        })
        .then((data) => data || []) // Trả về mảng rỗng nếu không có dữ liệu
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
            return [];
        });
    },
    postkhachhang(khachhang){
        return fetch('http://localhost:3000/benhnhans', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(khachhang)
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
    putkhachhang(id, khachhang){
        return fetch(`http://localhost:3000/benhnhans/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(khachhang)
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
    deletekhachhang(id, khachhang) {
        return fetch(`http://localhost:3000/benhnhans/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(khachhang)
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

export default KhachhangService;