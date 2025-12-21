import React, { useState } from 'react';
import { customerService } from '../services/customerService';

const CustomerForm = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const newCustomer = { name, lastname, email, telephone };
            await customerService.createCustomer(newCustomer);

            setName('');
            setLastname('');
            setEmail('');
            setTelephone('');
            setSuccess('Cliente creado con éxito. La página se recargará en breve.');

            // Recargar la página para ver la lista actualizada
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (err) {
            setError(err.message || 'Ocurrió un error al crear el cliente.');
        }
    };

    return (
        <div className="customer-form-container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        id="lastname"
                        type="text"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Apellido"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        id="telephone"
                        type="tel"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        placeholder="Teléfono"
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
            {error && <p className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {success && <p className="success" style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </div>
    );
};

export default CustomerForm;
