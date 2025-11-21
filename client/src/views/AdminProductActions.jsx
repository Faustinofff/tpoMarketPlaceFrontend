import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProduct, updateProduct, deleteProduct } from "../redux/productSlice"; // Importar las acciones
import { toast } from "react-toastify";  // Importar react-toastify

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

    return (
        <div className="p-8 text-white">
            <h2 className="text-3xl mb-2 font-bold">Gestión de productos</h2>

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
