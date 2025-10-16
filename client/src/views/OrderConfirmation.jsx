import { useLocation, useNavigate } from "react-router-dom";

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener el nombre del cliente desde el estado de la navegación
  const { name } = location.state || { name: "Cliente" };

  return (
    <div className="p-6 text-white">
      <h2 className="text-3xl mb-4">¡Gracias por tu compra, {name}!</h2>
      <p className="mb-6">Tu pedido ha sido recibido y procesado con éxito.</p>
      
      <button
        onClick={() => navigate("/home")}
        className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                        text-white font-extrabold 
                        text-8xl h-[50px] w-[200px]
                        rounded-full shadow-2xl 
                        hover:scale-110 transition-transform duration-300 flex items-center justify-center whitespace-nowrap"
      >
        Volver al inicio
      </button>
    </div>
  );
}
