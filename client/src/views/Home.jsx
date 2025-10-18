import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen">
      
      {/* Hero con imagen */}
      <div className="relative w-full h-[500px]">
        <img
          src="/ip.png"
          alt="Imagen futurista gamer"
          className="w-full h-full object-cover"
        />

        {/* Botón futurista centrado a la derecha */}
        <div className="absolute top-1/2 right-1/6 transform -translate-y-1/2">
          <button
            onClick={() => window.location.href = "/productos"}
            className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                       text-white font-bold tracking-wide
                       text-lg px-8 py-4
                       rounded-full shadow-lg
                       hover:scale-105 transition-transform duration-300
                       flex items-center justify-center whitespace-nowrap"
          >
            Ver todos los productos
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="mt-10">
        <ProductList />
      </div>
    </div>
  );
}
