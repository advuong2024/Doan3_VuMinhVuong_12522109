export const ThongkeService = {
    gethoadonCount() {
        return fetch('http://localhost:3000/thongkes/hoadonCount', { 
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
            console.error("Lỗi khi lấy số lượng hóa đơn:", error);
            return [];
        });
    },
    getRevenue() {
        return fetch('http://localhost:3000/thongkes/revenue', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.status === 204 ? null : res.json();
        })
        .then((data) => data || [])
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu:", error);
            return [];
        })
    },
    getBooking() {
        return fetch('http://localhost:3000/thongkes/bookings', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.status === 204 ? null : res.json();
        })
        .then((data) => data || [])
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu:", error);
            return [];
        })
    },
    getChart(filterType, startDate, endDate) {
        const params = new URLSearchParams({
            filterType,
            startDate,
            endDate,
        });
        return fetch(`http://localhost:3000/thongkes/chart?${params.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
        })
        .then((res) => {
            if(!res.ok) {
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
            return res.status === 204 ? null : res.json();
        })
        .then((data) => data || [])
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu:", error);
            return [];
        })
    },
    getchartMonth(){
        return fetch(`http://localhost:3000/thongkes/chart?filterType=thang`, {
            method: 'GET',
            headers: { 'Content-Type' : 'application/json', 'Cache-Control' : 'no-cache' }
        })
        .then((res) => {
            if(!res.ok){
                throw new Error(`Lỗi: ${res.status} ${res.statusText}`);
            }
        })
        .then((data) => data || [])
        .catch((error) => {
            console.error("Lỗi khi lấy dữ liệu:", error);
            return [];
        })
    },
};

export default ThongkeService;