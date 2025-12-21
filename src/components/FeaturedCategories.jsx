import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import '../styles/FeaturedCategories.css';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryImages = {
    'Ropa Hombre': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?fit=crop&w=600&h=800',
    'Ropa Mujer': 'https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?fit=crop&w=600&h=800',
    'Accesorios': 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?fit=crop&w=600&h=800',
    'Lo Más Vendido': 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?fit=crop&w=600&h=800',
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const fetchedCategories = await productService.getCategories();
        const mappedCategories = fetchedCategories.map(cat => ({
          ...cat,
          path: `/c/${cat.id_key}`,
          image: categoryImages[cat.name] || 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?fit=crop&w=600&h=800'
        }));
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="featured-categories">
      <h2>Categorías Destacadas</h2>
      {loading ? (
        <p>Cargando categorías...</p>
      ) : (
        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={category.path} key={category.id_key} className="category-card">
              <img src={category.image} alt={category.name} />
              <div className="category-name">{category.name}</div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedCategories;

