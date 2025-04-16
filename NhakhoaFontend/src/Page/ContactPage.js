import React, { useState, useEffect } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Boostrap CSS
import {Row, Col, Form, Card, Button } from "react-bootstrap";
import ContactService from '../service/ContactService';

// const today = new Date().toISOString().split("T")[0];
// const [selectedDate, setSelectedDate] = useState(today);

function ContactPage() {
    const today = new Date().toISOString().split("T")[0];
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState([])
    const [services, setServices] = useState("08:00");
    const [formData, setFormData] = useState({
        // benhnhan_id: "",
        hoten: "",
        ngaysinh: "",
        Gioitinh: "",
        diachi: "",
        email: "",
        SDT: "",
        // datlich_id: "",
        dichvu_id: "",
    });

    const createDatlichId = () => {
        const timestamp = Date.now().toString(36);
        const randomString = Math.random().toString(36).substr(2, 6);
        return `DAT-${timestamp}-${randomString}`;
    };
    const createId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        
        // Nếu đã đúng định dạng yyyy-MM-dd thì giữ nguyên
        if (typeof dateString === "string" && dateString.length === 10) return dateString;
    
        const d = new Date(dateString);
        return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const benhnhanData = {
            benhnhan_id: createId(),
            hoten: formData.hoten,
            ngaysinh: formatDate(formData.ngaysinh),
            Gioitinh: formData.Gioitinh,
            diachi: formData.diachi,
            email: formData.email,
            SDT: formData.SDT
        };

        ContactService.postkhachhang(benhnhanData)
        .then((benhnhanData) =>{
            if (!benhnhanData || !benhnhanData.benhnhan_id) {
                throw new Error("Không nhận được benhnhan_id từ phản hồi");
            }
            const benhnhanid = benhnhanData.benhnhan_id;

            const datlichData ={
                datlich_id: createDatlichId(),
                benhnhan_id: benhnhanid,
                dichvu_id: formData.dichvu_id,
                Ngay_Kham: formatDate(selectedDate),
                Gio_Kham: selectedTime,
                Trang_Thai: "Chờ xác nhận"
            };

            return ContactService.postdatlich(datlichData);
        })
        .then((datlichResponse) => {
            console.log("Lịch hẹn đã được đặt chờ xác nhận", datlichResponse);
            alert("Dặt lịch thành công")
        })
        .catch((error) => {
            console.error("Lỗi khi thêm dữ liệu:", error);
            alert("Có lỗi xảy ra. vui lòng thử lại.")
        });
    };

    useEffect(() => {
        let isMounted = true;
        ContactService.getdichvu().then(data => {
            if (isMounted) {
                setServices(data);
            }
        });
        return () => { isMounted = false; };
    }, []);

  return (
    <div className="w-100">
        <div className="container mb-3 p-3">
            <h1 className="text-success">Đặt lịch và liên hệ</h1>
        </div>
        <div className="container">
            <div Row className="text-success d-md-flex justify-content-start text-start">
                <div className="col-md-5 p-4">
                    <h4 className="mb-3"><strong>ĐẶT LỊCH ONLINE:</strong></h4>
                    <p><strong>Hotline:</strong> 0374.062.017</p>
                    <p><strong>Fanpage:</strong> <a href="#" target="_blank" rel="noopener noreferrer">facebook.com/AlisaDental</a></p>
                    <p><strong>Địa chỉ:</strong> Số 33 Nguyễn Phong Sắc, Cầu Giấy, Hà Nội</p>
                    <Card>
                        <Card.Body>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.893016026399!2d105.78725377503164!3d21.03696628061442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab28e41ef90b%3A0x870aaf86cbf83c7f!2zTmhhIEtob2EgQ-G6p3UgR2nhuqV5IEFsaXNhIC0gVHLhu5NuZyBSxINuZyBJbXBsYW50IEPhuqd1IEdp4bqleQ!5e0!3m2!1svi!2s!4v1742138326473!5m2!1svi!2s" 
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-md-7 p-4">
                    <h4 className="fw-bold text-success mb-3">Thông tin khách hàng</h4>
                    <Form>
                        <Row className="mb-3 mt-2">
                            <Col md={6} className="mt-2">
                                <Form.Control type="text" placeholder="Họ và tên" value={formData.hoten}
                                    onChange={(e) => setFormData({ ...formData, hoten: e.target.value }) }
                                />
                            </Col>
                            <p className='mb-0 mt-2 fw-bold'>Ngày sinh</p>
                            <Col md={3} className="mt-2">
                                <Form.Control type="date" value={formData.ngaysinh ? formatDate(formData.ngaysinh) : ""}
                                    onChange={(e) => setFormData({ ...formData, ngaysinh: e.target.value }) }
                                />
                            </Col>
                            <Col md={3} className="mt-2">
                                <Form.Select value={formData.Gioitinh}
                                    onChange={(e) => setFormData({ ...formData, Gioitinh: e.target.value }) }
                                >
                                    <option>Chọn giới tính</option>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">khác</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6} className="mt-2">
                                <Form.Control type="text" placeholder="Địa chỉ"  value={formData.diachi}
                                    onChange={(e) => setFormData({ ...formData, diachi: e.target.value }) }
                                />
                            </Col>
                            <Col md={3} className="mt-2">
                                <Form.Control type="email" placeholder="Email" value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value }) }
                                />
                            </Col>
                            <Col md={3} className="mt-2">
                                <Form.Control type="phone" placeholder="Số điện thoại" value={formData.SDT}
                                    onChange={(e) =>setFormData({ ...formData, SDT: e.target.value }) }
                                />
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label><strong>Chọn dịch vụ</strong></Form.Label>
                            <Form.Select 
                                value={formData.dichvu_id}
                                onChange={(e) => setFormData({ ...formData, dichvu_id: e.target.value })}
                            >
                                <option>- Vui lòng chọn dịch vụ -</option>
                                {Array.isArray(services) && services.length > 0 ? (
                                    services.map(services => (
                                        <option key={services.dichvu_id} value={services.dichvu_id}>
                                            {services.ten_event}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">Không có dịch vụ nào</option> // Hiển thị nếu không có dịch vụ
                                )}
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label><strong>Chọn ngày thăm khám</strong></Form.Label>
                            <Form.Control
                                type="date"
                                min={today} // Chỉ cho phép chọn từ ngày hiện tại trở đi
                                value={selectedDate ? formatDate(selectedDate) : ""}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label><strong>Chọn giờ thăm khám</strong></Form.Label>
                            <Row>
                                {[
                                    "8:00", "8:30", "9:00", "9:30",
                                    "10:00", "10:30", "11:00", "11:30",
                                    "12:00", "12:30", "13:00", "13:30",
                                    "14:00", "14:30", "15:00", "15:30",
                                    "16:00", "16:30", "17:00", "17:30",
                                    "18:00", "18:30", "19:00", "19:30"
                                ].map((Gio_Kham, index) => (
                                    <Col xs={3} key={index} className="mb-2">
                                        <div className="d-flex align-items-center border p-2 rounded justify-content-center">
                                            <Form.Check type="radio" name="time" label={Gio_Kham}
                                            value={selectedTime} onChange={() => setSelectedTime(Gio_Kham)} />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Form.Group>

                        <Button variant="success" type="submit" className='p-2' onClick={handleSubmit}>
                            Đặt lịch 
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ContactPage;