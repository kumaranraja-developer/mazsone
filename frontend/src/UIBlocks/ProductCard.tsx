// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import apiClient from "@/pages/app/api/apiClients";
// import ImageButton from "@/Components/Button/ImageBtn";

// export interface ProductItem {
//   id: number;
//   title: string;
//   image: string;
//   price: number;
// }

// interface ProductCardProps {
//   title: string;
//   api: string;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ title, api }) => {
//   const navigate = useNavigate();
//   const [products, setProducts] = useState<ProductItem[]>([]);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [showLeft, setShowLeft] = useState(false);
//   const [showRight, setShowRight] = useState(false);

//   const fetchProducts = async () => {
//     try {
//       const response = await apiClient.get(api);
//       const apiData = response.data.data || response.data;

//       const formatted = apiData.map((item: any) => {
//         const firstImage = item.images?.[0]?.path;
//         return {
//           id: item.id,
//           title: item.name || item.title,
//           image: firstImage
//             ? firstImage.startsWith("http")
//               ? firstImage
//               : `http://127.0.0.1:8000/${firstImage}`
//             : "/placeholder.png",
//           price: item.price,
//         };
//       });

//       setProducts(formatted);
//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [api]);

//   const checkScrollButtons = () => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const isOverflowing = el.scrollWidth > el.clientWidth;
//     const atStart = el.scrollLeft <= 10;
//     const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

//     setShowLeft(isOverflowing && !atStart);
//     setShowRight(isOverflowing && !atEnd);
//   };

//   useEffect(() => {
//     const el = scrollRef.current;
//     if (!el) return;

//     checkScrollButtons(); // check on mount

//     el.addEventListener("scroll", checkScrollButtons);
//     window.addEventListener("resize", checkScrollButtons);

//     return () => {
//       el.removeEventListener("scroll", checkScrollButtons);
//       window.removeEventListener("resize", checkScrollButtons);
//     };
//   }, [products]);

//   const scroll = (direction: "left" | "right") => {
//     const el = scrollRef.current;
//     if (!el) return;

//     const scrollAmount = 300;
//     el.scrollBy({
//       left: direction === "left" ? -scrollAmount : scrollAmount,
//       behavior: "smooth",
//     });
//   };

//   const navigateProductPage = (id: number) => {
//     navigate(`/productpage/${id}`);
//   };

//   return (
//     <div className="relative my-5 mx-[5%] max-w-full overflow-hidden">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="mt-2 font-bold text-foreground/80 text-[25px]">
//           {title}
//         </h1>
//         <p className="text-update text-lg mt-2 cursor-pointer hover:underline">
//           More
//         </p>
//       </div>

//       {/* Left Button */}
//       {showLeft && (
//         <ImageButton
//           onClick={() => scroll("left")}
//           className="absolute left-2 top-[55%] -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
//           icon={"left"}
//         />
//       )}

//       {/* Right Button */}
//       {showRight && (
//         <ImageButton
//           onClick={() => scroll("right")}
//           className="absolute right-2 top-[55%] -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
//           icon={"right"}
//         />
//       )}

//       {/* Product List */}
//       <div ref={scrollRef} className="overflow-x-auto scrollbar-hide mt-4">
//         <div className="flex gap-4 min-w-max py-2">
//           {products.map((product) => (
//             <div
//               key={product.id}
//               className="relative group min-w-[250px] h-max rounded-md p-2 cursor-pointer flex-shrink-0 transition-transform hover:-translate-y-2 duration-300 border border-ring/30"
//               onClick={() => navigateProductPage(product.id)}
//             >
//               {/* Discount Label */}
//               <div className="absolute top-2 m-2 left-2 bg-update text-white text-xs px-2 py-1 z-10">
//                 -3% OFF
//               </div>

//               {/* Hover Icons */}
//               <div className="absolute top-2 right-2 m-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//                 <ImageButton
//                   onClick={(e) => e.stopPropagation()}
//                   className="bg-background text-foreground p-1 rounded-full shadow hover:bg-gray-200"
//                   icon={"cart"}
//                 />
//                 <ImageButton
//                   onClick={(e) => e.stopPropagation()}
//                   className="bg-background text-foreground p-1 rounded-full shadow hover:bg-gray-200"
//                   icon={"like"}
//                 />
//                 <ImageButton
//                   onClick={(e) => e.stopPropagation()}
//                   className="bg-background text-foreground p-1 rounded-full shadow hover:bg-gray-200"
//                   icon={"link"}
//                 />
//               </div>

//               {/* Product Image */}
//               <div className="relative">
//                 <img
//                   src={product.image}
//                   alt={product.title}
//                   className="w-full h-[200px] object-cover rounded-md mx-auto"
//                 />
//                 <div className="absolute bottom-0  left-2 text-foreground/60 text-lg px-2 py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   S.345
//                 </div>
//                 <div className="absolute bottom-0 m-2 right-2 bg-create text-white text-xs px-2 py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                   4 ★
//                 </div>
//               </div>
//               {/* Title */}
//               <p className="text-center text-sm mt-2 truncate">
//                 {product.title}
//               </p>

//               {/* Price */}
//               <p className="text-center font-bold mt-1 text-base text-update">
//                 ₹{product.price}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import product1 from "../assets/products/laptop.webp"
import product2 from "../assets/products/laptop.webp"
import product3 from "../assets/products/laptop.webp"
import product4 from "../assets/products/laptop.webp"
import product5 from "../assets/products/laptop.webp"
import ImageButton from "@/Components/Button/ImageBtn";
export interface ProductItem {
  id: number;
  title: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  title: string;
  api: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, api }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    // ❌ Replace API call with static data
    const dummyData: ProductItem[] = [
      {
        id: 1,
        title: "Red Mountain Bike",
        image: product5,
        price: 7999,
      },
      {
        id: 2,
        title: "Blue Racing Cycle",
        image: product1,
        price: 10500,
      },
      {
        id: 3,
        title: "Electric Scooter",
        image: product2,
        price: 18999,
      },
      {
        id: 4,
        title: "Commuter Motorcycle",
        image: product3,
        price: 52999,
      },
      {
        id: 5,
        title: "Kids Bicycle",
        image: product4,
        price: 3499,
      },
    ];

    setProducts(dummyData);
  }, [api]);

  const checkScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const isOverflowing = el.scrollWidth > el.clientWidth;
    const atStart = el.scrollLeft <= 10;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 10;

    setShowLeft(isOverflowing && !atStart);
    setShowRight(isOverflowing && !atEnd);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollButtons(); // check on mount

    el.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);

    return () => {
      el.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, [products]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 300;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

 const navigateProductPage = (product: ProductItem) => {
  navigate(`/productpage/${product.id}`, {
    state: {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    },
  });
};


  return (
    <div className="relative my-5 mx-[5%] max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="mt-2 font-bold text-foreground/80 text-[25px]">
          {title}
        </h1>
        <p className="text-update text-lg mt-2 cursor-pointer hover:underline">
          More
        </p>
      </div>

      {/* Left Button */}
      {showLeft && (
        <ImageButton
          onClick={() => scroll("left")}
          className="absolute left-2 top-[55%] -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
          icon={"left"}
        />
      )}

      {/* Right Button */}
      {showRight && (
        <ImageButton
          onClick={() => scroll("right")}
          className="absolute right-2 top-[55%] -translate-y-1/2 z-10 bg-white rounded-full shadow p-2 hover:bg-gray-200"
          icon={"right"}
        />
      )}

      {/* Product List */}
      <div ref={scrollRef} className="overflow-x-auto scrollbar-hide mt-4">
        <div className="flex gap-4 min-w-max py-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative group min-w-[250px] h-max rounded-md p-2 cursor-pointer flex-shrink-0 transition-transform hover:-translate-y-2 duration-300 border border-ring/30"
             onClick={() => navigateProductPage(product)}

            >
              {/* Discount Label */}
              <div className="absolute top-2 m-2 left-2 bg-update text-white text-xs px-2 py-1 z-10">
                -3% OFF
              </div>

              {/* Hover Icons */}
              <div className="absolute top-2 right-2 m-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <ImageButton
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background text-foreground p-1 rounded-full shadow hover:bg-gray-200"
                  icon={"cart"}
                />
                <ImageButton
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background text-foreground p-1 rounded-full shadow hover:bg-gray-200"
                  icon={"like"}
                />
                <ImageButton
                  onClick={(e) => e.stopPropagation()}
                  className="bg-background text-foreground p-1 rounded-full shadow hover:bg-gray-200"
                  icon={"link"}
                />
              </div>

              {/* Product Image */}
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-[200px] object-cover rounded-md mx-auto"
                />
                <div className="absolute bottom-0 left-2 text-foreground/60 text-lg px-2 py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  S.345
                </div>
                <div className="absolute bottom-0 m-2 right-2 bg-create text-white text-xs px-2 py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  4 ★
                </div>
              </div>

              {/* Title */}
              <p className="text-center text-sm mt-2 truncate">
                {product.title}
              </p>

              {/* Price */}
              <p className="text-center font-bold mt-1 text-base text-update">
                ₹{product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
