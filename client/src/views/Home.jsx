// 🚨 IMPORTACIÓN CLAVE: Debemos importar ProductList para poder usarlo.
import ProductList from '../components/ProductList';

export default function Home() {
return (
    <div className="bg-gradient-to-r from-[#000000] from-0% via-[#0a0a20] via-30% to-[#000033] to-80% min-h-screen">
    
      {/* Hero con imagen - (ESTO NO SE MODIFICA) */}
    <div className="relative w-full">
        <img
            src="/ip.png"
            alt="Imagen futurista gamer"
            className="w-full h-[500px] object-cover"
        />


        {/* Botón encima de la imagen - (ESTO NO SE MODIFICA) */}
        <div className="absolute inset-0 flex justify-center items-start pt-20">
        <a
            href="/productos"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
            Ver todos los productos
        </a>
        </div>
    </div>

      {/* Título Productos Destacados - (ESTO NO SE MODIFICA) */}
    

      {/* 🚨 REEMPLAZO CLAVE: Eliminamos el div del grid y lo reemplazamos por el componente ProductList */}
    
        {/*
            COMENTARIO: Tu componente ProductList.jsx ya contiene la lógica del grid:
            <div className="grid grid-cols-3 gap-8 px-6"> ... </div>.
            Por lo tanto, solo necesitamos llamar al componente aquí.
        */}
        <ProductList /> 

    </div>
)
}