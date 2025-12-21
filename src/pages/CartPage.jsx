import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCustomers } from '../hooks/useCustomers';
import { useBills } from '../hooks/useBills';
// IMPORTANTE: Importamos los servicios para crear la Orden y los Detalles
import { createOrder, createOrderDetail } from '../services/orderService'; 

import AddressForm from '../components/AddressForm';
import BillForm from '../components/BillForm';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import '../styles/CartPage.css';

const CartPage = () => {
  // Asegúrate de usar id_key si así lo definimos en el Context
  const { cartItems, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isAddressCreated, setIsAddressCreated] = useState(false);
  const { customers } = useCustomers();
  const { addBill } = useBills(); // Quitamos isLoading/error por ahora para manejarlo manual
  const navigate = useNavigate();

  const shippingCost = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
  const total = subtotal + shippingCost;

  const handleBillSubmit = async (billData) => {
    try {
      // 1. CREAR LA FACTURA (Bill)
      // addBill debe devolver la respuesta del servidor (con el ID de la factura)
      const newBill = await addBill(billData);
      
      if (!newBill || !newBill.id_key) {
        throw new Error("No se recibió el ID de la factura");
      }

      console.log("Factura creada:", newBill);

      // 2. CREAR LA ORDEN (Order)
      // Vinculamos la orden a la factura recién creada
      const orderData = {
        date: new Date().toISOString(),
        total: total,
        delivery_method: 1, // 1: Envío estándar (puedes ajustarlo)
        status: 1,          // 1: Pendiente/Pagado
        client_id: billData.client_id,
        bill_id: newBill.id_key // <--- ¡AQUÍ ESTÁ LA CLAVE!
      };

      const newOrder = await createOrder(orderData);
      console.log("Orden creada:", newOrder);

      // 3. GUARDAR LOS PRODUCTOS (Order Details)
      // Recorremos el carrito y guardamos cada producto vinculado a la orden
      const detailPromises = cartItems.map(item => {
        return createOrderDetail({
          quantity: item.quantity,
          price: item.salePrice || item.price,
          order_id: newOrder.id_key, // Vinculado a la Orden
          product_id: item.id_key || item.id // El ID del producto
        });
      });

      // Esperamos a que todos los productos se guarden
      await Promise.all(detailPromises);
      console.log("Productos guardados correctamente");

      // 4. FINALIZAR
      alert('¡Compra realizada con éxito! Revisa tu Historial.');
      clearCart();
      navigate('/historial'); // Te llevo directo al historial para que veas la magia

    } catch (err) {
      console.error(err);
      alert(`Error al procesar el pago: ${err.message}`);
    }
  };

  const handleAddressCreated = () => {
    setIsAddressCreated(true);
  };

  return (
    <div className="cart-page">
      <h1>{isCheckout ? 'Proceso de Pago' : 'Tu Carrito'}</h1>
      {cartItems.length === 0 && !isCheckout ? (
        <div className="empty-cart-container">
          <p>Tu carrito está vacío.</p>
          <button className="btn btn-primary" onClick={() => navigate('/products')}>
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
                <div key={item.id_key || item.id} className="cart-page-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>Precio: ${(item.salePrice || item.price).toFixed(2)}</p>
                  </div>
                  <div className="item-quantity">
                    {/* Usamos id_key preferiblemente */}
                    <button onClick={() => updateQuantity(item.id_key || item.id, -1)}><FiMinus /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id_key || item.id, 1)}><FiPlus /></button>
                  </div>
                  <div className="item-total">
                    ${((item.salePrice || item.price) * item.quantity).toFixed(2)}
                  </div>
                  <button className="item-remove" onClick={() => removeFromCart(item.id_key || item.id)}>
                    <FiTrash2 />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="cart-summary">
            <h2>Resumen de Compra</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>${shippingCost.toFixed(2)}</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            {!isCheckout && (
              <div className="summary-actions">
                <button
                  className="proceed-checkout-btn"
                  onClick={() => setIsCheckout(true)}
                  disabled={cartItems.length === 0}
                >
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