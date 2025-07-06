import CategoryList from "@/UIBlocks/CategoryList";
import ProductCard, { type ProductItem } from "@/UIBlocks/ProductCard";
import vehicles from "../../assets/category/vehicles.png";
import BannerCarousel from "@/UIBlocks/BannerCarousel";

function Home() {
  const demoProducts: ProductItem[] = [
    { id: 1, title: "Stylish Shirt", image: vehicles, price: 29.99 },
    { id: 2, title: "Running Shoes", image: vehicles, price: 49.99 },
    { id: 3, title: "Leather Bag", image: vehicles, price: 39.99 },

  ];

  const slides = [
  {
    image: vehicles,
    title: "Trendy Fashion Wear",
    price: "$49.99",
    discount: "20% off on all items",
  },
  {
    image: vehicles,
    title: "Smart Gadgets",
    price: "$199.99",
    discount: "Flat ₹1000 off",
  },
  {
    image: vehicles,
    title: "Home Furnishing",
    price: "$89.99",
    discount: "Save up to 30%",
  },
];
  return (
    <div>
      <CategoryList />
      <BannerCarousel slides={slides} delay={4000}/>
      <ProductCard title="Popular Items" products={demoProducts} />
      <ProductCard title="Recommended for You" products={demoProducts} />
    </div>
  );
}

export default Home;
