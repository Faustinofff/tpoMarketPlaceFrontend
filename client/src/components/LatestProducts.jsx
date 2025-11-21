import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../redux/productSlice";

const LatestProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts());  // Obtén los productos desde Redux
  }, [dispatch]);

  // Obtener los últimos 3 productos
  const latestProducts = products.slice(-3);  // Usamos -3 para tomar los últimos 3 productos

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {latestProducts.length > 0 ? (
        latestProducts.map((producto) => (
          <div key={producto.id} className="w-[260px]">
            <ProductCard
              id={producto.id}
              nombre={producto.name}
              precio={producto.price}
              imagenUrl={producto.imageUrl}
              stock={producto.stock}
            />
          </div>
        ))
      ) : (
        <p>No hay productos recientes</p>
      )}
    </div>
  );
};

export default LatestProducts;
