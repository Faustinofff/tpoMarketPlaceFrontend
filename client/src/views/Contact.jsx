const Contact = () => {
    return (
        // Mantienes el fondo degradado. Quitamos text-white de aquí.
        <div className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033] min-h-screen flex flex-col items-center pt-20 p-8">
            
            {/* Título: Usamos estilo inline para forzar el color blanco */}
            <h2 
                className="text-4xl font-extrabold mb-10 text-center border-b-2 border-indigo-500 pb-2" 
                style={{ color: '#ffffff' }}
            >
                Contactate con nosotros
            </h2>
            
            {/* Contenedor del contenido */}
            <div className="bg-gray-700/30 backdrop-blur-sm p-8 rounded-xl shadow-lg w-full max-w-md text-center">
                
                {/* Texto 1: Usamos estilo inline para forzar el color blanco */}
                <p
                    className="text-xl font-semibold mb-4"
                    style={{ color: '#ffffff' }}
                >
                    Para consultas o soporte, envíanos un correo a:
                </p>
                
                {/* Correo: Usamos un color claro brillante (indigo-400) */}
                <p className="text-xl font-semibold mb-4"
                    style={{ color: '#ffffff' }}
                >
                    electroshop@gmail.com
                </p>
            </div>
        </div>
    )
}

export default Contact
