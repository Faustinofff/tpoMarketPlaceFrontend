import { Link } from 'react-router-dom'

export default function Navigation() {
return (
    // Quitamos 'justify-between' y dejamos que el margen empuje todo.
<nav className="bg-gradient-to-r from-[#121212] from-0% via-[#0a0a20] via-30% to-[#000033] to-80% text-white px-6 py-2 flex items-center shadow-md
               border-b border-t border-transparent border-image-slice-1 border-image-repeat-stretch" // Estas clases solo preparan el borde
               style={{ borderImage: 'linear-gradient(to right, #000000 0%, #00f0ff 50%, #000000 100%) 1' }} // <-- EL ESTILO INLINE FORZADO
    >
    
    <h1
        className="text-white hover:text-[#00f0ff] transition-colors duration-300 cursor-pointer"
        // FORZAMOS LA SEPARACIÓN DE 'Inicio' CON UN MARGEN DERECHO INLINE DE 120px
        style={{ color: 'white', marginRight: '120px' }} 
    >
        ElectroShop
    </h1>

      {/* Links de navegación */}
    <div className="flex">
        <Link to="/home" className="text-white px-4 py-1 rounded-md hover:bg-gray-800 transition-colors duration-200"
>
        Inicio
        </Link>
        <Link to="/contact" className="text-white px-4 py-1 rounded-md hover:bg-gray-800 transition-colors duration-200"
          // Mantiene la separación interna de 100px entre Inicio y Contacto
        style={{ marginLeft: '100px' }}
        >
        Contacto
        </Link>
    </div>

      {/* Este div con flex-grow asegura que los links se mantengan a la izquierda */}
    <div className="flex-grow" />
    
    </nav>
)
}