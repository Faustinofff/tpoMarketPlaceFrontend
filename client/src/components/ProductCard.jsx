// El componente recibe los props con los nombres del frontend
const ProductCard = ({ id, nombre, precio, imagenUrl, stock }) => { 
    
    // El precio de BigDecimal lo recibimos como string y lo mostramos directamente
    const precioFormateado = precio ? precio.toString() : 'N/A';
    const sinStock = stock === 0;

    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden w-1/3"> 
            <img 
                src={imagenUrl} 
                alt={nombre} 
                className="w-full h-32 object-cover"
            />
            <div className="p-3">
                <h3 className="font-semibold text-base text-white">{nombre}</h3>
                {/* Mostramos el precio */}
                <p className="text-gray-400 text-sm">${precioFormateado}</p> 
                
                {/* 🎯 Implementación Rápida del requisito: Sin Stock */}
                {sinStock ? (
                    <button className="mt-2 w-full bg-red-600 text-white px-3 py-1 rounded text-sm cursor-not-allowed" disabled>
                        AGOTADO
                    </button>
                ) : (
                    <button 
                        className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        onClick={() => console.log(`Agregando al carrito el ID: ${id}`)} 
                    >
                        Agregar al carrito
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductCard;