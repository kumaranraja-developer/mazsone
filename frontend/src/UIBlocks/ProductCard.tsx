import { useNavigate } from "react-router-dom";

export interface ProductItem {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  title: string;
  products: ProductItem[];
}

const ProductCard: React.FC<ProductCardProps> = ({ title, products }) => {
  const navigate = useNavigate();

  const navigateProductPage = (id: number) => {
    navigate(`/product/${id}`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center px-2">
        <h1 className="ml-5 mt-2 font-bold text-[25px]">{title}</h1>
        <p className="text-update text-lg mr-4 mt-2 cursor-pointer hover:underline">More</p>
      </div>

      {/* Product List */}
      <div className="flex gap-4 overflow-x-auto px-2 my-4 scrollbar-hide">
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
            <p className="text-center font-bold text-base">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
