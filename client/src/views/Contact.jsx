const Contact = () => {
  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen flex flex-col items-center pt-20 p-8">
      
      {/* Título principal */}
      <h2
        className="text-4xl font-extrabold mb-10 text-center border-b-2 border-[#00ffff] pb-2"
        style={{ color: '#ffffff' }}
      >
        Quiénes somos
      </h2>

      {/* Contenido principal */}
      <div className="bg-gray-700/30 backdrop-blur-sm p-10 rounded-xl shadow-lg w-full max-w-3xl text-center text-white">
        <p className="text-lg mb-6">
          En <span className="font-semibold text-[#00ffff]">ElectroShop</span> somos un equipo apasionado por la tecnología y la innovación. 
          Desde nuestros inicios, trabajamos para acercarte los mejores productos electrónicos 
          con la mejor atención y garantía del mercado.
        </p>

        <p className="text-lg mb-6">
          Nos destacamos por ofrecer una amplia variedad de artículos, desde smartphones 
          y notebooks hasta televisores, consolas y accesorios. Buscamos que cada cliente 
          viva una experiencia de compra simple, rápida y segura.
        </p>

        <p className="text-lg mb-6">
          Nuestro objetivo es seguir creciendo junto a vos, brindándote siempre lo último en 
          tecnología y un servicio confiable, cercano y transparente.
        </p>

        <p className="text-lg text-gray-300 italic">
          💡 ElectroShop — Tecnología que conecta con vos.
        </p>
      </div>
    </div>
  );
};

export default Contact;
