import CategoryList from "@/UIBlocks/CategoryList";
import ProductCard from "@/UIBlocks/ProductCard";
import vehicles from "../../assets/category/vehicles.png";
import BannerCarousel from "@/UIBlocks/BannerCarousel";

function Home() {

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
      <ProductCard title="Popular Items" api="/api/products"/>
      <ProductCard title="Recommended for You" api="/api/products"/>
    </div>
  );
}

export default Home;
