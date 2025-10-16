import React from 'react';
import ProductList from '../components/ProductList';

const ProductsView = () => {
    return (
        <div className="bg-black min-h-screen pt-20">
            <h1 className="text-5xl font-extrabold text-white text-center mb-10">
                Catálogo Completo
            </h1>

            {/* ProductList se encarga del fetch y grid */}
            <ProductList />
        </div>
    );
};

export default ProductsView;
