import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import InfoBanner from '../components/InfoBanner';
import SeasonalBanner from '../components/SeasonalBanner';
import '../styles/HomePage.css';

const HomePage = () => {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">UrbanThreads</h1>
          <p className="subtitle">Discover the latest trends in fashion</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">Ver Colección</Link>
            <Link to="/ofertas" className="btn btn-secondary">Descubre Ofertas</Link>
          </div>
        </div>
      </section>
      <ProductList />
      <InfoBanner />
      <SeasonalBanner />
    </div>
  );
};

export default HomePage;