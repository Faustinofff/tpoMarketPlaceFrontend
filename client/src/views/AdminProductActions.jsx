import { useState } from "react";
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
  const [deleteId, setDeleteId] = useState("");
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="text-white p-4">
        <h2 className="text-xl mb-4">
          No tienes permisos para acceder a esta sección. Inicia sesión primero.
        </h2>
        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff] 
                     text-white font-bold px-6 py-2 rounded-full shadow-lg
                     hover:scale-105 transition-transform duration-300"
        >
          Ir al login
        </button>
      </div>
    );
  }

  // ➕ Agregar producto
  const handleAddProduct = async () => {
    try {
      const response = await fetch("http://localhost:4002/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        alert("✅ Producto agregado con éxito");
        setNewProduct({
          name: "",
          description: "",
          price: "",
          stock: "",
          categoryId: "",
          imageUrl: "",
        });
      } else {
        alert("⚠️ Hubo un problema al agregar el producto");
      }
    } catch (error) {
      alert("❌ Error al conectar con el servidor");
      console.error(error);
    }
  };

  // 🗑️ Eliminar producto
  const handleDeleteProduct = async () => {
    if (!deleteId.trim()) {
      alert("Por favor, ingresa un ID válido para eliminar.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4002/api/v1/products/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert(`🗑️ Producto con ID ${deleteId} eliminado con éxito`);
        setDeleteId("");
      } else {
        alert("⚠️ Hubo un problema al eliminar el producto");
      }
    } catch (error) {
      alert("❌ Error al conectar con el servidor");
      console.error(error);
    }
  };

  // ✏️ Modificar producto
  const handleEditProduct = async () => {
    if (!editId.trim()) {
      alert("Por favor, ingresa el ID del producto a modificar.");
      return;
    }

    const updatedData = {};
    if (editData.name) updatedData.name = editData.name;
    if (editData.price) updatedData.price = editData.price;
    if (editData.stock) updatedData.stock = editData.stock;
    if (editData.imageUrl) updatedData.imageUrl = editData.imageUrl;
    if (editData.categoryId) updatedData.categoryId = editData.categoryId;

    try {
      const response = await fetch(
        `http://localhost:4002/api/v1/products/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        alert(`✅ Producto con ID ${editId} modificado con éxito`);
        setEditId("");
        setEditData({
          name: "",
          price: "",
          stock: "",
          imageUrl: "",
          categoryId: "",
        });
      } else {
        alert("⚠️ No se pudo modificar el producto");
      }
    } catch (error) {
      console.error("❌ Error al modificar producto:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl mb-2 font-bold">Gestión de productos</h2>
      <p className="mb-6 text-yellow-400">
        Nota: Solo un admin o seller puede realizar estas acciones.
      </p>

      {/* ➕ Agregar producto */}
      <div className="mb-10">
        <h3 className="text-lg mb-3 font-semibold">Agregar Producto</h3>
        <div className="grid grid-cols-6 gap-2">
          {["name", "description", "price", "stock", "categoryId", "imageUrl"].map(
            (field, index) => (
              <input
                key={index}
                type={
                  field === "price" ||
                  field === "stock" ||
                  field === "categoryId"
                    ? "number"
                    : "text"
                }
                placeholder={
                  field === "name"
                    ? "Nombre"
                    : field === "description"
                    ? "Descripción"
                    : field === "price"
                    ? "Precio"
                    : field === "stock"
                    ? "Stock"
                    : field === "categoryId"
                    ? "ID Categoría"
                    : "URL de imagen"
                }
                value={newProduct[field]}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, [field]: e.target.value })
                }
                className="p-2 bg-gray-800 border border-gray-600 rounded text-white
                           placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-cyan-400"
              />
            )
          )}
        </div>

        <button
          onClick={handleAddProduct}
          className="mt-6 bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                     text-white font-bold px-8 py-2 rounded-full shadow-lg
                     hover:scale-105 transition-transform duration-300"
        >
          Agregar Producto
        </button>
      </div>

      {/* 🗑️ Eliminar producto */}
      <div className="mb-10">
        <h3 className="text-lg mb-2 font-semibold">Eliminar Producto</h3>
        <p className="text-yellow-400 mb-3">
          Nota: Solo un admin o seller puede eliminar productos.
        </p>

        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="ID del producto"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white
                       placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-red-500 w-40"
          />
          <button
            onClick={handleDeleteProduct}
            className="bg-gradient-to-r from-red-700 via-red-500 to-pink-500
                       text-white font-bold px-6 py-2 rounded-full shadow-lg
                       hover:scale-105 transition-transform duration-300"
          >
            Eliminar Producto
          </button>
        </div>
      </div>

      {/* ✏️ Modificar producto */}
      <div>
        <h3 className="text-lg mb-2 font-semibold">Modificar Producto</h3>
        <p className="text-yellow-400 mb-3">
          Nota: Solo un admin o seller puede editar productos.
        </p>

        <div className="grid grid-cols-6 gap-3 mb-3">
          <input
            type="number"
            placeholder="ID del producto"
            value={editId}
            onChange={(e) => setEditId(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Nuevo nombre"
            value={editData.name}
            onChange={(e) =>
              setEditData({ ...editData, name: e.target.value })
            }
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Nuevo precio"
            value={editData.price}
            onChange={(e) =>
              setEditData({ ...editData, price: e.target.value })
            }
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Nuevo stock"
            value={editData.stock}
            onChange={(e) =>
              setEditData({ ...editData, stock: e.target.value })
            }
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Nueva URL imagen"
            value={editData.imageUrl}
            onChange={(e) =>
              setEditData({ ...editData, imageUrl: e.target.value })
            }
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Nuevo ID categoría"
            value={editData.categoryId}
            onChange={(e) =>
              setEditData({ ...editData, categoryId: e.target.value })
            }
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleEditProduct}
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff]
                     text-white font-bold px-8 py-2 rounded-full shadow-lg
                     hover:scale-105 transition-transform duration-300"
        >
          Modificar Producto
        </button>
      </div>
    </div>
  );
}
