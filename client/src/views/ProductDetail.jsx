import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then(data => setProduct(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="text-center mt-10 text-xl text-white">Cargando producto...</p>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-96 object-cover rounded"
      />
      <h1 className="text-4xl font-bold mt-4 text-white">{product.name}</h1>
      <p className="text-2xl text-gray-300 mt-2">${Number(product.price).toLocaleString("es-AR")}</p>
      <p className="mt-4 text-gray-400">{product.description}</p>
    </div>
  );
}
