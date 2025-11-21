import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct, deleteProduct, fetchProducts } from "../redux/productSlice"; // Importar las acciones
import { toast } from "react-toastify";  // Importar react-toastify

export default function AdminProductActions() {
  const dispatch = useDispatch();
  
  // Asegurarse de acceder correctamente a los productos desde el estado de Redux
  const products = useSelector((state) => state.products.products || []);  // Accedemos directamente a state.products.products
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
  });
  const [deleteId, setDeleteId] = useState(""); // Estado para el ID de producto a eliminar
  const [editId, setEditId] = useState(""); // Estado para el ID de producto a modificar
  const [editData, setEditData] = useState({
    name: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: "",
  });
  const [search, setSearch] = useState(""); // Estado para la búsqueda
  const [isSearchClicked, setIsSearchClicked] = useState(false); // Estado para controlar la visibilidad de la lista

  useEffect(() => {
    dispatch(fetchProducts()); // Cargar productos al iniciar
  }, [dispatch]);

  // Filtrar productos según la búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()) || product.id.toString().includes(search)
  );

  // ** Agregar un producto **
  const handleAddProduct = () => {
    dispatch(createProduct(newProduct)); // Usamos el dispatch de Redux para crear un producto
    setNewProduct({
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      imageUrl: "",
    });
    toast.success("Producto agregado con éxito!");  // Toast de éxito
  };

  // ** Eliminar un producto **
  const handleDeleteProduct = () => {
    if (!deleteId.trim()) {
      toast.error("Por favor, ingresa un ID válido para eliminar.");  // Toast de error
      return;
    }
    dispatch(deleteProduct(deleteId)); // Usamos el dispatch de Redux para eliminar un producto
    setDeleteId("");
    toast.success(`Producto con ID ${deleteId} eliminado con éxito`);  // Toast de éxito
  };

  // ** Modificar un producto **
  const handleEditProduct = () => {
    if (!editId.trim()) {
      toast.error("Por favor, ingresa el ID del producto a modificar.");  // Toast de error
      return;
    }

    // Crear un objeto con los datos del producto, pero solo incluir los campos modificados
    const updatedData = {};

    if (editData.name) updatedData.name = editData.name;
    if (editData.price) updatedData.price = editData.price;
    if (editData.stock) updatedData.stock = editData.stock;
    if (editData.imageUrl) updatedData.imageUrl = editData.imageUrl;
    if (editData.categoryId) updatedData.categoryId = editData.categoryId;

    // Si no se cambió ningún campo, no hacemos nada
    if (Object.keys(updatedData).length === 0) {
      toast.error("No se han realizado cambios.");  // Toast de error
      return;
    }

    dispatch(updateProduct({ id: editId, ...updatedData }));  // Enviar solo los campos modificados
    setEditId("");  // Limpiar el ID de edición
    setEditData({
      name: "",
      price: "",
      stock: "",
      imageUrl: "",
      categoryId: "",
    });
    toast.success("Producto modificado con éxito!");  // Toast de éxito
  };

  // Función para manejar el clic en la barra de búsqueda
  const handleSearchClick = () => {
    setIsSearchClicked(true); // Mostrar la lista de productos cuando se haga clic en el campo de búsqueda
  };

  // Función para manejar la selección del producto desde la lista
  const handleSelectProduct = (producto) => {
    setSearch(producto.name); // Coloca el nombre del producto en el campo de búsqueda
    setIsSearchClicked(false); // Cierra la lista de sugerencias
    setDeleteId(producto.id); // Rellena el campo de ID para eliminar con el ID del producto
    setEditId(producto.id); // Rellena el campo de ID para modificar con el ID del producto
  };

  return (
    <div className="p-8 text-white">
      <h2 className="text-3xl mb-2 font-bold">Gestión de productos</h2>

      {/* Barra de búsqueda de productos */}
      <div className="flex justify-center mb-10 relative">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={handleSearchClick} // Se activa al hacer clic en la barra de búsqueda
          className="w-full max-w-lg px-5 py-3 rounded-full bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00ffff] transition-all duration-300 hover:ring-[#00ffff]"
        />

        {/* Mostrar los productos filtrados en una lista de sugerencias compacta */}
        {isSearchClicked && filteredProducts.length > 0 && (
          <div className="absolute mt-2 w-full max-w-lg bg-black rounded-lg shadow-lg z-10">
            <ul className="max-h-64 overflow-auto">
              {filteredProducts.map((producto) => (
                <li
                  key={producto.id}
                  className="p-2 text-sm hover:bg-gray-800 cursor-pointer flex justify-between items-center border-b-2 border-gray-700"
                  onClick={() => handleSelectProduct(producto)} // Seleccionamos el producto y actualizamos los IDs
                >
                  <div className="text-white">
                    <span className="font-semibold">{producto.name}</span> <br />
                    <span>ID: {producto.id}</span> {/* Muestra el ID del producto */}
                    <br />
                    <span>{producto.price}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Si no hay productos filtrados */}
      {isSearchClicked && filteredProducts.length === 0 && (
        <p className="text-center text-gray-400 text-lg mt-20">
          No se encontraron productos que coincidan con “{search}”.
        </p>
      )}

      {/* Agregar producto */}
      <div className="mb-10">
        <h3 className="text-lg mb-3 font-semibold">Agregar Producto</h3>
        <div className="grid grid-cols-6 gap-2">
          {["name", "description", "price", "stock", "categoryId", "imageUrl"].map(
            (field, index) => (
              <input
                key={index}
                type={field === "price" || field === "stock" || field === "categoryId" ? "number" : "text"}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newProduct[field]}
                onChange={(e) => setNewProduct({ ...newProduct, [field]: e.target.value })}
                className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            )
          )}
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
