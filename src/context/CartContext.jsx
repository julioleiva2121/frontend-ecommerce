import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const itemExists = prevItems.find(item => item.id_key === product.id_key);
      if (itemExists) {
        return prevItems.map(item =>
          item.id_key === product.id_key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id_key !== productId));
  };

  const updateQuantity = (productId, amount) => {
    setCartItems(prevItems => {
      return prevItems.map(item => {
        if (item.id_key === productId) {
          const newQuantity = item.quantity + amount;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  // --- NUEVA FUNCIÓN AGREGADA ---
  const clearCart = () => {
    setCartItems([]); // Simplemente borra todo
  };

  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };
  
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cartItems.reduce((total, item) => {
    const price = item.salePrice || item.price;
    return total + price * item.quantity;
  }, 0);

  const value = {
    cartItems,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    cartItemCount,
    subtotal,
    clearCart, // <--- ¡AQUÍ LA EXPORTAMOS PARA QUE SE PUEDA USAR!
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};