import React from 'react';
import '../styles/InfoPage.css';
import '../styles/ContactPage.css';

const ContactPage = () => {
  return (
    <div className="info-page">
      <h1>Contacto</h1>
      <p>¿Tienes alguna pregunta? Rellena el formulario a continuación y nos pondremos en contacto contigo lo antes posible.</p>
      
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Mensaje</label>
          <textarea id="message" name="message" rows="5" required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
      </form>
    </div>
  );
};

export default ContactPage;
