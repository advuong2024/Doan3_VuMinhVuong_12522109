import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Button, Row, Col, Card, Image, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import articles from '../service/PriceData'; // Adjust the path based on your project structure
const img = (filename) => `/assets/${filename}`;

function PricePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Lọc bài viết dựa trên tiêu đề
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleShowDetail = (id) => {
    navigate(`/PriceDetails/${id}`);
  };

  return (
    <div className="w-100">
      <Container className="mt-4 mb-3">
        <Row>
          {/* Cột bên trái: Danh sách bài viết */}
          <Col md={8} className="text-success">
              <h3
                  className="mb-4 text-start text-success"
                  style={{ color: '#4a2c8b', fontWeight: 'bold' }}
              >
                  Giá dịch vụ của nha khoa
              </h3>
              {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                      <Card
                          key={article.id}
                          className="mb-3 border-0 shadow-sm"
                          onClick={() => handleShowDetail(article.id)}
                          style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      >
                          <Card.Body className="p-3">
                              <Row className="align-items-center">
                                  <Col xs={12} md={5} className="d-flex align-items-center">
                                      <Image
                                          src={img(article.image)}
                                          alt={article.title}
                                          style={{
                                              width: '310px',
                                              height: '170px',
                                              objectFit: 'cover',
                                              borderRadius: '8px',
                                          }}
                                      />
                                  </Col>
                                  <Col xs={12} md={7}>
                                      <div className="text-start">
                                          <Card.Title className="text-success mb-2">
                                              {article.title}
                                          </Card.Title>
                                          <Card.Text>{article.description}</Card.Text>
                                      </div>
                                  </Col>
                              </Row>
                          </Card.Body>
                      </Card>
                  ))
              ) : (
                  <p>Không tìm thấy bài viết nào.</p>
              )}
              {/* Bạn có thể thêm danh sách bài viết về "Răng sứ thẩm mỹ" tại đây */}
          </Col>

          {/* Cột bên phải: Thanh tìm kiếm và quảng cáo */}
          <Col md={4} className='text-success'>
            {/* Thanh tìm kiếm */}
            <h5 className='text-start'>TÌM KIẾM</h5>
            <InputGroup className="mb-4">
              <Form.Control
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="success">
                <i className="pi pi-search" style={{ fontSize: '1rem' }}></i>
              </Button>
            </InputGroup>

            {/* Phần quảng cáo */}
            <h4 className='text-start' style={{fontWeight: 'bold' }}>SỰ KIỆN NỔI BẬT</h4>
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
              <p>Cấy ghép Implant cùng Bác sĩ chuyên môn 100% tốt nghiệp Đại học Y Hà Nội</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CSS tùy chỉnh */}
      <style jsx>{`
        @media (max-width: 767px) {
          .row {
            flex-direction: column;
          }
          .col-md-8, .col-md-4 {
            width: 100%;
          }
          .input-group {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

export default PricePage;