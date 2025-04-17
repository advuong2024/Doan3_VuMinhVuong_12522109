import React from 'react';
const img = (filename) => `/assets/${filename}`;

const articles = [
    {
        id: 1,
        title: "Chi phí trông răng Implant",
        description: "Trồng răng Implant là phương pháp phục hình răng đã mất an toàn và hiệu...",
        image: 'bg1.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 2,
        title: "Chi phí làm răng sứ thẩm mỹ nha khoa Alisa Cầu giấy Hà Nội",
        description: "Dân gian có câu "+"cái răng cái tóc là góc con người"+".Ngày này, răng...",
        image: 'bg2.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 3,
        title: "Giá niềng răng tại nha khoa Alisa Cầu Giấy Hà Nội",
        description: "Giá niềng răng tại nha khoa Alisa Cầu Giấy Hà Nội...",
        image: 'niengrang2.png',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 4,
        title: "Bảng giá tẩy trắng răng Zom lazer",
        description: "Bảng giá tẩy răng của Nha Khoa Alisa Bảng giá Tẩy trắng răng Đơn...",
        image: 'lazer.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 5,
        title: "Bảng giá răng sứ thẩm mỹ mới nhất (2024)",
        description: "Cập nhập bảng giá bọc sứ trên thị trường, bảng giá bọc răng sứ tại...",
        image: 'bocrangsu.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 6,
        title: "Bảng giá nhổ răng khôn của Nha Khoa Alisa",
        description: "Chi tiết bảng giá nhổ răng khôn tại nha khoa Alisa được nhiều cô chú...",
        image: 'bg3.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 7,
        title: "Bảng giá trồng răng toàn hàm",
        description: "Hiện nay trên thị trường có nhiều mức giá trồng răng toàn hàm khác nhau...",
        image: 'anhdd5.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 8,
        title: "Bảng giá niềng răng trong suốt Invisalign",
        description: "Bảng giá niềng răng trong suốt Invisalign...",
        image: 'anhdd2.png',
        detail: (
            <div className="detail-section">
            </div>
        )
    },
    {
        id: 9,
        title: "Bảng giá niềng răng 5 Safe mắc cài",
        description: "Dưới đây là bảng giá niềng răng 5 Safe mắc cài tại Nha Khoa Alisa...",
        image: 'niengrang.jpg',
        detail: (
            <div className="detail-section">
            </div>
        )
    }
];

export default articles;