import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import '../styles/MiniCart.css';

const MiniCart = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartItemCount, subtotal } = useCart();

  // Función auxiliar para asegurarnos de usar el ID correcto
  const getSafeId = (item) => item.id_key || item.id;

  return (
    <>
      <div className={`mini-cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`mini-cart ${isCartOpen ? 'open' : ''}`}>
        
        {/* HEADER */}
        <div className="mini-cart-header">
          <h3>Carrito ({cartItemCount})</h3>
          <button onClick={toggleCart}><FiX /></button>
        </div>

        {/* ITEMS */}
        <div className="mini-cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
                <p style={{fontSize: "2rem", margin: 0}}>🛒</p>
                <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={getSafeId(item)} className="cart-item">
                
                {/* Imagen (con respaldo por si cambia el nombre de la variable) */}
                <img src={item.image_url || item.image} alt={item.name} />
                
                <div className="item-details">
                  <h4>{item.name}</h4>
                  
                  {/* CONTROLES DE CANTIDAD */}
                  <div className="quantity-control">
                    {/* RESTAR (-1) usando ID seguro */}
                    <button onClick={() => updateQuantity(getSafeId(item), -1)}>
                        <FiMinus />
                    </button>
                    
                    <span>{item.quantity}</span>
                    
                    {/* SUMAR (+1) usando ID seguro */}
                    <button onClick={() => updateQuantity(getSafeId(item), 1)}>
                        <FiPlus />
                    </button>
                  </div>
                  
                  <p>${(item.salePrice || item.price).toFixed(2)}</p>
                </div>

                {/* BOTÓN ELIMINAR usando ID seguro */}
                <button className="remove-btn" onClick={() => removeFromCart(getSafeId(item))}>
                    <FiTrash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {cartItems.length > 0 && (
          <div className="mini-cart-footer">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            
            {/* El Link cierra el carrito al cambiar de página */}
            <Link to="/cart" className="checkout-button" onClick={toggleCart}>
              Ver Carrito Completo
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MiniCart;
