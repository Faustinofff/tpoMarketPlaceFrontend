// src/views/Login.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, role, status, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Si ya hay token, redirige a home automáticamente
  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Mostrar pantalla diferente si ya hay token
  if (token) {
    return (
      <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-8 text-white">
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

        {status === "loading" && <p className="text-yellow-400 mb-4">Cargando...</p>}
        {status === "failed" && <p className="text-red-400 mb-4">{error}</p>}

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
