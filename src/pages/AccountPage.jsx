import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/InfoPage.css';
import '../styles/AccountPage.css';

const AccountPage = () => {
  const { openAuthModal } = useAuth();

  return (
    <div className="info-page">
      <h1>Mi Cuenta</h1>
      
      <div className="account-options">
        <div className="account-box">
          <h2>Iniciar Sesión</h2>
          <p>Accede a tu cuenta para ver tus pedidos y gestionar tu información.</p>
          <button onClick={() => openAuthModal('login')} className="btn btn-primary">
            Iniciar Sesión
          </button>
        </div>
        
        <div className="account-box">
          <h2>Registrarse</h2>
          <p>Crea una cuenta nueva para disfrutar de una experiencia de compra más rápida y personalizada.</p>
          <button onClick={() => openAuthModal('register')} className="btn btn-secondary">
            Crear Cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
