export default function Footer() {
  return (
    <footer
      className="bg-gradient-to-r from-[#000000] via-[#0a0a20] to-[#000033]
                 text-white py-6 mt-10 border-t border-gray-700 text-center"
    >
      
      <h2 className="text-2xl font-bold text-[#00ffff] mb-2">ElectroShop</h2>
      <p className="text-gray-400 text-sm mb-4">
        Tu tienda de tecnología favorita ⚡
      </p>

      
      <div className="flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-300 mb-2">
        <p>Instagram: electroshop.ar</p>
        <p>Facebook: ElectroShop Oficial</p>
        <p>TikTok: @electroshop.ar</p>
      </div>

      
      <div className="text-gray-400 text-sm">
        <p>Correo: contacto@electroshop.com</p>
        <p>Teléfono: +54 11 2233 4455</p>
      </div>

      
      <p className="text-gray-500 text-xs mt-4">
        📍 Av. Corrientes 4567, Buenos Aires — © {new Date().getFullYear()} ElectroShop
      </p>
    </footer>
  );
}
