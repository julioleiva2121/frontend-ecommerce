import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { useCart } from '../context/CartContext';
import { getClothingImage } from '../utils/imageUtils';
import ReviewList from '../components/ReviewList';
import ReviewForm from '../components/ReviewForm';
import { FaStar, FaRegStar } from 'react-icons/fa';
import '../styles/ProductDetailPage.css';
import '../styles/Reviews.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const fetchProductAndReviews = async () => {
      setLoading(true);
      try {
        const fetchedProduct = await productService.getProductById(productId);
        
        if (fetchedProduct) {
          // CORREGIDO: Pasamos 'fetchedProduct' entero para que busque la foto personalizada
          const productWithImage = {
            ...fetchedProduct,
            image: fetchedProduct.image || getClothingImage(fetchedProduct),
          };
          setProduct(productWithImage);

          setSelectedSize(fetchedProduct.sizes ?  fetchedProduct.sizes[0] : 'S');
          setSelectedColor(fetchedProduct.colors ? fetchedProduct.colors[0] : 'Default');

          const fetchedReviews = await productService.getReviewsByProduct(fetchedProduct.id_key);
          setReviews(fetchedReviews);
        }
      } catch (error) {
        console.error("Failed to fetch product and reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndReviews();
  }, [productId]);

  const handleReviewAdded = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<FaStar key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  if (loading) {
    return <div className="loading">Cargando producto...</div>;
  }

  if (!product) {
    return <div className="not-found">Producto no encontrado. </div>;
  }

  const availableSizes = product.sizes || ['S', 'M', 'L', 'XL'];
  const availableColors = product.colors || ['Negro', 'Blanco', 'Gris'];
  const averageRating = calculateAverageRating();

  // CORREGIDO: Pasamos 'product' entero
  const imageSrc = product.image && product.image.trim() 
    ? product.image 
    : getClothingImage(product);

  return (
    <div className="product-detail-page">
      <div className="product-main-content">
        <div className="product-gallery">
          <img 
            src={imageSrc} 
            alt={product.name} 
            className="main-image"
            loading="lazy"
            onError={(e) => {
              // CORREGIDO: Pasamos 'product' entero en caso de error
              e.target.src = getClothingImage(product);
            }}
          />
        </div>
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>

          <div className="selectors">
            <div className="selector-group">
              <label>Talla:</label>
              <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                {availableSizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>
            <div className="selector-group">
              <label>Color:</label>
              <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                {availableColors.map(color => (
                  <option key={color} value={color}>{color}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            className="add-to-cart-btn" 
            onClick={() => addToCart({
              ...product,
              selectedSize,
              selectedColor,
            })}
          >
            Añadir al carrito
          </button>
        </div>
      </div>

      <div className="reviews-section">
        <h2>Opiniones del Producto</h2>
        {reviews.length > 0 && (
          <div className="average-rating">
            <strong>{averageRating} de 5</strong>
            <div className="stars">{renderStars(averageRating)}</div>
            <span>({reviews.length} opiniones)</span>
          </div>
        )}
        <ReviewList reviews={reviews} />
        <ReviewForm productId={product.id_key} onReviewAdded={handleReviewAdded} />
      </div>
    </div>
  );
};

export default ProductDetailPage;