import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { productService } from '../services/productService';
import { getClothingImage } from '../utils/imageUtils'; // <--- EL IMPORT MÁGICO
import ProductCard from '../components/ProductCard';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Obtenemos todos los productos
        const fetchedProducts = await productService.getAllProducts();
        
        // --- LA CORRECCIÓN ---
        // Les asignamos la foto correcta usando el objeto entero
        const productsWithImages = fetchedProducts.map(product => ({
            ...product,
            image: product.image || getClothingImage(product) 
        }));

        setProducts(productsWithImages);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  return (
    <div className="products-page">
      <h1>Nuestra Colección</h1>
      {loading ? (
        <div className="loading">Cargando catálogo...</div>
      ) : (
        <div className="product-grid">
           {products.length > 0 ? (
             products.map(product => (
               <ProductCard key={product.id_key} product={product} />
             ))
           ) : (
             <p>No hay productos disponibles.</p>
           )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;