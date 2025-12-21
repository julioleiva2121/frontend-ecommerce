import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiSearch, FiLogOut } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { productService } from '../services/productService';
import '../styles/Header.css';

const Header = () => {
  const { toggleCart, cartItemCount } = useCart();
  const { isAuthenticated, openAuthModal, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await productService.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo-container">
          <Link to="/" className="logo">UrbanThreads</Link>
        </div>
        <nav className="main-nav">
          {categories.map(category => (
            <Link key={category.id_key} to={`/c/${category.id_key}`}>
              {category.name}
            </Link>
          ))}
        </nav>
        <div className="user-actions">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit"><FiSearch /></button>
          </form>
          <Link to="/historial" className="nav-link">Historial</Link>
          {isAuthenticated ? (
            <button onClick={logout} className="action-icon">
              <FiLogOut size={24} />
            </button>
          ) : (
            <button onClick={openAuthModal} className="action-icon">
              <FiUser size={24} />
            </button>
          )}
          <button onClick={toggleCart} className="action-icon cart-icon">
            <FiShoppingCart size={24} />
            {cartItemCount > 0 && <span className="cart-counter">{cartItemCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
