import React from 'react';
import { FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import '../styles/InfoBanner.css';

const InfoBanner = () => {
  return (
    <section className="info-banner">
      <div className="info-item">
        <FiTruck size={32} />
        <p>Envío gratis +$50</p>
      </div>
      <div className="info-item">
        <FiRefreshCw size={32} />
        <p>Devoluciones en 30 días</p>
      </div>
      <div className="info-item">
        <FiShield size={32} />
        <p>Pago seguro</p>
      </div>
    </section>
  );
};

export default InfoBanner;
