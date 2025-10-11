import React from 'react';
import ProductList from '../components/ProductList';

const ProductsView = () => {
    return (
        // Usamos el fondo oscuro consistente con el resto de la app
        <div className="bg-black min-h-screen pt-20"> 
            
            <h1 className="text-5xl font-extrabold text-white text-center mb-10">
                Catálogo Completo
            </h1>
            
            {/* El componente ProductList es el que se encarga de llamar a la API y mostrar el grid */}
            <ProductList />
            
        </div>
    );
};

export default ProductsView;