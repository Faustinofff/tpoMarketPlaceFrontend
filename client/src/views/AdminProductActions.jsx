import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminProductActions() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });

  const token = localStorage.getItem("token"); // Obtenemos el token desde localStorage directamente

  // Verificar si el token existe
  if (!token) {
    return (
      <div className="text-white p-4">
        <h2>No tienes permisos para acceder a esta sección. Inicia sesión primero.</h2>
        <button onClick={() => navigate("/login")} className="bg-blue-600 text-white px-4 py-2 rounded">
          Ir al login
        </button>
      </div>
    );
  }

  // Agregar producto
  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:4002/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pasamos el token en la cabecera
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("Producto agregado con éxito");
      } else {
        alert("Hubo un problema al agregar el producto");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
      console.error(error);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4002/api/v1/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Pasamos el token en la cabecera
        },
      });

      if (response.ok) {
        alert("Producto eliminado con éxito");
      } else {
        alert("Hubo un problema al eliminar el producto");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
      console.error(error);
    }
  };

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl mb-4">Gestión de productos</h2>
      <div>
        <h3>Agregar Producto</h3>
        <input
          type="text"
          placeholder="Nombre"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="mb-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="mb-2"
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="mb-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
          className="mb-2"
        />
        <input
          type="number"
          placeholder="ID Categoría"
          value={newProduct.categoryId}
          onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
          className="mb-2"
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={newProduct.imageUrl}
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          className="mb-2"
        />
        <button onClick={handleAddProduct} className="bg-green-500 px-4 py-2 rounded mt-4">
          Agregar Producto
        </button>
      </div>

      <div>
        <h3>Eliminar Producto</h3>
        <button onClick={() => handleDeleteProduct(1)} className="bg-red-600 px-4 py-2 rounded mt-4">
          Eliminar Producto (ID 1)
        </button>
      </div>
    </div>
  );
}

