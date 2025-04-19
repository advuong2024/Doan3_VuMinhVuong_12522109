import React, { useState, useEffect, memo, useRef } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Offcanvas, Carousel } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/Alisalogo-trang.png';

const images = [
  { src: '/assets/anhEvent.jpg', alt: 'Banner 1' },
  { src: '/assets/anhEvent2.jpg', alt: 'Banner 2' },
  { src: '/assets/anhEvent3.jpg', alt: 'Banner 3' },
];

function HeaderPage({ setStickyPadding }) {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Tính ngưỡng 30vh (30% chiều cao viewport)
      const threshold = window.innerHeight * 0.3; // 30vh
      const shouldBeSticky = window.scrollY > threshold;

      if (shouldBeSticky !== isSticky) {
        setIsSticky(shouldBeSticky);
        if (setStickyPadding) setStickyPadding(shouldBeSticky);
      }

      rafRef.current = null; // Reset RAF
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isSticky, setStickyPadding]);

  return (
    <div className="w-100">
      <div className="w-100 bg-success d-flex align-items-center justify-content-between p-3">
        <div>
          <Image src={logo} fluid style={{ maxHeight: '50px' }} />
        </div>
        <div className="text-white">
          <p className="mb-0">Số điện thoại: 0374.062.017</p>
        </div>
      </div>
      <Navbar
        expand="md"
        className={`bg-custom p-2 ${isSticky ? 'fixed-top' : ''}`}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="bg-custom"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-md-row justify-content-md-center align-items-center p-3">
              <Nav className="d-flex flex-column flex-md-row text-center text-md-center fw-bold gap-md-5">
                <Nav.Link
                  as={Link}
                  to="/"
                  className={activeLink === '/' ? 'text-dark fw-bold' : 'text-light'}
                  onClick={() => setActiveLink('/')}
                >
                  TRANG CHỦ
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Service"
                  className={activeLink === '/Service' ? 'text-dark fw-bold' : 'text-light'}
                  onClick={() => setActiveLink('/Service')}
                >
                  DỊCH VỤ
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Price"
                  className={activeLink === '/Price' ? 'text-dark fw-bold' : 'text-light'}
                  onClick={() => setActiveLink('/Price')}
                >
                  BẢNG GIÁ
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/About"
                  className={activeLink === '/About' ? 'text-dark fw-bold' : 'text-light'}
                  onClick={() => setActiveLink('/About')}
                >
                  THÔNG TIN
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/Contact"
                  className={activeLink === '/Contact' ? 'text-dark fw-bold' : 'text-light'}
                  onClick={() => setActiveLink('/Contact')}
                >
                  ĐẶT LỊCH & LIÊN HỆ
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {location.pathname === '/' && (
        <div className="w-100 h-100 carousel-section">
          <Carousel interval={4000}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default memo(HeaderPage);