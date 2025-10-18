import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ mostrarTodos = false }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL_API = "http://localhost:4002/api/v1/products";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(URL_API);
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="p-4 w-full">
        <p className="text-white text-center py-10">Cargando productos...</p>
      </div>
    );
  }

  
  const lista = mostrarTodos ? productos : productos.slice(0, 6);

  return (
    <section className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] py-16">
      <div className="w-full px-10 pb-16">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          {mostrarTodos ? "Catálogo Completo" : "Productos Destacados"}
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
          {lista.map((producto) => (
            <div key={producto.id} className="flex justify-center">
              <ProductCard
                id={producto.id}
                nombre={producto.name}
                precio={producto.price}
                imagenUrl={producto.imageUrl}
                stock={producto.stock}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductList;

