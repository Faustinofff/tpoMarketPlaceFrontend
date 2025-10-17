import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  // Verifica si ya hay un token en localStorage al cargar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Token recuperado de localStorage al cargar el componente:", storedToken); // Verifica si el token está en localStorage
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Limpiar el error antes de hacer la solicitud

    try {
      const response = await fetch("http://localhost:4002/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");  // Si la respuesta no es ok, lanzar un error
      }

      const data = await response.json();
      console.log("Datos recibidos del backend:", data);  // Verifica los datos que recibes del backend
      localStorage.setItem("token", data.access_token);  // Guardar el token en localStorage
      setToken(data.access_token);  // Establecer el token en el estado

      alert("Inicio de sesión exitoso ✅");
      window.location.href = "/home";  // Redirigir al home
    } catch (err) {
      setError(err.message);  // Mostrar el error si ocurre
      console.error("Error al hacer login:", err);  // Log del error
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  // Eliminar el token de localStorage
    setToken(null);  // Limpiar el token en el estado
    alert("Sesión cerrada correctamente 👋");
    window.location.href = "/login";  // Redirigir a la página de login
  };

  // Si ya existe un token, mostrar un mensaje y permitir cerrar sesión
  if (token) {
    console.log("Token actual en el estado:", token);  // Verifica el token en el estado
    return (
      <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-8" style={{ color: "#ffffff" }}>
          ¡Ya iniciaste sesión!
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  // Si no hay token, mostrar el formulario de login
  return (
    <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl font-bold text-white mb-8">Iniciar Sesión</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-700/30 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md text-center"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 rounded bg-gray-800 text-white"
        />

        {error && <p className="text-red-400 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default Login;
