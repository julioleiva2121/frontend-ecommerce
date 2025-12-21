import React from 'react';
import OrderList from '../components/OrderList';
import '../styles/InfoPage.css';
import '../styles/OrderList.css';
import '../styles/OrderDetail.css';

const OrderHistoryPage = () => {
  return (
    <div className="info-page">
      <h1>Historial de Compras</h1>
      <OrderList />
    </div>
  );
};

export default OrderHistoryPage;
