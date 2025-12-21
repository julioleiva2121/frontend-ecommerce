import React from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from './ProductCard';
import '../styles/ProductList.css';

const ProductList = () => {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="product-list-container">
      <h2 className="product-list-title">Nuestros Productos</h2>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id_key} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
