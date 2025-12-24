import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCustomers } from '../hooks/useCustomers';
import { useBills } from '../hooks/useBills';
import { createOrder, createOrderDetail } from '../services/orderService';

import AddressForm from '../components/AddressForm';
import BillForm from '../components/BillForm';

// Si no tienes instalada la librería de iconos, usa emojis. 
// Si la tienes, descomenta la siguiente línea:
// import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

import '../styles/CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isAddressCreated, setIsAddressCreated] = useState(false);
  const { customers } = useCustomers();
  const { addBill } = useBills();
  const navigate = useNavigate();

  const shippingCost = subtotal > 50000 || subtotal === 0 ? 0 : 3500; // Ajusté el envío a un precio más real ($3500)
  const total = subtotal + shippingCost;

  const handleBillSubmit = async (billData) => {
    try {
      // 1. CREAR LA FACTURA
      const newBill = await addBill(billData);
      
      if (!newBill || !newBill.id_key) {
        throw new Error("Error: El servidor no devolvió el ID de la factura.");
      }
      console.log("Factura creada con ID:", newBill.id_key);

      // 2. CREAR LA ORDEN
      const orderData = {
        date: new Date().toISOString(),
        total: total,
        delivery_method: 1, 
        status: 1,          
        client_id: billData.client_id,
        bill_id: newBill.id_key 
      };

      const newOrder = await createOrder(orderData);
      console.log("Orden creada:", newOrder);

      // 3. GUARDAR LOS PRODUCTOS
      const detailPromises = cartItems.map(item => {
        return createOrderDetail({
          quantity: item.quantity,
          price: item.salePrice || item.price,
          order_id: newOrder.id_key,
          product_id: item.id_key // Usamos estrictamente id_key
        });
      });

      await Promise.all(detailPromises);

      // 4. FINALIZAR
      alert('¡Compra realizada con éxito! 🎉');
      clearCart();
      navigate('/my-purchases'); // Te llevo al historial

    } catch (err) {
      console.error(err);
      alert(`Error al procesar la compra: ${err.message}`);
    }
  };

  const handleAddressCreated = () => {
    setIsAddressCreated(true);
  };

  // Función auxiliar para obtener el ID seguro
  const getSafeId = (item) => item.id_key || item.id;

  return (
    <div className="cart-page">
      <h1>{isCheckout ? 'Finalizar Compra 💳' : 'Tu Carrito 🛒'}</h1>
      
      {cartItems.length === 0 && !isCheckout ? (
        <div className="empty-cart-container">
          <p style={{ fontSize: "1.5rem", color: "#888" }}>Tu carrito está vacío 😢</p>
          <button className="btn-primary" onClick={() => navigate('/products')} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
            Ir a la tienda
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          
          {/* COLUMNA IZQUIERDA: ITEMS O FORMULARIOS */}
          <div className="cart-items-list">
            {isCheckout ? (
              // Lógica de Formularios (Dirección -> Factura)
              !isAddressCreated ? (
                <AddressForm
                  client_id={customers.length > 0 ? customers[0].id_key : null}
                  onAddressCreated={handleAddressCreated}
                />
              ) : (
                <BillForm
                  client_id={customers.length > 0 ? customers[0].id_key : 0}
                  total={total}
                  onSubmit={handleBillSubmit}
                  onCancel={() => setIsCheckout(false)}
                />
              )
            ) : (
              // Lista de Productos Normal
              cartItems.map(item => (
                <div key={getSafeId(item)} className="cart-page-item">
                  <img src={item.image_url || "https://via.placeholder.com/100"} alt={item.name} />
                  
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Precio: ${(item.salePrice || item.price)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    {/* BOTÓN MENOS */}
                    <button onClick={() => updateQuantity(getSafeId(item), -1)}>
                      ➖
                    </button>
                    
                    <span style={{ margin: "0 10px", fontWeight: "bold" }}>{item.quantity}</span>
                    
                    {/* BOTÓN MÁS */}
                    <button onClick={() => updateQuantity(getSafeId(item), 1)}>
                      ➕
                    </button>
                  </div>
                  
                  <div className="item-total">
                    ${((item.salePrice || item.price) * item.quantity)}
                  </div>
                  
                  <button className="item-remove" onClick={() => removeFromCart(getSafeId(item))}>
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {/* COLUMNA DERECHA: RESUMEN */}
          <div className="cart-summary">
            <h2>Resumen</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>{shippingCost === 0 ? "Gratis" : `$${shippingCost}`}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total}</span>
            </div>
            
            {!isCheckout && (
              <div className="summary-actions">
                <button
                  className="proceed-checkout-btn"
                  onClick={() => setIsCheckout(true)}
                >
                  Proceder al Pago
                </button>
                <button 
                  className="continue-shopping-btn" 
                  onClick={() => navigate('/products')}
                >
                  Seguir Comprando
                </button>
                {/* Botón de emergencia para limpiar datos viejos */}
                <button 
                    onClick={clearCart} 
                    style={{ marginTop: "10px", background: "none", border: "none", color: "red", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}
                >
                    (Vaciar carrito por si falla)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
