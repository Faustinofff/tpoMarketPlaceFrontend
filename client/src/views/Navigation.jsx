import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

export default function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth?.token);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== '') {
      navigate(`/productos?query=${encodeURIComponent(search)}`);
      setSearch('');
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav
      className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] 
                 text-white px-8 py-3 flex items-center justify-between shadow-md 
                 border-b border-t border-transparent border-image-slice-1 border-image-repeat-stretch"
      style={{
        borderImage:
          'linear-gradient(to right, #000000 0%, #00f0ff 50%, #000000 100%) 1',
      }}
    >
      <h1 className="text-2xl font-bold text-white">ElectroShop</h1>

      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded-full bg-gray-800 text-white border border-gray-600 
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffff] w-[250px]"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                     text-white font-semibold px-4 py-2 rounded-full hover:scale-105 
                     transition-transform duration-200"
        >
          Buscar
        </button>
      </form>

      <div style={{ display: 'flex', gap: '40px' }}>
        <Link
          to="/home"
          className="relative px-4 py-2 rounded-full transition-all duration-300 
                     hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Inicio
        </Link>

        <Link
          to="/productos"
          className="relative px-4 py-2 rounded-full transition-all duration-300 
                     hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Productos
        </Link>

        <Link
          to="/cart"
          className="relative px-4 py-2 rounded-full transition-all duration-300 
                     hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Carrito
        </Link>

        {!token && (
          <Link
            to="/login"
            className="relative px-4 py-2 rounded-full transition-all duration-300 
                       hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Login
          </Link>
        )}

        {token && (
          <button
            onClick={handleLogout}
            className="relative px-4 py-2 rounded-full transition-all duration-300 
                       hover:bg-gradient-to-r from-[#ff4d4d] via-[#ff1a1a] to-[#ff4d4d] text-white font-semibold"
          >
            Cerrar Sesión
          </button>
        )}

        <Link
          to="/contact"
          className="relative px-4 py-2 rounded-full transition-all duration-300 
                     hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Sobre nosotros
        </Link>

        
        <Link
          to="/admin"
          className="relative px-4 py-2 rounded-full transition-all duration-300 
                     hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Gestión de Productos
        </Link>
      </div>
    </nav>
  );
}
