import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Boostrap CSS
import logo from "../assets/Alisalogo-trang.png";
import { FaFacebook, FaInstagram, FaEnvelope, FaYoutube } from "react-icons/fa";
import { Container } from 'react-bootstrap';

function FooterPage() {
  return (
    <div className='w-100'>
      <Container fluid>
        <div className='row bg-custom p-5 text-start text-light fw-bold mt-md-0 d-flex justify-content-between align-items-start'>
          <div className='col-md-3 col-12 mb-3'>
              <img src={logo} alt="Alisa Dental Logo" className="mb-2" width={150} />
              <p>
                Nha khoa Alisa - Trung tâm trồng răng và Niềng răng. Tự hào là một trong những nha khoa đầu tiên ở Hà Nội đi đầu về công nghệ.
                Đội ngũ Y bác sĩ đại học Y Hà Nội và Răng hàm mặt Trung ương nhiều năm kinh nghiệm.
              </p>
          </div>
          <div className='col-md-3 col-12 mb-3'>
              <h5>QUY TRÌNH CHUẨN BỘ Y TẾ</h5>
              <hr className="border-light" />
              <ul className="list-unstyled">
                  <li>Phác đồ và chi phí minh bạch</li>
                  <li>Phòng khám vô khuẩn</li>
                  <li>Trang thiết bị tiên tiến</li>
                  <li>Bác sĩ đại học Y Hà Nội chính quy</li>
              </ul>
          </div>
          <div className='col-md-3 col-12 mb-3'>
              <h5>LIÊN HỆ PHÒNG KHÁM</h5>
              <hr className="border-light" />
              <p>📍 33 Nguyễn Phong Sắc, Cầu Giấy, HN</p>
              <p>📞 Hotline: 0374.062.017</p>
              <p>📧 cskh.alisadental@gmail.com</p>
              <p>⏰ Giờ làm việc: 8:30 đến 20:00</p>
          </div>
          <div className='col-md-3 col-12 mb-3'>
              <h5>ĐĂNG KÝ NHẬN ƯU ĐÃI</h5>
              <hr className="border-light" />
              <div className="d-flex gap-3">
                  <a href="#" className="text-light fs-4"><FaFacebook /></a>
                  <a href="#" className="text-light fs-4"><FaInstagram /></a>
                  <a href="#" className="text-light fs-4"><FaEnvelope /></a>
                  <a href="#" className="text-light fs-4"><FaYoutube /></a>
              </div>
          </div>
        </div>
      </Container>
      <div className='w-100 bg-success p-2'>
        <p className='text-light m-0'>Copyright 2025 © Alisa Dental. All Rights Reserved</p>
      </div>
    </div>
  );
}

export default FooterPage;