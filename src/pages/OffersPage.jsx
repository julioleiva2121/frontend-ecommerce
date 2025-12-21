import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../styles/CategoryPage.css'; // Reusing styles

const OffersPage = () => {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true);
      const products = await productService.getOnSale();
       // Sort by discount percentage
      const sortedProducts = products.sort((a, b) => 
        ((b.price - b.salePrice) / b.price) - ((a.price - a.salePrice) / a.price)
      );
      setOfferProducts(sortedProducts);
      setLoading(false);
    };

    fetchOffers();
  }, []);

  return (
    <div className="category-page">
      <h1>Ofertas</h1>
      <p>Aprovecha nuestros descuentos exclusivos por tiempo limitado.</p>
      {loading ? (
        <p>Cargando ofertas...</p>
      ) : (
        <div className="product-grid">
          {offerProducts.length > 0 ? (
            offerProducts.map(product => <ProductCard key={product.id} product={product} />)
          ) : (
            <p>No hay ofertas disponibles en este momento.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OffersPage;
