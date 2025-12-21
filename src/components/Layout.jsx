import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MiniCart from './MiniCart';
import AuthModal from './AuthModal';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
      <MiniCart />
      <AuthModal />
    </div>
  );
};

export default Layout;
