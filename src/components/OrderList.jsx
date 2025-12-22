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
        console.log("Datos recibidos:", data);
        setOrders(data);
      } catch (err) {
        setError('No se pudieron cargar las compras.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center", padding: "50px", color: "#666" }}>
      <p>⏳ Cargando historial...</p>
    </div>
  );
  
  if (error) return (
    <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
      <p>❌ {error}</p>
    </div>
  );

  return (
    <div className="order-list-container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      
      {/* Título Principal */}
      <h2 style={{ 
        textAlign: "center", 
        marginBottom: "30px", 
        color: "#2c3e50",
        fontSize: "2rem" 
      }}>
        🛍️ Mis Compras
      </h2>
      
      {orders.length === 0 ? (
        <div className="empty-state" style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
          <p style={{ fontSize: "4rem", margin: 0 }}>🛒</p>
          <p>Aún no tienes compras registradas.</p>
          <p>¡Ve a la tienda y estrena el carrito!</p>
        </div>
      ) : (
        <div className="list-content" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          
          {/* COLUMNA IZQUIERDA: Lista de compras */}
          <ul className="order-list" style={{ listStyle: "none", padding: 0, flex: "1", minWidth: "300px" }}>
            {orders.map((order) => (
              <li 
                key={order.id_key} 
                onClick={() => setSelectedOrderId(order.id_key)}
                style={{
                  marginBottom: "15px",
                  cursor: "pointer",
                  border: selectedOrderId === order.id_key ? "2px solid #3498db" : "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  backgroundColor: selectedOrderId === order.id_key ? "#f0f8ff" : "white",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                  transition: "all 0.2s ease"
                }}
              >
                <div className="order-summary" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  
                  {/* ID de la factura */}
                  <div style={{ display: "flex", alignItems: "center", gap: "5px", minWidth: "80px" }}>
                    <span>🧾</span>
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                      #{order.bill_number || order.id_key}
                    </span>
                  </div>

                  {/* Fecha */}
                  <div style={{ color: "#666", fontSize: "0.9em" }}>
                    📅 {new Date(order.date).toLocaleDateString()}
                  </div>

                  {/* Precio */}
                  <div style={{ color: "#27ae60", fontWeight: "bold" }}>
                    💰 ${order.total}
                  </div>

                  {/* Estado (Pago) */}
                  <div style={{ 
                    fontSize: "0.8em", 
                    backgroundColor: "#e8f5e9", 
                    color: "#2e7d32", 
                    padding: "4px 8px", 
                    borderRadius: "15px" 
                  }}>
                    {order.payment_type || "Pagado"} ✅
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* COLUMNA DERECHA: Detalles */}
          <div className="order-detail-panel" style={{ flex: "1", minWidth: "300px", padding: "20px", border: "1px solid #eee", borderRadius: "10px", backgroundColor: "#fafafa" }}>
            {selectedOrderId ? (
              <OrderDetail orderId={selectedOrderId} />
            ) : (
              <div className="placeholder-text" style={{ textAlign: "center", color: "#aaa", marginTop: "20px" }}>
                <p style={{ fontSize: "3rem" }}>👈</p>
                <p>Selecciona una compra de la lista para ver el detalle completo</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
