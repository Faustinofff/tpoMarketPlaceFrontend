import './index.css';
import Contact from './views/Contact';
import Home from './views/Home';
import Navigation from './views/Navigation';
import ProductsView from './views/ProductsView';
import ProductDetail from './views/ProductDetail';
import { Routes, Route } from 'react-router-dom';  // Asegúrate de importar Routes y Route
import Login from './views/Login';
import Cart from "./views/Cart.jsx";
import Checkout from "./views/Checkout.jsx";
import OrderConfirmation from "./views/OrderConfirmation.jsx";
import AdminProductActions from "./views/AdminProductActions";
import Footer from "./views/Footer";
import { ToastContainer } from 'react-toastify'; // Importa ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de Toastify

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Navigation />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/productos" element={<ProductsView />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/admin" element={<AdminProductActions />} />
        </Routes>
      </div>

      <Footer />
      <ToastContainer /> {/* Aquí agregamos el ToastContainer */}
    </div>
  );
}

export default App;
