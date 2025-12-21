import React from 'react';
import '../styles/InfoPage.css';

const FAQPage = () => {
  return (
    <div className="info-page">
      <h1>Preguntas Frecuentes</h1>
      
      <h2>¿Cuál es el estado de mi pedido?</h2>
      <p>Una vez que tu pedido ha sido enviado, recibirás un correo electrónico con un número de seguimiento. Puedes usar ese número para rastrear tu paquete en el sitio web del transportista.</p>
      
      <h2>¿Puedo modificar mi pedido?</h2>
      <p>Procesamos los pedidos rápidamente, pero haremos todo lo posible para atender tu solicitud. Si necesitas modificar tu pedido, por favor, contáctanos lo antes posible.</p>
      
      <h2>¿Qué métodos de pago aceptan?</h2>
      <p>Aceptamos las principales tarjetas de crédito (Visa, MasterCard) y PayPal.</p>
      
      <h2>¿Ofrecen envíos internacionales?</h2>
      <p>Actualmente, solo realizamos envíos dentro del territorio nacional. Estamos trabajando para ofrecer envíos internacionales en el futuro.</p>
      
      <h2>¿Cómo puedo devolver un artículo?</h2>
      <p>Puedes iniciar una devolución en un plazo de 30 días. Por favor, consulta nuestra Política de Cambios y Devoluciones para obtener instrucciones detalladas.</p>
    </div>
  );
};

export default FAQPage;
