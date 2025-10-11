import './index.css'
import Form from './components/Form' // Nota: Si Form no se usa, puedes quitar esta línea
import Contact from './views/Contact' // Nota: Si Contact está en components/, ajusta la ruta si es necesario
import Home from './views/Home'
import Navigation from './views/navigation'
import ProductsView from './views/ProductsView';
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <>
      <Navigation />
      <Routes>
        {/* 🚨 CLAVE 1: Ruta raíz para que Home cargue al iniciar la app */}
        <Route path="/" element={<Home />} /> 
        
        {/* Ruta existente, pero la cambiamos a /contacto para ser coherentes con tu botonera si usas Link */}
        <Route path="/contacto" element={<Contact />} /> 
        
        {/* 🚨 CLAVE 2: LA RUTA FALTANTE. Ahora /productos cargará tu lista. */}
        <Route path="/productos" element={<ProductsView />} />
        
        {/* (Puedes quitar la ruta /home si usas la ruta / como tu inicio) */}
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </>
  )
}

export default App
