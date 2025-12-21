import React from 'react';
import AddressForm from '../components/AddressForm';
import { useCustomers } from '../hooks/useCustomers';
import '../styles/CartPage.css'; // Reutilizamos algunos estilos para mantener la consistencia

const AddressTestPage = () => {
    const { customers, isLoading, error } = useCustomers();

    if (isLoading) {
        return <div className="loading">Cargando clientes...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    const firstCustomer = customers && customers.length > 0 ? customers[0] : null;

    const handleAddressCreated = (address) => {
        console.log("Respuesta de creación de dirección:", address);
        // Comprobamos si el backend devolvió el objeto de la dirección
        if (address && address.id_key) {
            alert(`¡Dirección creada con éxito!\n\nID de Dirección: ${address.id_key}\nID de Cliente: ${address.client_id}\nCalle: ${address.street}`);
        } else {
            // Si no, mostramos un mensaje genérico pero sin causar un error
            alert("¡Dirección creada con éxito! El backend no devolvió los datos para mostrar, pero el registro fue guardado.");
        }
    };

    return (
        <div className="cart-page" style={{ padding: '2rem' }}>
            <h1>Página de Prueba del Formulario de Dirección</h1>
            <div className="cart-layout">
                <div className="cart-items-list">
                    {firstCustomer ? (
                        <AddressForm
                            client_id={firstCustomer.id_key}
                            onAddressCreated={handleAddressCreated}
                        />
                    ) : (
                        <p>No se encontraron clientes. Asegúrate de que haya al menos un cliente en la base de datos para realizar la prueba.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressTestPage;