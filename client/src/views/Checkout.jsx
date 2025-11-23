// src/views/Checkout.jsx
import { useDispatch, useSelector } from "react-redux";
import { checkoutOrder } from "../redux/orderSlice"; // Importar la acción de checkout
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// ... otros imports y estado

const handleCheckout = async () => {
  console.log("Token que se envía en checkout:", token);

  if (!token) {
    alert("No estás autenticado. Por favor, inicia sesión.");
    navigate("/login");
    return;
  }
  if (!validate()) {
    alert("Corrige los errores del formulario.");
    return;
  }

  try {
    // Aquí estamos despachando la acción que procesa la orden
    const response = await dispatch(
      checkoutOrder({
        shippingInfo: shippingInfo, // Información de envío
        paymentInfo: cardInfo,       // Información de pago
      }).unwrap() // El `unwrap` te permite capturar directamente el resultado o el error
    );

    // Si todo sale bien, limpia el carrito y navega a la página de confirmación
    dispatch(clearCart());
    navigate("/order-confirmation", { state: { orderDetails: response } });
  } catch (error) {
    console.error("Error al realizar la compra:", error);
    toast.error("Hubo un error al procesar tu compra.");
  }
};
