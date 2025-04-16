export const DatlichService = {
    getDatlich() {
        return fetch('http://localhost:3000/datlichs', { 
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
            console.error("Lỗi khi lấy dữ liệu dặt lịch:", error);
            return [];
        });
    },
    getToday(){
        return fetch('http://localhost:3000/datlichs/Today', { 
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
        .then((data) => data || [])
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu dặt lịch:", error);
            return [];
        });
    },
    // postdatlich(datlich){
    //     return fetch('http://localhost:3000/datlichs', {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
    //         body: JSON.stringify(datlich)
    //     })
    //     .then((res) => {
    //         if (!res.ok) {
    //             throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
    //         }
    //         return res.json(); // Trả về dữ liệu phản hồi từ server
    //     })
    //     .then((data) => {
    //         console.log("Thêm đặt lịch thành công:", data);
    //         return data;
    //     })
    //     .catch((error) => {
    //         console.error("Lỗi khi đặt lịch hàng:", error);
    //         return null;
    //     });
    // },
    putdatlich(id, datlich){
        return fetch(`http://localhost:3000/datlichs/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(datlich)
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
            console.log("Cập nhập đặt lịch thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhập đặt lịch:", error);
            return null;
        });
    },
    deletedatlich(id, datlich) {
        return fetch(`http://localhost:3000/datlichs/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(datlich)
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
            console.log("Xóa đặt lịch thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi xóa đặt lịch:", error);
            return null;
        });
    },
};

export default DatlichService;