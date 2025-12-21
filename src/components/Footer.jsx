import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTiktok, FaPinterest } from 'react-icons/fa';
import { FaCcVisa, FaCcMastercard, FaCcPaypal } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>UrbanThreads</h4>
          <p>&copy; 2025 UrbanThreads. Todos los derechos reservados.</p>
        </div>
        <div className="footer-column">
          <h4>Ayuda</h4>
          <Link to="/shipping-policy">Política de Envíos</Link>
          <Link to="/returns">Cambios y Devoluciones</Link>
          <Link to="/faq">Preguntas Frecuentes</Link>
          <Link to="/contact">Contacto</Link>
        </div>
        <div className="footer-column">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer"><FaPinterest /></a>
          </div>
        </div>
        <div className="footer-column">
          <h4>Métodos de Pago</h4>
          <div className="payment-icons">
            <FaCcVisa size={32} />
            <FaCcMastercard size={32} />
            <FaCcPaypal size={32} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
