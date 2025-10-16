import './index.css';
import Contact from './views/Contact';
import Home from './views/Home';
import Navigation from './views/Navigation';
import ProductsView from './views/ProductsView';
import ProductDetail from './views/ProductDetail';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";
import OrderConfirmation from "./views/OrderConfirmation.jsx";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productos" element={<ProductsView />} />  {/* Lista de productos */}
        <Route path="/producto/:id" element={<ProductDetail />} /> {/* Detalle de producto */}
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
    </>
  );
}

export default App;
