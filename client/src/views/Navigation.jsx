import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav
      className="bg-gradient-to-r from-[#121212] via-[#0a0a20] to-[#000033] text-white px-8 py-3 flex items-center justify-between shadow-md
                 border-b border-t border-transparent border-image-slice-1 border-image-repeat-stretch"
      style={{
        borderImage: 'linear-gradient(to right, #000000 0%, #00f0ff 50%, #000000 100%) 1',
      }}
    >
      <h1
        className="text-2xl font-bold"
        style={{ color: 'white' }}
      >
        ElectroShop
      </h1>

      {/* LINKS */}
      <div style={{ display: 'flex', gap: '40px' }}>
        <Link
          to="/home"
          className="no-underline text-white hover:text-[#00f0ff] transition-colors duration-200"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Inicio
        </Link>

        <Link
          to="/login"
          className="no-underline text-white hover:text-[#00f0ff] transition-colors duration-200"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Login
        </Link>

        <Link to="/cart" className="hover:text-blue-400">
          Carrito
        </Link>

        <Link
          to="/contact"
          className="no-underline text-white hover:text-[#00f0ff] transition-colors duration-200"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Contacto
        </Link>
      </div>
    </nav>
  );
}
