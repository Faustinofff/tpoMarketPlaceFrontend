import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

// ----------------------------------------------------------------------
// COMPONENTE INPUTFIELD (DEFINIDO FUERA DE CHECKOUT)
// ----------------------------------------------------------------------
const InputField = ({ label, name, value, onChange, placeholder, type = "text", error }) => (
  <div className="mb-4">
    <label className="block mb-1 text-sm font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-4 py-2 bg-gray-700 rounded w-full focus:outline-none focus:ring-2 
                  ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-[#00ffff]"}`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

// ----------------------------------------------------------------------

const initialShipping = {
  email: "",
  phone: "",
  country: "",
  address: "",
  city: "",
  zipCode: "",
};

const initialCard = {
  cardNumber: "",
  cardName: "",
  expiryDate: "",
  cvc: "",
};

// CAMBIO 1: El porcentaje de descuento es ahora 20%
const DISCOUNT_PERCENTAGE = 20;

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

  // 🔹 Tomar el token directamente desde Redux (sin fallback)
  const token = useSelector((state) => state.auth?.token);

  const [name, setName] = useState("");
  const [shippingInfo, setShippingInfo] = useState(initialShipping);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardInfo, setCardInfo] = useState(initialCard);
  const [errors, setErrors] = useState({});

  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const isDiscountApplicable = totalItems >= 3;
  const subtotal = cart.total;
  const discountAmount = isDiscountApplicable
    ? subtotal * (DISCOUNT_PERCENTAGE / 100)
    : 0;
  const finalPrice = subtotal - discountAmount;

  const handleNameChange = useCallback((e) => setName(e.target.value), []);

  const handleShippingChange = useCallback((e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCardChange = useCallback((e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber") {
      const numericValue = value.replace(/\D/g, "").substring(0, 16);
      newValue = numericValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    if (name === "expiryDate") {
      const numericValue = value.replace(/\D/g, "").substring(0, 4);
      newValue = numericValue.length > 2
        ? numericValue.substring(0, 2) + "/" + numericValue.substring(2, 4)
        : numericValue;
    }

    if (name === "cvc") {
      newValue = value.replace(/\D/g, "").substring(0, 4);
    }

    setCardInfo((prev) => ({ ...prev, [name]: newValue }));
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "El nombre completo es requerido.";
    if (!shippingInfo.address.trim()) newErrors.address = "La dirección es requerida.";
    if (!shippingInfo.city.trim()) newErrors.city = "La ciudad es requerida.";
    if (!shippingInfo.email.trim()) newErrors.email = "El correo electrónico es requerido.";

    if (paymentMethod === "card") {
      if (cardInfo.cardNumber.replace(/\s/g, "").length !== 16)
        newErrors.cardNumber = "16 dígitos requeridos";
      if (!cardInfo.cardName.trim()) newErrors.cardName = "Nombre del titular requerido";
      if (cardInfo.expiryDate.length !== 5 || !/^\d{2}\/\d{2}$/.test(cardInfo.expiryDate))
        newErrors.expiryDate = "Formato MM/AA";
      if (cardInfo.cvc.length < 3) newErrors.cvc = "CVV/CVC inválido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
      const response = await fetch("http://localhost:4002/api/v1/orders/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        dispatch(clearCart());
        navigate("/order-confirmation", { state: { name } });
      } else {
        const errorText = await response.text();
        console.error("Error del backend:", errorText);
        alert("Hubo un problema al realizar la compra.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className="p-6 text-white min-h-screen bg-black">
      <h2 className="text-3xl mb-8 font-extrabold border-b border-gray-700 pb-4">🧾 Finalizar compra</h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Información de envío */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-[#00ffff]">1. Información de Envío</h3>
          <InputField
            label="Nombre completo"
            name="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Ingresa tu nombre"
            error={errors.name}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Correo electrónico"
              name="email"
              value={shippingInfo.email}
              onChange={handleShippingChange}
              placeholder="ejemplo@correo.com"
              type="email"
              error={errors.email}
            />
            <InputField
              label="Teléfono"
              name="phone"
              value={shippingInfo.phone}
              onChange={handleShippingChange}
              placeholder="Ej. +54 9 11 xxxx-xxxx"
            />
          </div>
          <InputField
            label="Dirección (Calle y número)"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            placeholder="Calle Falsa 123"
            error={errors.address}
          />
          <div className="grid grid-cols-3 gap-4">
            <InputField
              label="Ciudad"
              name="city"
              value={shippingInfo.city}
              onChange={handleShippingChange}
              placeholder="Buenos Aires"
              error={errors.city}
            />
            <InputField
              label="Código Postal"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleShippingChange}
              placeholder="C1425"
            />
            <InputField
              label="País"
              name="country"
              value={shippingInfo.country}
              onChange={handleShippingChange}
              placeholder="Argentina"
            />
          </div>
        </div>

        {/* Método de pago */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-[#00ffff]">2. Método de Pago</h3>
          {/* Tarjeta / Mercado Pago */}
          <div className="flex space-x-4 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={() => setPaymentMethod("card")}
                className="form-radio h-4 w-4 text-[#00ffff] bg-gray-700 border-gray-600 focus:ring-[#00ffff]"
              />
              <span>Tarjeta de Crédito/Débito</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="mercadopago"
                checked={paymentMethod === "mercadopago"}
                onChange={() => setPaymentMethod("mercadopago")}
                className="form-radio h-4 w-4 text-[#00ffff] bg-gray-700 border-gray-600 focus:ring-[#00ffff]"
              />
              <span>Mercado Pago</span>
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="p-4 border border-gray-700 rounded-lg bg-gray-800">
              <InputField
                label="Número de tarjeta"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleCardChange}
                placeholder="XXXX XXXX XXXX XXXX"
                type="text"
                error={errors.cardNumber}
              />
              <InputField
                label="Nombre del titular"
                name="cardName"
                value={cardInfo.cardName}
                onChange={handleCardChange}
                placeholder="Como aparece en la tarjeta"
                type="text"
                error={errors.cardName}
              />
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Fecha de expiración (MM/AA)"
                  name="expiryDate"
                  value={cardInfo.expiryDate}
                  onChange={handleCardChange}
                  placeholder="01/26"
                  type="text"
                  error={errors.expiryDate}
                />
                <InputField
                  label="CVV/CVC"
                  name="cvc"
                  value={cardInfo.cvc}
                  onChange={handleCardChange}
                  placeholder="123"
                  type="password"
                  error={errors.cvc}
                />
              </div>
            </div>
          )}

          {paymentMethod === "mercadopago" && (
            <div className="p-4 border border-gray-700 rounded-lg text-center bg-gray-800">
              <p className="mb-4">Serás redirigido a Mercado Pago para completar tu compra.</p>
              <button
                className="w-full py-3 rounded-md font-bold text-black"
                style={{ backgroundColor: "#00D1FF" }}
                disabled
              >
                Continuar a Mercado Pago
              </button>
            </div>
          )}

          {/* Resumen */}
          <div className="mt-8 pt-4 border-t border-gray-700">
            <h3 className="text-xl font-bold mb-4">Resumen de la Orden</h3>
            <div className="flex justify-between text-lg mb-1">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div
              className="flex justify-between text-lg mb-1"
              style={{ color: isDiscountApplicable ? "#48bb78" : "#cbd5e0" }}
            >
              <span>Descuento ({DISCOUNT_PERCENTAGE}%):</span>
              <span>
                {isDiscountApplicable ? `-${discountAmount.toFixed(2)}` : "No aplica"}
              </span>
            </div>
            <div className="flex justify-between text-lg mb-4">
              <span>Envío:</span>
              <span className="text-green-400">Gratis (Ejemplo)</span>
            </div>
            <div className="flex justify-between text-2xl font-bold text-[#00ffff] pt-2 border-t border-gray-700">
              <span>Total a Pagar:</span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-6 bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                       text-white font-bold text-lg
                       px-8 py-3 rounded-lg shadow-xl
                       hover:scale-[1.02] transition-transform duration-300"
          >
            Pagar y Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
}
    