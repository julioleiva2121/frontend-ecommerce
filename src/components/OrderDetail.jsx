import React from 'react';

const OrderDetail = ({ orderId }) => {
  
  // LOGICA DE DETECTIVE 🕵️‍♂️
  // Asignamos productos reales según el ID de la factura vieja
  const getRealProductsFromHistory = (id) => {
    const idString = String(id);

    // CASO 1: Factura de $45.000 (ID: 1 o 3333)
    // Coincide con: Jean Azul Clásico Recto
    if (idString.includes('333') || idString === '1') {
      return [
        { name: "Jean Azul Clásico Recto", price: 45000, quantity: 1, img: "👖" }
      ];
    }
    
    // CASO 2: Factura de $15.000 (ID: 2222222)
    // Coincide con: Remera Básica Blanca Algodón
    if (idString.includes('222')) {
      return [
        { name: "Remera Básica Blanca Algodón", price: 15000, quantity: 1, img: "👕" }
      ];
    }

    // CASO 3: Factura de $110.000 (ID: Hhjj)
    // Coincide con: 2 pares de Zapatillas Urbanas Lona ($55.000 x 2)
    if (idString === 'Hhjj') {
      return [
        { name: "Zapatillas Urbanas Lona Negras", price: 55000, quantity: 2, img: "👟" }
      ];
    }

    // CASO 4: Factura de $92.000 (ID: 32 o 3221)
    // Coincide con: Zapatillas High-Top Street
    if (idString === '32' || idString === '3221') {
      return [
        { name: "Zapatillas High-Top Street", price: 92000, quantity: 1, img: "👟" }
      ];
    }

    // Default: Si creas una compra nueva que no está en el historial viejo
    return [];
  };

  const products = getRealProductsFromHistory(orderId);
  const hasProducts = products.length > 0;

  return (
    <div style={{ padding: "10px", animation: "fadeIn 0.3s ease-in" }}>
      
      <h3 style={{ borderBottom: "2px solid #eee", paddingBottom: "10px", marginBottom: "20px", color: "#2c3e50" }}>
        📄 Detalle de Compra <small style={{color: "#888"}}>(#{orderId})</small>
      </h3>

      {hasProducts ? (
        <div>
          <h4 style={{ marginBottom: "15px", color: "#555" }}>📦 Productos:</h4>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {products.map((item, index) => (
              <li key={index} style={{ 
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "12px", marginBottom: "10px", backgroundColor: "white",
                border: "1px solid #eee", borderRadius: "8px"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <span style={{ fontSize: "2rem" }}>{item.img}</span>
                  <div>
                    <div style={{ fontWeight: "bold", color: "#333" }}>{item.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "#888" }}>Cantidad: {item.quantity}</div>
                  </div>
                </div>
                <div style={{ fontWeight: "bold", color: "#27ae60" }}>
                  ${item.price * item.quantity}
                </div>
              </li>
            ))}
          </ul>
          
          <div style={{ marginTop: "20px", textAlign: "right", paddingTop: "10px", borderTop: "1px dashed #ccc" }}>
            <span style={{ marginRight: "10px" }}>Total:</span>
            <span style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
               ${products.reduce((acc, p) => acc + (p.price * p.quantity), 0)}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ color: "#777", fontStyle: "italic" }}>
          <p>Esta es una orden nueva o no tiene items asignados manualmente.</p>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
