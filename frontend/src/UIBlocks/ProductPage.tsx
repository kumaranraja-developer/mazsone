import { useParams } from 'react-router-dom';
import vehicle from '../assets/category/vehicles.png'
import ProductCard, { type ProductItem } from './ProductCard';
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const sampleProducts: Product[] = [
  {
    id: 1,
    title: 'Classic Cotton T-Shirt',
    price: 19.99,
    description: 'A comfortable and stylish cotton t-shirt perfect for daily wear. Crafted with soft premium cotton.',
    category: 'Clothing',
    image: vehicle,
  },
  {
    id: 2,
    title: 'Wireless Headphones',
    price: 89.99,
    description: 'Enjoy crystal-clear sound with these noise-canceling wireless headphones. Long battery life and sleek design.',
    category: 'Electronics',
    image: vehicle,
  },
  {
    id: 3,
    title: 'Ceramic Coffee Mug',
    price: 14.49,
    description: 'A stylish ceramic mug for your favorite beverages. Dishwasher safe and microwave friendly.',
    category: 'Kitchenware',
    image: vehicle,
  },
];

function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '1', 10);
  const product = sampleProducts.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-medium">
        Product not found.
      </div>
    );
  }
 const demoProducts: ProductItem[] = [
    { id: 1, title: "Stylish Shirt", image: vehicle, price: 29.99 },
    { id: 2, title: "Running Shoes", image: vehicle, price: 49.99 },
    { id: 3, title: "Leather Bag", image: vehicle, price: 39.99 },

  ];
  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
     

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="w-full flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full max-w-sm object-contain rounded shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-lg text-green-700 font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Category: {product.category}</p>
          <p className="text-base text-gray-700 leading-relaxed">{product.description}</p>

          <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>

      </div>
      <ProductCard title="Similar Products" products={demoProducts} />

    </div>
  );
}

export default ProductPage;
