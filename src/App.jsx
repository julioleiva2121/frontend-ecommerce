import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoryPage from './pages/CategoryPage';
import CartPage from './pages/CartPage';
import CustomerPage from './pages/CustomerPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import NewProductsPage from './pages/NewProductsPage';
import OffersPage from './pages/OffersPage';
import ReturnsPolicyPage from './pages/ReturnsPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import SearchPage from './pages/SearchPage';
import AccountPage from './pages/AccountPage';
import AddressTestPage from './pages/AddressTestPage';
import OrderHistoryPage from './pages/OrderHistoryPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/p/:productId" element={<ProductDetailPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/c/:categoryId" element={<CategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/nuevos-productos" element={<NewProductsPage />} />
          <Route path="/ofertas" element={<OffersPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/mi-cuenta" element={<AccountPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/returns" element={<ReturnsPolicyPage />} />
          <Route path="/address-test" element={<AddressTestPage />} />
          <Route path="/historial" element={<OrderHistoryPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
