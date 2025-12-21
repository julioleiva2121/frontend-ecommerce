const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// 1. OBTENER HISTORIAL (Trae todas las Facturas/Bills)
export const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/bills`);
    if (!response.ok) {
      throw new Error('Error al obtener el historial de compras');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bills:", error);
    return []; // Retorna array vacío para que no explote la pantalla
  }
};

// 2. OBTENER DETALLE (Trae una Factura específica por ID)
export const getOrderDetail = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/bills/${orderId}`);
    if (!response.ok) {
      throw new Error('Error al obtener el detalle de la orden');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching bill detail for ID ${orderId}:`, error);
    return null;
  }
};

// 3. CREAR ORDEN (Vincula la Factura con el sistema de pedidos)
export const createOrder = async (order) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });
    if (!response.ok) {
      throw new Error('Error al crear la orden');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// 4. GUARDAR DETALLE DEL PRODUCTO (Guarda cada item del carrito)
export const createOrderDetail = async (detail) => {
  try {
    // --- CORRECCIÓN FINAL: Usamos '/order_details' (con guion bajo) ---
    // Esto coincide con tu backend: prefix="/order_details"
    const response = await fetch(`${API_BASE_URL}/order_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(detail),
    });
    
    if (!response.ok) {
      throw new Error('Error al guardar el detalle del producto');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating order detail:", error);
    throw error;
  }
};