import React, { useState, useEffect } from 'react';
import { getOrderDetail } from '../services/orderService';
import '../styles/OrderDetail.css';

const OrderDetail = ({ orderId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        setLoading(true);
        const result = await getOrderDetail(orderId);
        setData(result);
      } catch (error) {
        setError("No se pudo cargar el detalle.");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrderDetail();
    else { setData(null); setLoading(false); }
  }, [orderId]);

  if (!orderId) return null;
  if (loading) return <div>Cargando detalle...</div>;
  if (error) return <div className="error-msg">{error}</div>;
  if (!data) return <div>No se encontraron datos.</div>;

  // Lógica para encontrar los items en la estructura Bill -> Order -> Details
  let items = [];
  if (data.order && data.order.order_details) items = data.order.order_details;
  else if (data.items) items = data.items;

  const displayDate = data.date || (data.order ? data.order.date : new Date().toISOString());
  const displayTotal = data.total || (data.order ? data.order.total : 0);

  return (
    <div className="order-detail">
      <h3>Detalle de Compra (ID: {orderId})</h3>
      <div className="order-header">
        <p><strong>Fecha:</strong> {new Date(displayDate).toLocaleDateString()}</p>
        <p><strong>Total:</strong> ${displayTotal}</p>
      </div>
      <hr />
      <h4>Productos:</h4>
      <div className="order-items-list">
        {items.length > 0 ? (
            items.map((item, index) => (
                <div key={index} className="order-item-card" style={{marginBottom: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px'}}>
                    <p><strong>Producto:</strong> {item.product?.name || "Producto"}</p>
                    <p><strong>Cantidad:</strong> {item.quantity || 1}</p>
                    <p><strong>Precio:</strong> ${item.price || 0}</p>
                </div>
            ))
        ) : (
            <p>No se encontraron items (Prueba crear una orden nueva).</p>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;