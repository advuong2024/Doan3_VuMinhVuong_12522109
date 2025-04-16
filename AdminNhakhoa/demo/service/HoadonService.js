export const HoadonService = {
    gethoadon() {
        return fetch('http://localhost:3000/hoadons', {
            method: 'GET',
            headers: {'context-Type' : 'application/json', 'Cache-Control' : 'no-cache' }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.status === 204 ? null : res.json(); // Tránh lỗi khi API trả về 204
        })
        .then((data) => data || []) // Trả về mảng rỗng nếu không có dữ liệu
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
            return [];
        }); 
    },
    getByMaHD(id, chitietHD){
        return fetch(`http://localhost:3000/chitiethoadons/MaHD/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(chitietHD)
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
        .then((data) => data || []) // Trả về mảng rỗng nếu không có dữ liệu
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu chi tiết hóa đơn:", error);
            return [];
        });
    },
    updateStatus(id){
        return fetch(`http://localhost:3000/hoadons/status/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
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
        .then((data) => data || []) // Trả về mảng rỗng nếu không có dữ liệu
        .catch((error) => {
            console.error("Lỗi khi cập nhập trạng thái hóa đơn:", error);
            return [];
        });
    },
    getchitietHD(){
        return fetch('http://localhost:3000/chitiethoadons', {
            method: 'GET',
            headers: {'context-Type' : 'application/json', 'Cache-Control' : 'no-cache' }
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.status === 204 ? null : res.json(); // Tránh lỗi khi API trả về 204
        })
        .then((data) => data || []) // Trả về mảng rỗng nếu không có dữ liệu
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu chi tiết hóa đơn:", error);
            return [];
        });
    },
    posthoadon(hoadon){
        return fetch('http://localhost:3000/hoadons', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(hoadon)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json(); // Trả về dữ liệu phản hồi từ server
        })
        .then((data) => {
            console.log("Thêm hóa đơn thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi thêm hóa đơn:", error);
            return null;
        });
    },
    poschitietHD(chitietHD){
        return fetch('http://localhost:3000/chitiethoadons', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(chitietHD)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json(); // Trả về dữ liệu phản hồi từ server
        })
        .then((data) => {
            console.log("Thêm chi tiết hóa đơn thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi thêm chi tiết hóa đơn:", error);
            return null;
        });
    },
    puthoadon(id, hoadon){
        return fetch(`http://localhost:3000/hoadons/${id}`, {
            method: 'PUT',
            headers: {'content-Type': 'application/json', 'cache-Control': 'no-cache'},
            body: JSON.stringify(hoadon)
        })
        .then(async(res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch (error) {
                console.warn("Phản hồi không phải JSON:", text);
                return text;
            }
        })
        .then((data) => {
            console.log("Cập nhập hóa đơn thành công:", data);
            return data;
        })
        .catch((error) =>{
            console.error("Lỗi khi cập nhập hóa đơn: ", error);
            return null;
        });
    },
    deleteChitietHD(id, hoadon){
        return fetch(`http://localhost:3000/chitiethoadons/${id}`, {
            method: 'DELETE',
            headers: {'content-Type': 'application/json', 'cache-Control': 'no-cache'},
            body: JSON.stringify(hoadon)
        })
        .then(async(res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch (error) {
                console.warn("Phản hồi không phải JSON:", text);
                return text;
            }
        })
        .then((data) => {
            console.log("xóa chi tiết hóa đơn thành công:", data);
            return data;
        })
        .catch((error) =>{
            console.error("Lỗi khi xóa chi tiết hóa đơn: ", error);
            return null;
        });
    },
    deleteHoadon(id, hoadon){
        return fetch(`http://localhost:3000/hoadons/${id}`, {
            method: 'DELETE',
            headers: {'content-Type': 'application/json', 'cache-Control': 'no-cache'},
            body: JSON.stringify(hoadon)
        })
        .then(async(res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            const text = await res.text();
            try {
                return JSON.parse(text);
            } catch (error) {
                console.warn("Phản hồi không phải JSON:", text);
                return text;
            }
        })
        .then((data) => {
            console.log("xóa hóa đơn thành công:", data);
            return data;
        })
        .catch((error) =>{
            console.error("Lỗi khi xóa hóa đơn: ", error);
            return null;
        });
    },
};

export default HoadonService;