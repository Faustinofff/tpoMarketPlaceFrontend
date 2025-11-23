import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct, deleteProduct, fetchProducts } from "../redux/productSlice";
import { toast } from "react-toastify";

export default function AdminProductActions() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products || []);
  const token = useSelector((state) => state.auth.token); // Token desde Redux

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

  const [search, setSearch] = useState(""); 
  const [isSearchClicked, setIsSearchClicked] = useState(false); 

  useEffect(() => {
    if (token) dispatch(fetchProducts(token));
  }, [dispatch, token]);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.id.toString().includes(search)
  );

  // Agregar producto
  const handleAddProduct = () => {
    if (!token) {
      toast.error("Debes iniciar sesión para agregar productos.");
      return;
    }

    dispatch(createProduct({ ...newProduct, token }));
    setNewProduct({ name: "", description: "", price: "", stock: "", categoryId: "", imageUrl: "" });
    toast.success("Producto agregado con éxito!");
  };

  // Eliminar producto
  const handleDeleteProduct = () => {
    if (!deleteId) {
      toast.error("Por favor, ingresa un ID válido para eliminar.");
      return;
    }

    dispatch(deleteProduct({ id: deleteId, token }));
    setDeleteId("");
    toast.success(`Producto con ID ${deleteId} eliminado con éxito`);
  };

  // Modificar producto
  const handleEditProduct = () => {
    if (!editId) {
      toast.error("Por favor, ingresa el ID del producto a modificar.");
      return;
    }

    const updatedData = {};
    if (editData.name) updatedData.name = editData.name;
    if (editData.price) updatedData.price = editData.price;
    if (editData.stock) updatedData.stock = editData.stock;
    if (editData.imageUrl) updatedData.imageUrl = editData.imageUrl;
    if (editData.categoryId) updatedData.categoryId = editData.categoryId;

    if (Object.keys(updatedData).length === 0) {
      toast.error("No se han realizado cambios.");
      return;
    }

    dispatch(updateProduct({ id: editId, ...updatedData, token }));
    setEditId("");
    setEditData({ name: "", price: "", stock: "", imageUrl: "", categoryId: "" });
    toast.success("Producto modificado con éxito!");
  };

  const handleSearchClick = () => setIsSearchClicked(true);

  const handleSelectProduct = (producto) => {
    setSearch(producto.name);
    setIsSearchClicked(false);
    setDeleteId(producto.id);
    setEditId(producto.id);
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl mb-2 font-bold">Gestión de productos</h2>

      {/* Barra de búsqueda */}
      <div className="flex justify-center mb-10 relative">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={handleSearchClick}
          className="w-full max-w-lg px-5 py-3 rounded-full bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffff] transition-all duration-300 hover:ring-[#00ffff]"
        />

        {isSearchClicked && filteredProducts.length > 0 && (
          <div className="absolute mt-2 w-full max-w-lg bg-black rounded-lg shadow-lg z-10">
            <ul className="max-h-64 overflow-auto">
              {filteredProducts.map((producto) => (
                <li
                  key={producto.id}
                  className="p-2 text-sm hover:bg-gray-800 cursor-pointer flex justify-between items-center border-b-2 border-gray-700"
                  onClick={() => handleSelectProduct(producto)}
                >
                  <div className="text-white">
                    <span className="font-semibold">{producto.name}</span><br/>
                    <span>ID: {producto.id}</span><br/>
                    <span>{producto.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Agregar producto */}
      <div className="mb-10">
        <h3 className="text-lg mb-3 font-semibold">Agregar Producto</h3>
        <div className="grid grid-cols-6 gap-2">
          {["name", "description", "price", "stock", "categoryId", "imageUrl"].map((field, index) => (
            <input
              key={index}
              type={field === "price" || field === "stock" || field === "categoryId" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newProduct[field]}
              onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
              className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          ))}
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-6 bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff] text-white font-bold px-8 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Agregar Producto
        </button>
      </div>

      {/* Eliminar producto */}
      <div className="mb-10">
        <h3 className="text-lg mb-3 font-semibold">Eliminar Producto</h3>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="ID del producto"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 w-40"
          />
          <button
            onClick={handleDeleteProduct}
            className="bg-gradient-to-r from-red-700 via-red-500 to-pink-500 text-white font-bold px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
          >
            Eliminar Producto
          </button>
        </div>
      </div>

      {/* Modificar producto */}
      <div>
        <h3 className="text-lg mb-2 font-semibold">Modificar Producto</h3>
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
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Nuevo precio"
            value={editData.price}
            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Nuevo stock"
            value={editData.stock}
            onChange={(e) => setEditData({ ...editData, stock: e.target.value })}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Nueva URL imagen"
            value={editData.imageUrl}
            onChange={(e) => setEditData({ ...editData, imageUrl: e.target.value })}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Nuevo ID categoría"
            value={editData.categoryId}
            onChange={(e) => setEditData({ ...editData, categoryId: e.target.value })}
            className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleEditProduct}
          className="bg-gradient-to-r from-[#000033] via-[#1e3fff] to-[#00ffff] text-white font-bold px-8 py-2 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Modificar Producto
        </button>
      </div>
    </div>
  );
}
