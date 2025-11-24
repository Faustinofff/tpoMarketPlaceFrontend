import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../redux/productSlice";

const LatestProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    if (!products.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const latestProducts = products.slice(-3);

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
