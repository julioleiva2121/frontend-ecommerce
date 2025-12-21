import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductCard from '../components/ProductCard';
import '../styles/CategoryPage.css'; // Reusing styles

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      if (query) {
        setLoading(true);
        const products = await productService.searchProducts(query);
        setResults(products);
        setLoading(false);
      } else {
        setResults([]);
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="category-page">
      <h1>Resultados de búsqueda para "{query}"</h1>
      {loading ? (
        <p>Buscando...</p>
      ) : (
        <>
          <p>Se encontraron {results.length} productos.</p>
          <div className="product-grid">
            {results.length > 0 ? (
              results.map(product => <ProductCard key={product.id} product={product} />)
            ) : (
              <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchPage;
