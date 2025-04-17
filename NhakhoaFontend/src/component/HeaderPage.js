import React, { useState } from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Boostrap CSS
import { Navbar, Nav, Container} from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import logo from "../assets/Alisalogo-trang.png";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link, useLocation } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';

const images = [
  { src: "/assets/anhEvent.jpg", alt: "Banner 1" },
  { src: "/assets/anhEvent2.jpg", alt: "Banner 2" },
  { src: "/assets/anhEvent3.jpg", alt: "Banner 3" },
];

function HeaderPage() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  return (
    <div className='w-100'>
      <div className='w-100 bg-success d-flex align-items-center justify-content-between p-3' >
        <div>
          <Image src={logo} fluid />
        </div>
        <div className='text-white'>
          <p className="mb-0">Số điện thoại: 0374.062.017</p>
        </div>
      </div>
      <Navbar expand="md" className="bg-custom p-2">
        <Container fluid>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas 
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="bg-custom"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                Menu
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column flex-md-row justify-content-md-center align-items-center p-3">
              <Nav className="d-flex flex-column flex-md-row text-center text-md-center fw-bold gap-md-5">
                <Nav.Link
                    as={Link}
                    to="/"
                    className={activeLink === "/" ? "text-dark fw-bold" : "text-light"}
                    onClick={() => setActiveLink("/")}
                  >
                    TRANG CHỦ
                </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/Service"
                    className={activeLink === "/Service" ? "text-dark fw-bold" : "text-light"}
                    onClick={() => setActiveLink("/Service")}
                  >
                    DỊCH VỤ
                </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/Price"
                    className={activeLink === "/Price" ? "text-dark fw-bold" : "text-light"}
                    onClick={() => setActiveLink("/Price")}
                  >
                    BẢNG GIÁ
                </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/About"
                    className={activeLink === "/About" ? "text-dark fw-bold" : "text-light"}
                    onClick={() => setActiveLink("/About")}
                  >
                    THÔNG TIN
                </Nav.Link>

                  <Nav.Link
                    as={Link}
                    to="/Contact"
                    className={activeLink === "/Contact" ? "text-dark fw-bold" : "text-light"}
                    onClick={() => setActiveLink("/Contact")}
                  >
                    ĐẶT LỊCH & LIÊN HỆ
                </Nav.Link>
              </Nav>

              {/* <Form className="d-flex flex-column flex-md-row mt-3 mt-md-0">
                <Form.Control 
                  type="search"
                  placeholder="Search"
                  className="me-md-2 mb-2 mb-md-0"
                  aria-label="Search"
                />
                <Button variant="outline-light">Search</Button>
              </Form> */}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {location.pathname === "/" && (
        <div className="w-100 h-100">
          <Carousel interval={4000}>
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={image.src} alt={image.alt} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}

export default HeaderPage;