// Layout.js
import React from 'react';

import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
    <Header/>
      {/* You can add a Header here too */}
      <main style={{ minHeight: 'calc(100vh - 150px)' }}>
        <Outlet /> {/* This renders the matched route's component */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
