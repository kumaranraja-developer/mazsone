import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@/pages/app/api/apiClients";

// Define shape of product item
export interface ProductItem {
  id: number;
  title: string;
  image: string;
  price: number;
}

// Props interface
interface ProductCardProps {
  title: string;
  api: string; // 📦 Accept dynamic API endpoint
}

const ProductCard: React.FC<ProductCardProps> = ({ title, api }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductItem[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await apiClient.get(api);
      const apiData = response.data.data || response.data;

      const formatted = apiData.map((item: any) => ({
        id: item.id,
        title: item.name || item.title, // fallback
        image: item.image?.startsWith("http")
          ? item.image
          : `http://127.0.0.1:8000/${item.image}`,
        price: item.price,
      }));

      setProducts(formatted);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [api]); // 🔁 refetch when api prop changes

  const navigateProductPage = (id: number) => {
    navigate(`/productpage/${id}`);
  };

 return (
  <div className="w-full">
    {/* Header */}
    <div className="flex justify-between items-center px-4">
      <h1 className="mt-2 font-bold text-[25px]">{title}</h1>
      <p className="text-update text-lg mt-2 cursor-pointer hover:underline">
        More
      </p>
    </div>

    {/* Product List (scrollable) */}
    <div className="w-full overflow-x-auto scrollbar-hide mt-4 px-4">
      <div className="flex gap-4 min-w-max">
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[250px] h-[300px] border border-ring p-2 cursor-pointer flex-shrink-0"
            onClick={() => navigateProductPage(product.id)}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-[200px] h-[200px] mx-auto object-contain transition-transform hover:-translate-y-2 duration-300"
            />
            <p className="text-center text-sm mt-2 truncate">{product.title}</p>
            <p className="text-center font-bold text-base">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default ProductCard;
