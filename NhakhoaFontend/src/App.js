import './App.css';
import React, { useState, useEffect, memo, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import HomePage from './Page/HomePage';
import HeaderPage from './component/HeaderPage';
import FooterPage from './component/FooterPage';
import ContactPage from './Page/ContactPage';
import AboutPage from './Page/AboutPage';
import AboutDentist from './Page/AboutDentist';
import ServicePage from './Page/ServicePage';
import ServiceAll from './Page/ServiceAll';
import ServiceDetails from './Page/ServiceDetails';
import PricePage from './Page/PricePage';
import PriceDetails from './Page/PriceDetails';

function App() {
  const [stickyPadding, setStickyPadding] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const rafRef = useRef(null);

  // Xử lý cuộn về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Theo dõi sự kiện cuộn để hiển thị/ẩn nút
  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      if (shouldShow !== showScrollTop) {
        setShowScrollTop(shouldShow);
      }
      rafRef.current = null;
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
  }, [showScrollTop]);

  return (
    <div className="App">
      <header className="App-header">
        <HeaderPage setStickyPadding={setStickyPadding} />
      </header>

      <main className={`App-body ${stickyPadding ? 'sticky-padding' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Service" element={<ServicePage />} />
          <Route path="/ServiceAll" element={<ServiceAll />} />
          <Route path="/ServiceDetails/:id" element={<ServiceDetails />} />
          <Route path="/Price" element={<PricePage />} />
          <Route path="/PriceDetails/:id" element={<PriceDetails />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/AboutDentist" element={<AboutDentist />} />
          <Route path="/Contact" element={<ContactPage />} />
        </Routes>

        {/* Nút cuộn về đầu trang - đặt ngay sau main, trước footer */}
        {showScrollTop && (
          <Button
            variant="success"
            className="scroll-top-btn rounded-circle shadow"
            onClick={scrollToTop}
          >
            <i className="pi pi-arrow-up" style={{ fontSize: '1.5rem' }}></i>
          </Button>
        )}
      </main>

      <footer className="App-footer">
        <FooterPage />
      </footer>
    </div>
  );
}

export default memo(App);