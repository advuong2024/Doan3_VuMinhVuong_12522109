﻿CREATE DATABASE nhakhoa;
CREATE TABLE nhakhoa.bacsi (
    bacsi_id VARCHAR(50) PRIMARY KEY Not Null,
    hoten NVARCHAR(150),
    ngaysinh DATE,
    Gioitinh NVARCHAR(10),
    diachi NVARCHAR(250),
    email VARCHAR(150) UNIQUE,
    SDT VARCHAR(12) UNIQUE,
    taikhoan VARCHAR(30) UNIQUE,
    matkhau VARCHAR(60),
    quyen NVARCHAR(50)
);

CREATE TABLE nhakhoa.benhnhan (
    benhnhan_id VARCHAR(50) PRIMARY KEY Not Null,
    hoten NVARCHAR(150),
    ngaysinh DATE,
    Gioitinh NVARCHAR(10),
    diachi NVARCHAR(250),
    email VARCHAR(150) UNIQUE NULL,
    SDT VARCHAR(12) UNIQUE
);

CREATE TABLE nhakhoa.dichvu(
	dichvu_id varchar(50)  PRIMARY KEY Not Null,
	ten_event nvarchar(150) Null,
	mo_ta nvarchar(300) Null,
	anh_event varchar(250) Null,
	gia_event float Null
);

CREATE TABLE nhakhoa.datlich (
    datlich_id VARCHAR(50) PRIMARY KEY Not Null,
    benhnhan_id VARCHAR(50),
    bacsi_id varchar(50),
    dichvu_id VARCHAR(50),
    Ngay_Kham DATE,
    Gio_Kham TIME,
    Trang_Thai ENUM('Chờ xác nhận', 'Đã xác nhận', 'Hủy'),
    FOREIGN KEY (benhnhan_id) REFERENCES benhnhan(benhnhan_id) ON DELETE SET NULL,
    FOREIGN KEY (dichvu_id) REFERENCES dichvu(dichvu_id) ON DELETE SET NULL,
    FOREIGN KEY (bacsi_id) REFERENCES bacsi(bacsi_id) ON DELETE SET NULL
);

CREATE TABLE nhakhoa.hoadon(
	ma_hoa_don varchar(50) PRIMARY KEY Not Null,
	benhnhan_id VARCHAR(50) Null,
	bacsi_id varchar(50) Null,
	ngaytao date Null,
	trangthai NVARCHAR(50) DEFAULT N'Chưa thanh toán',
	FOREIGN KEY (benhnhan_id) REFERENCES benhnhan(benhnhan_id) ON DELETE SET NULL,
	FOREIGN KEY (bacsi_id) REFERENCES bacsi(bacsi_id) ON DELETE SET NULL
);

CREATE TABLE nhakhoa.chitiethoadon(
	ma_chi_tiet varchar(50)  PRIMARY KEY Not Null,
	ma_hoa_don varchar(50) Null,
	dichvu_id varchar(50) Null,
	gia float Null,
	FOREIGN KEY (dichvu_id) REFERENCES dichvu(dichvu_id) ON DELETE SET NULL,
	FOREIGN KEY (ma_hoa_don) REFERENCES hoadon(ma_hoa_don)
);

CREATE TABLE nhakhoa.tintuc(
	tintuc_id VARCHAR(50) PRIMARY KEY NOT NULL,
    tieu_de NVARCHAR(200) NOT NULL,
    noi_dung TEXT NOT NULL,
    ngay_dang DATE NOT NULL,
    tac_gia VARCHAR(50) NULL,
    anh_tin_tuc VARCHAR(250) NULL,
    loai_tin ENUM('Dịch vụ', 'Giá dịch vụ') NOT NULL,
    trang_thai ENUM('Công khai', 'Nháp', 'Đã xóa') DEFAULT 'Nháp',
    FOREIGN KEY (tac_gia) REFERENCES bacsi(bacsi_id) ON DELETE SET NULL
);

-- Thêm dữ liệu vào bảng bacsi
INSERT INTO nhakhoa.bacsi (bacsi_id, hoten, ngaysinh, Gioitinh, diachi, email, SDT, taikhoan, matkhau, quyen) VALUES
('BS001', N'Nguyễn Văn Anh', '1980-05-15', N'Nam', N'Hà Nội', 'nguyenvana@example.com', '0912345678', 'bsykhoa1', 'password1', N'Bác sĩ'),
('BS002', N'Trần Thị Bích', '1985-07-20', N'Nữ', N'Hồ Chí Minh', 'tranthib@example.com', '0923456789', 'bsykhoa2', 'password2', N'Bác sĩ'),
('BS003', N'Lê Công Cường', '1978-03-25', N'Nam', N'Đà Nẵng', 'lecongc@example.com', '0934567890', 'bsykhoa3', 'password3', N'Bác sĩ'),
('BS004', N'Phạm Văn Duy', '1990-11-10', N'Nam', N'Cần Thơ', 'phamvand@example.com', '0945678901', 'bsykhoa4', 'password4', N'Bác sĩ'),
('BS005', N'Hoàng Thu Hiền', '1992-09-05', N'Nữ', N'Hải Phòng', 'hoangthue@example.com', '0956789012', 'bsykhoa5', 'password5', N'Bác sĩ');

-- Thêm dữ liệu vào bảng benhnhan
INSERT INTO nhakhoa.benhnhan (benhnhan_id, hoten, ngaysinh, Gioitinh, diachi, email, SDT) VALUES
('BN001', N'Nguyễn Minh Tâm', '2000-01-01', N'Nam', N'Hà Nội', 'tamnm@example.com', '0812345678'),
('BN002', N'Phạm Thị Lan', '1995-06-15', N'Nữ', N'Hồ Chí Minh', 'lanpt@example.com', '0823456789'),
('BN003', N'Trần Hoàng Nam', '1998-09-20', N'Nam', N'Đà Nẵng', 'namth@example.com', '0834567890'),
('BN004', N'Hoàng Yến Linh', '1992-03-10', N'Nữ', N'Cần Thơ', 'linhhy@example.com', '0845678901'),
('BN005', N'Vũ Văn Toàn', '1999-12-25', N'Nam', N'Hải Phòng', 'toanvv@example.com', '0856789012');

-- Thêm dữ liệu vào bảng dichvu
INSERT INTO nhakhoa.dichvu (dichvu_id, ten_event, mo_ta, anh_event, gia_event) VALUES
('DV001', N'Khám tổng quát', N'Kiểm tra tổng quát tình trạng răng miệng', 'kham_tong_quat.jpg', 500000),
('DV002', N'Nhổ răng', N'Nhổ răng sâu, răng khôn', 'nho_rang.jpg', 800000),
('DV003', N'Trám răng', N'Điều trị răng sâu bằng cách trám răng', 'tram_rang.jpg', 600000),
('DV004', N'Niềng răng', N'Chỉnh nha, niềng răng mắc cài', 'nieng_rang.jpg', 20000000),
('DV005', N'Tẩy trắng răng', N'Phương pháp làm trắng răng an toàn', 'tay_trang_rang.jpg', 1200000);

-- Thêm dữ liệu vào bảng datlich
INSERT INTO nhakhoa.datlich (datlich_id, bacsi_id, benhnhan_id, dichvu_id, Ngay_Kham, Gio_Kham, Trang_Thai) VALUES
('DL001', 'BS001', 'BN001', 'DV001', '2025-03-01', '09:00:00', 'Chờ xác nhận'),
('DL002', 'BS002', 'BN002', 'DV002', '2025-03-02', '10:30:00', 'Đã xác nhận'),
('DL003', 'BS003', 'BN003', 'DV003', '2025-03-03', '14:00:00', 'chờ xác nhận'),
('DL004', 'BS004', 'BN004', 'DV004', '2025-03-04', '16:30:00', 'Hủy'),
('DL005', 'BS005', 'BN005', 'DV005', '2025-03-05', '11:00:00', 'Chờ xác nhận');

-- Thêm dữ liệu vào bảng hoadon
INSERT INTO nhakhoa.hoadon (ma_hoa_don, benhnhan_id, bacsi_id, ngaytao, trangthai) VALUES
('HD001', 'BN001', 'BS001', '2025-03-01', N'Đã thanh toán'),
('HD002', 'BN002', 'BS002', '2025-03-02', N'Đã thanh toán'),
('HD003', 'BN003', 'BS003', '2025-03-03', N'Đã thanh toán'),
('HD004', 'BN004', 'BS004', '2025-03-04', N'Đã thanh toán'),
('HD005', 'BN005', 'BS005', '2025-03-05', N'Đã thanh toán');

-- Thêm dữ liệu vào bảng chitiethoadon
INSERT INTO nhakhoa.chitiethoadon (ma_chi_tiet, ma_hoa_don, dichvu_id, gia) VALUES
('CTHD001', 'HD001', 'DV001', 500000),
('CTHD002', 'HD002', 'DV002', 800000),
('CTHD003', 'HD003', 'DV003', 600000),
('CTHD004', 'HD004', 'DV004', 20000000),
('CTHD005', 'HD005', 'DV005', 1200000);

INSERT INTO nhakhoa.tintuc (tintuc_id, tieu_de, noi_dung, ngay_dang, tac_gia, anh_tin_tuc, loai_tin, trang_thai) VALUES
('TT001', N'Chăm sóc răng miệng đúng cách', N'<p>Hướng dẫn vệ sinh răng miệng hàng ngày: đánh răng 2 lần/ngày, dùng chỉ nha khoa, và thăm khám định kỳ 6 tháng/lần.</p><img src="http://localhost:5000/uploads/rang1.jpg">', '2025-04-25', 'BS001', 'http://localhost:5000/uploads/rang1.jpg', 'Dịch vụ', 'Công khai'),
('TT002', N'Khuyến mãi niềng răng tháng 5', N'<p>Giảm giá 20% cho dịch vụ niềng răng từ ngày 1/5/2025 đến 31/5/2025.</p><img src="http://localhost:5000/uploads/nieng1.jpg">', '2025-05-01', NULL, 'http://localhost:5000/uploads/nieng1.jpg', 'Giá dịch vụ', 'Nháp'),
('TT003', N'Công nghệ trồng răng implant', N'<p>Trồng răng implant hiện đại, an toàn, với độ bền cao và thẩm mỹ tối ưu.</p>', '2025-04-27', 'BS002', NULL, 'Dịch vụ', 'Công khai'),
('TT004', N'Tư vấn miễn phí chỉnh nha', N'<p>Đăng ký tư vấn miễn phí về chỉnh nha và niềng răng trong tháng 6/2025.</p><img src="http://localhost:5000/uploads/chinhnha1.jpg">', '2025-05-10', NULL, 'http://localhost:5000/uploads/chinhnha1.jpg', 'Giá dịch vụ', 'Nháp'),
('TT005', N'Tầm quan trọng của khám răng định kỳ', N'<p>Khám răng định kỳ giúp phát hiện sớm các vấn đề răng miệng và tiết kiệm chi phí điều trị.</p>', '2025-04-30', 'BS001', NULL, 'Dịch vụ', 'Công khai');

select * from nhakhoa.benhnhan;
select * from nhakhoa.datlich;
select * from nhakhoa.hoadon;
select * from nhakhoa.chitiethoadon;
select * from nhakhoa.tintuc;
ALTER TABLE nhakhoa.datlich
MODIFY COLUMN Trang_Thai ENUM('Chờ xác nhận', 'Đã xác nhận', 'Hủy', 'Hoàn thành');
SELECT COUNT(*) AS count FROM nhakhoa.hoadon 
    WHERE MONTH(ngaytao) = MONTH(CURRENT_DATE()) AND YEAR(ngaytao) = YEAR(CURRENT_DATE());
SELECT SUM(ct.gia) as total FROM nhakhoa.hoadon h
    LEFT JOIN nhakhoa.chitiethoadon ct ON h.ma_hoa_don = ct.ma_hoa_don
    WHERE MONTH(h.ngaytao) = MONTH(CURRENT_DATE()) AND YEAR(h.ngaytao) = YEAR(CURRENT_DATE());
SELECT COUNT(*) as count FROM nhakhoa.datlich
    WHERE MONTH(Ngay_Kham) = MONTH(CURRENT_DATE()) AND YEAR(Ngay_Kham) = YEAR(CURRENT_DATE());