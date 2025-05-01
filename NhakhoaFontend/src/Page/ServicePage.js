import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const img = (filename) => `/assets/${filename}`;
const services = [
  {
    title: 'Niềng răng chỉnh nha',
    image: '/assets/niengrang.jpg',
  },
  {
    title: 'Răng sứ thẩm mỹ',
    image: '/assets/bocrangsu.jpg',
  },
  {
    title: 'Trồng răng Implant',
    image: '/assets/implant.jpg',
  },
  {
    title: 'Điều trị bệnh lý',
    image: '/assets/benhly.jpg',
  },
];

function ServicePage() {
  const navigate = useNavigate();

  return (
    <div className="w-100">
      <Container>
        <div className="mb-3 p-3">
          <h2 className="text-success">CÁC DỊCH VỤ NHA KHOA ALISA</h2>
        </div>
        <Row className="text-center">
          {services.map((service, index) => (
            <Col key={index} className="col-12 col-md-3 d-flex justify-content-center mb-4">
              <Card style={{ border: 'none' }}>
                <Link to={`/ServiceAll`}>
                  <Card.Img
                    variant="top"
                    src={service.image}
                    alt={service.title}
                    style={{
                      width: '305px',
                      height: '160px',
                    }}
                  />
                </Link>
                <Card.Body>
                  <Card.Title className="text-success">
                    {service.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h2 className="text-uppercase mb-3 text-success">
          Cơ sở hạ tầng của nha khoa Alisa
        </h2>

        {/* Nội dung chính */}
        <Row>
          {/* Phần văn bản */}
          <Col className="col-12 col-md-6 text-start text-success">
            <p>
              Bên cạnh việc chú trọng nâng cao tay nghề của đội ngũ bác sĩ, Nha khoa Alisa
              luôn dành sự quan tâm đặc biệt đến việc cải tiến và nâng cấp cơ sở vật chất, hạ
              tầng nhằm phục vụ tốt nhất nhu cầu của khách hàng. Chính vì vậy 90% khách hàng
              khi đến và trải nghiệm dịch vụ tại Nha khoa Alisa đều cảm thấy hài lòng và an
              tâm.
            </p>
            <p>
              Là một cơ sở được cấp phép hoạt động của Bộ Y tế, nha khoa Alisa luôn nỗ lực
              nâng cấp cơ sở hạ tầng, vật chất nhằm mang đến trải nghiệm dịch vụ thoải mái,
              thoáng mát nhất.
            </p>

            {/* Iframe video responsive */}
            <div className="mt-3 mb-3">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/Gkem436N_fE?si=7jj2Y3RafLzzxRSB"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </Col>

          {/* Hình ảnh và văn bản bên phải */}
          <Col className="col-12 col-md-6 text-start mb-5 text-success">
            <Image
              src={img('anhnhakhoa.jpg')}
              alt="Alisa Dental Logo"
              fluid
              className="mb-2"
              style={{
                width: '100%',
                height: '350px',
                objectFit: 'cover', // Đảm bảo hình ảnh không bị méo
              }}
            />
            <p>
              Nha khoa Alisa luôn chú trọng đầu tư nhập ngoại những thiết bị hỗ trợ điều trị
              tiên tiến như máy chụp X-Quang thế hệ mới. Những công nghệ 3D hiện đại giúp đo
              bác sĩ trong quá trình thăm khám và điều trị cho bệnh nhân.
            </p>
            <p>
              Phòng phẫu thuật được lắp đặt hệ thống lọc không khí minh và trang bị những thiết
              bị hiện đại đáp ứng tiêu chuẩn tuyệt đối cho bệnh nhân. Bên cạnh đó, công tác vệ
              sinh được thực hiện kỹ lưỡng nhằm đảm bảo sức khỏe và sự an toàn cho bệnh nhân.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ServicePage;