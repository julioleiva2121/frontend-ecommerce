import React, { useEffect, useState } from 'react';
import { productService } from '../services/productService';
import ProductCard from './ProductCard';
import '../styles/FeaturedProducts.css';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Correctly call the service method and get a slice of products
        const featured = await productService.getNewArrivals(4);
        setProducts(featured);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="featured-products">
      <h2>Productos Destacados</h2>
       {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
