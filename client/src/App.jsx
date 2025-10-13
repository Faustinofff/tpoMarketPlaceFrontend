import './index.css';
import Contact from './views/Contact';
import Home from './views/Home';
import Navigation from './views/Navigation';
import ProductsView from './views/ProductsView';
import { Routes, Route } from 'react-router-dom';
import Login from './views/Login';


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        {/* 👇 usamos /contact (no /contacto) */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/productos" element={<ProductsView />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
