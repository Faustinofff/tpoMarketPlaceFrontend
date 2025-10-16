import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
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

  return (
    <section className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] py-16 flex justify-center">
      <div className="w-full max-w-7xl px-12">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Productos Destacados
        </h2>

        {/* UNA SOLA FILA — 4 TARJETAS CON ESPACIO ENTRE ELLAS */}
        <div className="flex justify-between items-start gap-8">
          {productos.slice(0, 4).map((producto) => (
            <div
              key={producto.id}
              className="flex-1 max-w-[22%]" // Fuerza 4 columnas iguales con espacio
            >
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
