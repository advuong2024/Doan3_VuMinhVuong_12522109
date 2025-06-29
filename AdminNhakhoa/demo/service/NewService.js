export const NewService = {
    gettintuc() {
        return fetch('http://localhost:3000/tintucs', { 
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
            console.error("Lỗi khi lấy dữ liệu tin tức:", error);
            return [];
        });
    },
    gettintucbyid(id) {
        return fetch(`http://localhost:3000/tintucs/${id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json(); // Trả về dữ liệu phản hồi từ server
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi lấy tin tức:", error);
            return null;
        });
    },
    posttintuc(tintuc, file){
        const formData = new FormData();

        formData.append('tieu_de', tintuc.tieu_de);
        formData.append('noi_dung', tintuc.noi_dung);
        formData.append('ngay_dang', tintuc.ngay_dang);
        formData.append('tac_gia', tintuc.tac_gia);
        formData.append('loai_tin', tintuc.loai_tin);
        formData.append('trang_thai', tintuc.trang_thai);
        if (file) {
            formData.append('anh_tin_tuc', file);
        }
        return fetch('http://localhost:3000/tintucs', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(tintuc)
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.json(); // Trả về dữ liệu phản hồi từ server
        })
        .then((data) => {
            console.log("Thêm tin tức thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi thêm tin tức:", error);
            return null;
        });
    },
    puttintuc(id, tintuc, file){
        const formData = new FormData();

        formData.append('tieu_de', tintuc.tieu_de);
        formData.append('noi_dung', tintuc.noi_dung);
        formData.append('ngay_dang', tintuc.ngay_dang);
        formData.append('tac_gia', tintuc.tac_gia);
        formData.append('loai_tin', tintuc.loai_tin);
        formData.append('trang_thai', tintuc.trang_thai);
        if (file) {
            formData.append('anh_tin_tuc', file);
        }
        return fetch(`http://localhost:3000/tintucs/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(tintuc)
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
            console.log("Cập nhập tin tức thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi cập nhập tin tức:", error);
            return null;
        });
    },
    deletetintuc(id, tintuc) {
        return fetch(`http://localhost:3000/tintucs/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-cache'},
            body: JSON.stringify(tintuc)
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
            console.log("Xóa tin tức thành công:", data);
            return data;
        })
        .catch((error) => {
            console.error("Lỗi khi xóa tin tức:", error);
            return null;
        });
    },
    getImageUrl: (imageName) => {
        if (imageName) {
            return `http://localhost:3000/uploads/${imageName}`;
        }
        return null;
    },
    uploadImage(formData) {
        // const formData = new FormData();
        // formData.append('image', file);
        return fetch('http://localhost:3000/image/uploadImage', {
          method: 'POST',
          body: formData,
        })
        .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            try {
              const errorData = JSON.parse(text);
              throw new Error(
                `Lỗi: ${res.status} ${res.statusText} - ${
                  errorData.message || text || "Không xác định"
                }`
              );
            } catch {
              throw new Error(`Lỗi: ${res.status} ${res.statusText} - ${text}`);
            }
          });
        }
        return res.json();
      })
      .then((data) => {
        let url, message;
        if (typeof data === "string") {
          // Nếu server trả về chuỗi URL
          url = data;
          message = "Upload thành công";
        } else {
          // Nếu server trả về object
          url = data.url ? `http://localhost:3000${data.url}` : null;
          message = data.message || "Upload thành công";
        }
        if (!url) {
          throw new Error("Không nhận được URL ảnh từ server");
        }
        console.log("Upload ảnh thành công, URL:", url);
        return { message, url };
      })
      .catch((error) => {
        console.error("Lỗi khi upload ảnh:", error);
        throw error;
      });
    },
};

export default NewService;