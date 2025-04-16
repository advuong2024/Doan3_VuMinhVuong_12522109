export const EventService = {
    getdichvu() {
        return fetch('http://localhost:3000/dichvus', { 
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
            console.error("Lỗi khi lấy dữ liệu dịch vụ:", error);
            return [];
        });
    },
    postdichvu(dichvu, file){
        const formData = new FormData();

        formData.append('ten_event', dichvu.ten_event);
        formData.append('mo_ta', dichvu.mo_ta);
        formData.append('gia', dichvu.gia);

        if (file) {
            formData.append('anh_event', file);
        }
        return fetch('http://localhost:3000/dichvus', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(dichvu)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json(); // Trả về dữ liệu phản hồi từ server
        })
        .then((data) => {
            console.log("Thêm dịch vụ thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi thêm dịch vụ:", error);
            return null;
        });
    },
    putdichvu(id, dichvu, file){
        const formData = new FormData();
        formData.append('ten_event', dichvu.ten_event);
        formData.append('mo_ta', dichvu.mo_ta);
        formData.append('gia', dichvu.gia);

        if (file) {
            formData.append('anh_event', file);
        }
        return fetch(`http://localhost:3000/dichvus/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(dichvu)
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
            console.log("Cập nhập dịch vụ thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhập dịch vụ:", error);
            return null;
        });
    },
    deletedichvu(id, dichvu) {
        return fetch(`http://localhost:3000/dichvus/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(dichvu)
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
            console.log("Xóa dịch vụ thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi xóa dịch vụ:", error);
            return null;
        });
    },
    getImageUrl: (imageName) => {
        if (imageName) {
            return `http://localhost:3000/uploads/${imageName}`;
        }
        return null;
    },
};
export default EventService;
