import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import '../styles/MiniCart.css';

const MiniCart = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartItemCount, subtotal } = useCart();

  return (
    <>
      <div className={`mini-cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={toggleCart}></div>
      <div className={`mini-cart ${isCartOpen ? 'open' : ''}`}>
        <div className="mini-cart-header">
          <h3>Carrito ({cartItemCount})</h3>
          <button onClick={toggleCart}><FiX /></button>
        </div>
        <div className="mini-cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Tu carrito está vacío.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, -1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}><FiPlus /></button>
                  </div>
                  <p>${(item.salePrice || item.price).toFixed(2)}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}><FiTrash2 /></button>
              </div>
            ))
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="mini-cart-footer">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
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
