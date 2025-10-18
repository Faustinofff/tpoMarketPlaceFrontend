import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  
  const { name } = location.state || { name: "Cliente" };

  return (
    <div className="p-6 text-white flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033]">
      <h2 className="text-3xl font-bold mb-4">
        ¡Gracias por tu compra, {name}!
      </h2>

      <p className="mb-8 text-lg text-gray-300">
        Tu pedido ha sido recibido y procesado con éxito.  
        Te enviaremos un correo con los detalles de tu compra.
      </p>
      
      <button
        onClick={() => navigate("/home")}
        className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                   text-white font-bold text-base
                   px-8 py-3 rounded-full shadow-lg
                   hover:scale-105 transition-transform duration-300
                   flex items-center justify-center"
      >
        Volver al inicio
      </button>
    </div>
  );
}

