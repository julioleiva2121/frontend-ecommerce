import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiX } from 'react-icons/fi';
import CustomerForm from './CustomerForm';
import '../styles/AuthModal.css';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'

  const handleLogin = (e) => {
    e.preventDefault();
    // Esta función de login es un dummy y no procesará los nuevos campos,
    // pero los campos se mostrarán en la UI como solicitaste.
    login(e.target.email.value, e.target.password.value);
  };

  if (!isAuthModalOpen) {
    return null;
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={closeAuthModal}><FiX /></button>
        <div className="modal-tabs">
          <button onClick={() => setActiveTab('login')} className={activeTab === 'login' ? 'active' : ''}>Iniciar Sesión</button>
          <button onClick={() => setActiveTab('register')} className={activeTab === 'register' ? 'active' : ''}>Registrarse</button>
        </div>
        <div className="modal-content">
          {activeTab === 'login' ? (
            <form onSubmit={handleLogin}>
              <input type="text" name="name" placeholder="Nombre" required />
              <input type="text" name="lastname" placeholder="Apellido" required />
              <input type="email" name="email" placeholder="Email" required />
              <input type="text" name="telefono" placeholder="Telefono" required />
              <button type="submit">Iniciar Sesión</button>
            </form>
          ) : (
            <CustomerForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;