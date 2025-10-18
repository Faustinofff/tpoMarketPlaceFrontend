import { useState, useEffect } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Token recuperado de localStorage al cargar el componente:", storedToken); 
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const response = await fetch("http://localhost:4002/api/v1/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");  
      }

      const data = await response.json();
      console.log("Datos recibidos del backend:", data);  
      localStorage.setItem("token", data.access_token);  
      setToken(data.access_token); 

      alert("Inicio de sesión exitoso ✅");
      window.location.href = "/home";  
    } catch (err) {
      setError(err.message);  
      console.error("Error al hacer login:", err);  
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  
    setToken(null);  
    alert("Sesión cerrada correctamente 👋");
    window.location.href = "/login";  
  };

  
  if (token) {
    console.log("Token actual en el estado:", token);  
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
