import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import theme
import 'primereact/resources/primereact.min.css'; // Import PrimeReact CSS
import 'primeicons/primeicons.css'; // Import PrimeIcons CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Container, Button, Row, Col, Card, Image } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const img = (filename) => `/assets/${filename}`;

function ServiceAll() {
  const navigate = useNavigate();

  return (
    <div className="w-100">
        <div className='bg-success py-2 text-start ps-3'>
            <Button variant="light" className="border-0 rounded-circle shadow"
                onClick={() => navigate(-1)}
            >
                {"<"}
            </Button>
        </div>
        <Container>
          
        </Container>
    </div>
  );
}

export default ServiceAll;