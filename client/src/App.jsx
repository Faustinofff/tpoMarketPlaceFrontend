import './index.css';
import Contact from './views/Contact';
import Home from './views/Home';
import Navigation from './views/Navigation';
import ProductsView from './views/ProductsView';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";  // Importamos la vista de Checkout
import OrderConfirmation from "./views/OrderConfirmation.jsx";  // Importamos la vista de OrderConfirmation

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/productos" element={<ProductsView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />  {/* Ruta de checkout */}
        <Route path="/order-confirmation" element={<OrderConfirmation />} />  {/* Ruta de confirmation */}
      </Routes>
    </>
  );
}

export default App;

