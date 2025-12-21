import React, { useState } from 'react';
import { addressService } from '../services/addressService';

const AddressForm = ({ client_id, onAddressCreated }) => {
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            if (!client_id) {
                throw new Error("No se pudo obtener el ID del cliente.");
            }

            // Preparamos el objeto con los datos de la dirección
            const newAddress = {
                street: street,
                number: number,
                city: city,
                client_id: client_id
            };

            // Enviamos los datos al servicio
            await addressService.createAddress(newAddress);

            // Si la llamada fue exitosa, limpiamos el formulario y mostramos el éxito
            setStreet('');
            setNumber('');
            setCity('');
            setSuccess('Dirección creada con éxito.');

            // Notificamos al componente padre que la dirección se creó
            if (onAddressCreated) {
                onAddressCreated(newAddress);
            }

        } catch (err) {
            setError(err.message || 'Ocurrió un error al crear la dirección.');
        }
    };

    return (
        <div className="address-form-container">
            <h2>Dirección de Envío</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        id="street"
                        type="text"
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        placeholder="Calle"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        id="number"
                        type="text"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        placeholder="Número"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ciudad"
                        required
                    />
                </div>
                <button type="submit">Guardar Dirección y Continuar</button>
            </form>
            {error && <p className="error" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {success && <p className="success" style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
        </div>
    );
};

export default AddressForm;