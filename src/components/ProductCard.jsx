import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { getClothingImage } from '../utils/imageUtils';
import '../styles/ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const rating = product.rating || 4.5;

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} />);
      } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
        stars.push(<FaStarHalfAlt key={i} />); // Corregido: Usaba RegStar antes
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  const discount = product.salePrice ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  // --- CORRECCIÓN CLAVE AQUÍ ---
  // Antes pasabas product.category, ahora pasamos 'product' entero
  // para que imageUtils pueda leer el nombre y buscar la foto personalizada.
  const imageSrc = product.image && product.image.trim() 
    ? product.image 
    : getClothingImage(product); 

  // console.log('Product:', product.name, 'Image:', imageSrc); // Debug (Opcional)

  return (
    <div className="product-card">
      <Link to={`/p/${product.id_key}`}>
        <img 
          src={imageSrc} 
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            console.error('Image failed to load:', imageSrc);
            // Si falla, intentamos de nuevo pasando el producto entero
            e.target.src = getClothingImage(product);
          }}
        />
        {product.salePrice && <span className="discount-badge">{discount}% OFF</span>}
      </Link>
      <h3>{product.name}</h3>
      <div className="rating">{renderStars()}</div>
      <div className="price-box">
        {product.salePrice ?  (
          <>
            <span className="sale-price">${product.salePrice.toFixed(2)}</span>
            <span className="original-price">${product.price.toFixed(2)}</span>
          </>
        ) : (
          <span className="price">${product.price.toFixed(2)}</span>
        )}
      </div>
      <button onClick={() => addToCart(product)}>Añadir al carrito</button>
    </div>
  );
};

export default ProductCard;