// Layout.js
import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import WhatsappButton from '../WhatsAppButton/WhatsAppButton';

const Layout = () => {
  return (
    <>
    <Header/>
      <main style={{ minHeight: 'calc(100vh - 150px)' }}>
        <Outlet /> 
      </main>
      <Footer />
      <WhatsappButton/>
    </>
  );
};

export default Layout;
