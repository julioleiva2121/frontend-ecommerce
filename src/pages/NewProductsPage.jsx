import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../styles/CategoryPage.css'; // Reusing styles

const NewProductsPage = () => {
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      setLoading(true);
      // The service already sorts by creation date
      const products = await productService.getNewArrivals(Infinity); // Get all, not just a limit
      setNewProducts(products);
      setLoading(false);
    };

    fetchNewArrivals();
  }, []);

  return (
    <div className="category-page">
      <h1>Nuevos Productos</h1>
      <p>Descubre las últimas novedades llegadas a la tienda.</p>
      {loading ? (
        <p>Cargando novedades...</p>
      ) : (
        <div className="product-grid">
          {newProducts.length > 0 ? (
            newProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No hay productos nuevos en este momento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NewProductsPage;
