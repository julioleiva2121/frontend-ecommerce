import React from 'react';
import '../styles/InfoPage.css';

const ShippingPolicyPage = () => {
  return (
    <div className="info-page">
      <h1>Política de Envíos</h1>
      <p><strong>Tiempos de envío:</strong></p>
      <p>Los pedidos se procesan en un plazo de 1 a 2 días hábiles. Una vez procesado, el tiempo de envío estimado es de 3 a 5 días hábiles para envíos nacionales.</p>
      
      <p><strong>Costos de envío:</strong></p>
      <p>Ofrecemos envío estándar gratuito en todos los pedidos superiores a $50. Para pedidos inferiores a $50, se aplicará una tarifa fija de $5.99.</p>
      
      <p><strong>Seguimiento de pedidos:</strong></p>
      <p>Una vez que tu pedido haya sido enviado, recibirás un correo electrónico de confirmación con un número de seguimiento para que puedas rastrear tu paquete.</p>
    </div>
  );
};

export default ShippingPolicyPage;
