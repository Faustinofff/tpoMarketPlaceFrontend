import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../redux/productSlice";

const LatestProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts()); // Solo si no hay productos cargados
    }
  }, [dispatch, products.length]); // Solo se dispara si los productos están vacíos

  const latestProducts = products.slice(-3); // Tomamos los últimos 3 productos

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
