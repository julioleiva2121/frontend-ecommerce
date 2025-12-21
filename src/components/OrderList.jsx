import React, { useState, useEffect } from 'react';
import { getOrders } from '../services/orderService';
import OrderDetail from './OrderDetail';
import '../styles/OrderList.css';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        console.log("Datos recibidos:", data); // Para depurar en consola
        setOrders(data);
      } catch (err) {
        setError('No se pudieron cargar las compras.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="loading">Cargando historial...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="order-list-container">
      <h2>Mis Compras</h2>
      
      {/* El botón de crear manual lo quitamos para obligar a usar el carrito real */}
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>Aún no tienes compras registradas.</p>
          <p>¡Ve a la tienda y estrena el carrito! 🛒</p>
        </div>
      ) : (
        <div className="list-content">
          <ul className="order-list">
            {orders.map((order) => (
              <li 
                key={order.id_key} 
                onClick={() => setSelectedOrderId(order.id_key)}
                className={selectedOrderId === order.id_key ? 'selected' : ''}
              >
                <div className="order-summary">
                  <span className="order-id">#{order.bill_number || order.id_key}</span>
                  <span className="order-date">
                    {new Date(order.date).toLocaleDateString()}
                  </span>
                  <span className="order-total">${order.total}</span>
                  <span className="order-status">
                    {order.payment_type || "Pagado"}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="order-detail-panel">
            {selectedOrderId ? (
              <OrderDetail orderId={selectedOrderId} />
            ) : (
              <div className="placeholder-text">
                👈 Selecciona una compra para ver qué compraste
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;