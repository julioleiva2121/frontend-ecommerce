import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SeasonalBanner.css';

const SeasonalBanner = () => {
  return (
    <section className="seasonal-banner">
      <div className="banner-content">
        <h2>Colección Verano 2024</h2>
        <p>Estilo y frescura para los días de sol.</p>
        <Link to="/category/verano-2024" className="btn btn-primary">Descubrir más</Link>
      </div>
    </section>
  );
};

export default SeasonalBanner;
