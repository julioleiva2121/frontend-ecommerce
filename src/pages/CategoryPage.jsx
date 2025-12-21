import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { getClothingImage } from '../utils/imageUtils'; // <--- IMPORTANTE: Agregamos esto
import ProductCard from '../components/ProductCard';
import '../styles/CategoryPage.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const category = await productService.getCategoryById(categoryId);
        if (category) {
          setCategoryName(category.name);
        }

        const categoryProducts = await productService.getProductsByCategory(categoryId);
        
        // --- CORRECCIÓN CLAVE AQUÍ ---
        // Antes de guardar los productos, les asignamos su foto personalizada
        // si es que no traen una del backend.
        const productsWithImages = categoryProducts.map(product => ({
            ...product,
            // Pasamos el producto ENTERO a getClothingImage para que detecte el nombre
            image: product.image || getClothingImage(product) 
        }));

        setProducts(productsWithImages);

      } catch (error) {
        console.error("Failed to fetch category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categoryId]);

  const title = categoryName ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1) : '';

  return (
    <div className="category-page">
      <h1>{title}</h1>
      <p>Descubre nuestra selección de productos para {title.toLowerCase()}.</p>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="product-grid">
          {products.length > 0 ? (
            products.map(product => <ProductCard key={product.id_key} product={product} />)
          ) : (
            <p>No se encontraron productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;