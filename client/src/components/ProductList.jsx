import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"; 

const ProductList = () => {
    const [productos, setProductos] = useState([]); 
    
    const URL_API = "http://localhost:4002/api/v1/products"; 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(URL_API);
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
                const data = await response.json();
                setProductos(data); 
            } catch (error) {
                console.error("Error al obtener los productos:", error); 
            }
        };
        fetchProducts();
    }, []); 

    return (
        <div className="p-4 w-full"> 
            
            {/* ESTE DIV APLICA LA CUADRÍCULA (GRID) */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
                
                {productos.length > 0 ? (
                    productos.map((producto) => (
                        <ProductCard
                            key={producto.id} 
                            id={producto.id}
                            nombre={producto.name}   
                            precio={producto.price}  
                            imagenUrl={producto.imageUrl} 
                            stock={producto.stock}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 col-span-full text-center py-10">
                        {productos.length === 0 ? "Cargando productos..." : "No se encontraron productos disponibles."}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductList;
