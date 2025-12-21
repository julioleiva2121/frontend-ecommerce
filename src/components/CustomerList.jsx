import React from 'react';
import { useCustomers } from '../hooks/useCustomers';
import ClientForm from './CustomerForm'; // si renombrás el archivo, cambiá el import

const ClientList = () => {
    const { customers, isLoading, error, refetch } = useCustomers();

    if (isLoading) {
        return <div className="loading">Loading clients...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div>
            <ClientForm onClientCreated={refetch} />

            <div className="client-list-container">
                <h2 className="client-list-title">Nuestros Clientes</h2>

                <div className="client-grid">
                    {customers && customers.length > 0 ? (
                        customers.map((client) => (
                            <div key={client.id_key} className="client-card">
                                <h3>{client.name} {client.lastname}</h3>
                                <p>{client.email}</p>
                                <p>{client.telephone}</p>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron clientes.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClientList;

