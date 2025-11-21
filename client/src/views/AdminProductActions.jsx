import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct, deleteProduct } from "../redux/productSlice"; // Importar las acciones

export default function AdminProductActions() {
    const dispatch = useDispatch();
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
    const [products, setProducts] = useState([]); // Estado para los productos cargados
    const [search, setSearch] = useState(""); // Estado para la búsqueda

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
    };

    // ** Eliminar un producto **
    const handleDeleteProduct = () => {
        if (!deleteId.trim()) {
            alert("Por favor, ingresa un ID válido para eliminar.");
            return;
        }
        dispatch(deleteProduct(deleteId)); // Usamos el dispatch de Redux para eliminar un producto
        setDeleteId("");
    };

    // ** Modificar un producto **
    const handleEditProduct = () => {
        if (!editId.trim()) {
            alert("Por favor, ingresa el ID del producto a modificar.");
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
            alert("No se han realizado cambios.");
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
    };

    // Cargar los productos al iniciar
    useEffect(() => {
        // Simulación de llamada a la API
        const fetchProducts = async () => {
            const response = await fetch("http://localhost:4002/api/v1/products");
            const data = await response.json();
            setProducts(data);  // Guardar los productos en el estado
        };

        fetchProducts();
    }, []);

    // Filtrar productos según el término de búsqueda
    const filteredProducts = (products || []).filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) || product.id.toString().includes(search)
    );

    return (
        <div className="p-8 text-white">
            <h2 className="text-3xl mb-2 font-bold">Gestión de productos</h2>

            {/* Buscar productos */}
            <div className="mb-10">
                <h3 className="text-lg mb-3 font-semibold">Buscar Producto</h3>
                <input
                    type="text"
                    placeholder="Buscar por ID o nombre..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 w-full mb-3"
                />
                {/* Mostrar lista de productos filtrados */}
                {search && (
                    <div className="bg-gray-700 p-2 rounded-lg mt-2">
                        <ul className="max-h-40 overflow-y-auto">
                            {filteredProducts.map((product) => (
                                <li
                                    key={product.id}
                                    className="text-white p-2 cursor-pointer hover:bg-gray-600"
                                    onClick={() => {
                                        setEditId(product.id);
                                        setDeleteId(product.id);
                                        setSearch(""); // Limpiar la búsqueda
                                    }}
                                >
                                    {product.id} - {product.name}
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
