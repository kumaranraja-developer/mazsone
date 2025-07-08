import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "@/pages/app/api/apiClients";
import ProductCard from "./ProductCard";
import VerticalImageList from "@/Slider/VerticalImageList";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  images?: string[]; // Optional if you support multiple
}

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    apiClient
      .get(`/api/products/${id}`)
      .then((res) => {
  const data = res.data.data || res.data;

  // ✅ Convert images array of objects into image URLs
  const imageList = Array.isArray(data.images) && data.images.length > 0
    ? data.images.map((img: any) => `http://127.0.0.1:8000/${img.path}`)
    : [`http://127.0.0.1:8000/${data.image}`];

  setSelectedImage(imageList[0]);
  setProduct({
    ...data,
    images: imageList,
  });
})

      .catch((err) => {
        console.error(err);
        setError("Product not found");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!product || error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="px-4 py-10 mx-auto">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* --- Main image section --- */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          {/* Vertical Image List - only on md and up */}
          <div className="hidden md:block">
            <VerticalImageList
              images={product.images || []}
              selectedIndex={(product.images || []).findIndex(
                (img) => img === selectedImage
              )}
              onSelect={(index) => setSelectedImage(product.images![index])}
            />
          </div>

          {/* Main Image */}
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full max-w-sm object-contain rounded shadow-lg"
          />

          {/* Horizontal Image List - only on small screens */}
          <div className="md:hidden mt-4 w-full overflow-x-auto">
            <div className="flex gap-2">
              {(product.images || []).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-cover cursor-pointer border ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  alt={`thumb-${index}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* --- Product details section --- */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-green-700 font-semibold">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-base text-gray-700">{product.description}</p>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-12">
        <ProductCard title="Similar Products" api={"api/products"} />
      </div>
    </div>
  );
}

export default ProductPage;
