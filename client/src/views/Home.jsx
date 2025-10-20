import ProductList from '../components/ProductList';

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen">
      
      {/* Imagen principal un poco más abajo */}
      <div className="relative w-full h-[500px] mt-8">
        <img
          src="/ip.png"
          alt="Imagen futurista gamer"
          className="w-full h-full object-cover"
        />

        {/* Título y frase encima de la imagen, a la izquierda */}
        <div className="absolute top-1/4 left-12 text-left">
          <h1 className="text-5xl font-bold text-white mb-4">ELECTROSHOP</h1>
          <p className="text-lg text-white">Te brindamos los dispositivos originales más baratos del país</p>
        </div>

        {/* Botón movido más a la derecha */}
        <div className="absolute top-1/2 right-[5%] transform -translate-y-1/2">
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

      <div className="mt-10">
        <ProductList />
      </div>
    </div>
  );
}
