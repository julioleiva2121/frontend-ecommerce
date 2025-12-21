import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BillForm = ({ client_id, total, onSubmit, onCancel }) => {
    const [billData, setBillData] = useState({
        bill_number: '',
        discount: 0,
        date: new Date().toISOString().slice(0, 10),
        total: total,
        payment_type: 1,
        client_id: client_id,
    });

    useEffect(() => {
        setBillData((prevData) => ({ ...prevData, total, client_id }));
    }, [total, client_id]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setBillData((prevData) => ({
            ...prevData,
            [name]: type === 'number' ? parseFloat(value) : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(billData);
    };

    return (
        <div className="checkout-form">
            <h2>Información de Facturación</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="bill_number">Número de Factura</label>
                    <input
                        type="text"
                        id="bill_number"
                        name="bill_number"
                        value={billData.bill_number}
                        onChange={handleChange}
                        placeholder="Ej: F001-001"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Fecha</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={billData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="discount">Descuento ($)</label>
                        <input
                            type="number"
                            id="discount"
                            name="discount"
                            value={billData.discount}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="payment_type">Método de Pago</label>
                        <select
                            id="payment_type"
                            name="payment_type"
                            value={billData.payment_type}
                            onChange={handleChange}
                            required
                        >
                            <option value={1}>Tarjeta de Crédito</option>
                            <option value={2}>PayPal</option>
                            <option value={3}>Transferencia Bancaria</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label>Total a Pagar</label>
                    <p className="total-display">${(billData.total - billData.discount).toFixed(2)}</p>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Volver al Carrito
                    </button>
                    <button type="submit" className="btn btn-primary">
                        Confirmar y Pagar
                    </button>
                </div>
            </form>
        </div>
    );
};

BillForm.propTypes = {
    client_id: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default BillForm;