import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import articles from '../service/ServiceData'; // Adjust the path based on your project structure
const img = (filename) => `/assets/${filename}`;

function ServiceDetails() {
  const { id } = useParams(); // Lấy id từ URL
  const navigate = useNavigate();
  const article = articles.find((a) => a.id === parseInt(id)); // Tìm bài viết theo id

  if (!article) {
    return (
      <Container className="mt-4">
        <h2>Không tìm thấy bài viết</h2>
        <Button variant="primary" onClick={() => navigate('/ServiceAll')}>
          Quay lại
        </Button>
      </Container>
    );
  }

  return (
    <div className="w-100">
      <div className="bg-success py-2 text-start ps-3">
        <Button
          variant="light"
          className="border-0 rounded-circle shadow"
          onClick={() => navigate(-1)}
        >
          {"<"}
        </Button>
      </div>
      <Container className="mt-4 mb-3">
        <Row>
          <Col md={8}>
            <div className="detail-section text-start text-success">
              {article.detail}
              <h2>Thông tin liên hệ</h2>
              <p>Nếu bạn đang tìm kiếm giải pháp niềng răng hiện đại, thẩm mỹ và hiệu quả, hãy liên hệ ngay với Nha khoa Alisa để được tư vấn và điều trị tốt nhất!</p>
              <ul>
                <li><strong>Hotline:</strong> 0374.062.017</li>
                <li><strong>Fanpage:</strong> <a href="https://www.facebook.com/AlisaDental">https://www.facebook.com/AlisaDental</a></li>
                <li><strong>Tư vấn trực tiếp từ Bác sĩ:</strong> <a href="https://zalo.me/4440649491286873369">https://zalo.me/4440649491286873369</a></li>
                <li><strong>Địa chỉ:</strong> Số 33 Nguyễn Phong Sắc, Cầu Giấy, Hà Nội.</li>
              </ul>
            </div>
          </Col>
          {/* Phần quảng cáo */}
          <Col md={4}>
          <h4 className='text-success' style={{fontWeight: 'bold' }}>SỰ KIỆN NỔI BẬT</h4>
           <div className="mb-3">
                <Image
                    src={img('ADS-2.jpg')}
                    alt="Đổi Răng Cũ Lấy Răng Mới"
                    style={{ width: '100%', height: '350px' }}
                />
            </div>
            <div>
                <Image
                    src={img('anhEvent.jpg')}
                    alt="100% Bác sĩ tốt nghiệp Đại học Y Hà Nội"
                    style={{ width: '100%', height: 'auto' }}
                />
                <p className="text-success">Cấy ghép Implant cùng Bác sĩ chuyên môn 100% tốt nghiệp Đại học Y Hà Nội</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CSS inline trong component */}
      <style jsx>{`
        .detail-section h2 {
          font-size: 1.5rem;
          margin-top: 1.5rem;
        }
        .detail-section h3 {
          font-size: 1.25rem;
          margin-top: 1rem;
        }
        .detail-section ul {
          padding-left: 20px;
        }
        .detail-section img {
          max-width: 100%;
          height: auto;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}

export default ServiceDetails;