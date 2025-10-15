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
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Volver al inicio
      </button>
    </div>
  );
}
