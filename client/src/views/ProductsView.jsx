import React from "react";
import ProductList from "../components/ProductList";

const ProductsView = () => {
  return (
    <div className="bg-black min-h-screen pt-20">
      <ProductList mostrarTodos={true} />
    </div>
  );
};

export default ProductsView;
