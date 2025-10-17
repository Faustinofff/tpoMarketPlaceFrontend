import { Link } from 'react-router-dom';

export default function Navigation() {
  // Suponiendo que el rol se guarda en el token o en algún estado global
  const token = localStorage.getItem('token');
  const userRole = token ? JSON.parse(atob(token.split('.')[1])).role : null;  // Obtener el rol del token, asumiendo que es un JWT

  return (
    <nav
      className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] text-white px-8 py-3 flex items-center justify-between shadow-md border-b border-t border-transparent border-image-slice-1 border-image-repeat-stretch"
      style={{
        borderImage: 'linear-gradient(to right, #000000 0%, #00f0ff 50%, #000000 100%) 1',
      }}
    >
      <h1 className="text-2xl font-bold" style={{ color: 'white' }}>
        ElectroShop
      </h1>

      {/* LINKS */}
      <div style={{ display: 'flex', gap: '40px' }}>
        <Link
          to="/home"
          className="relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#00f0ff] hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Inicio
        </Link>

        <Link
          to="/cart"
          className="relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#00f0ff] hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Carrito
        </Link>

        <Link
          to="/login"
          className="relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#00f0ff] hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Login
        </Link>

        <Link
          to="/contact"
          className="relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#00f0ff] hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Contacto
        </Link>

        {/* Enlace solo visible si el usuario tiene rol de admin o seller */}
        
          <Link
            to="/admin"
            className="relative px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#00f0ff] hover:bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]"
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Gestión de Productos
          </Link>
        
      </div>
    </nav>
  );
}
