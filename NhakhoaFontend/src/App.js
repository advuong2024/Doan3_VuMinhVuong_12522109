
import './App.css';

import React from 'react';
import {  Route, Routes } from 'react-router-dom';

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
  return (
    
    <div className="App">
      <header className="App-header">
        <HeaderPage />
      </header>

      <main className='App-body'>
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
      </main>

      <footer className='App-footer'>
        <FooterPage />
      </footer>
    </div>
        
    
  );
}

export default App;

