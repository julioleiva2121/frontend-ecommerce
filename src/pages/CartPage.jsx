import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCustomers } from '../hooks/useCustomers';
import { useBills } from '../hooks/useBills';
import { createOrder, createOrderDetail } from '../services/orderService';

import AddressForm from '../components/AddressForm';
import BillForm from '../components/BillForm';
// import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi'; // Descomenta si tienes iconos
import '../styles/CartPage.css';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isAddressCreated, setIsAddressCreated] = useState(false);
  const { customers } = useCustomers();
  const { addBill } = useBills();
  const navigate = useNavigate();

  const shippingCost = subtotal > 50000 || subtotal === 0 ? 0 : 3500;
  const total = subtotal + shippingCost;

  const handleBillSubmit = async (billData) => {
    try {
      const newBill = await addBill(billData);
      if (!newBill || !newBill.id_key) throw new Error("Error: El servidor no devolvió el ID de la factura.");

      const orderData = {
        date: new Date().toISOString(),
        total: total,
        delivery_method: 1, 
        status: 1,          
        client_id: billData.client_id,
        bill_id: newBill.id_key 
      };

      const newOrder = await createOrder(orderData);

      const detailPromises = cartItems.map(item => {
        return createOrderDetail({
          quantity: item.quantity,
          price: item.salePrice || item.price,
          order_id: newOrder.id_key,
          product_id: item.id_key || item.id
        });
      });

      await Promise.all(detailPromises);

      alert('¡Compra realizada con éxito! 🎉');
      clearCart();
      navigate('/my-purchases');

    } catch (err) {
      console.error(err);
      alert(`Error al procesar la compra: ${err.message}`);
    }
  };

  const handleAddressCreated = () => {
    setIsAddressCreated(true);
  };

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
          <div className="cart-items-list">
            {isCheckout ? (
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
              cartItems.map(item => (
                <div key={getSafeId(item)} className="cart-page-item">
                  
                  {/* AQUÍ ESTÁ EL CAMBIO IMPORTANTE PARA LA FOTO */}
                  <img 
                    src={item.image || item.image_url || "https://via.placeholder.com/100"} 
                    alt={item.name} 
                    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Precio: ${(item.salePrice || item.price)}</p>
                  </div>
                  
                  <div className="item-quantity">
                    <button onClick={() => updateQuantity(getSafeId(item), -1)}>➖</button>
                    <span style={{ margin: "0 10px", fontWeight: "bold" }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(getSafeId(item), 1)}>➕</button>
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
                <button className="proceed-checkout-btn" onClick={() => setIsCheckout(true)}>
                  Proceder al Pago
                </button>
                <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
                  Seguir Comprando
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
