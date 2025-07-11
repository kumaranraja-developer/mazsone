import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import grocery from "../assets/category/grocery.png";
import mobile from "../assets/category/mobile.png";
import fashion from "../assets/category/fashion.png";
import electronics from "../assets/category/electronics.png";
import furniture from "../assets/category/furnitures.png";
import travel from "../assets/category/travels.png";
import toys from "../assets/category/toys.png";
import vehicles from "../assets/category/vehicles.png";
import InvisibleSection from "./InvisibleSection";
import ImageButton from "@/Components/Button/ImageBtn";
import laptop from "../assets/products/laptop.webp";

interface CategoryItem {
  name: string;
  image: string;
  alt: string;
  subMenu?: SubMenuItems[];
  card: CardItems;
}
interface SubMenuItems {
  title: string;
  path: string;
}
interface CardItems {
  title: string;
  description: string;
  image: string;
}
const Categories: CategoryItem[] = [
  {
    name: "Grocery",
    image: grocery,
    alt: "grocery image",
    subMenu: [
      { title: "Fruits & Vegetables", path: "/category/grocery/fruits" },
      { title: "Snacks & Beverages", path: "/category/grocery/snacks" },
      { title: "Dairy & Bakery", path: "/" },
      { title: "Staples", path: "/" },
    ],
    card: {
      title: "Daily Essentials",
      description:
        "Shop fresh produce, snacks, and pantry staples delivered to your door.",
      image: laptop,
    },
  },
  {
    name: "Mobiles",
    image: mobile,
    alt: "mobile image",
    subMenu: [
      { title: "Smartphones", path: "/" },
      { title: "Accessories", path: "/" },
      { title: "Tablets", path: "/" },
    ],
    card: {
      title: "Latest Smartphones",
      description:
        "Discover top mobile brands, new releases, and must-have accessories.",
      image: laptop,
    },
  },
  {
    name: "Fashion",
    image: fashion,
    alt: "fashion image",
    subMenu: [
      { title: "Men's Clothing", path: "/" },
      { title: "Women's Clothing", path: "/" },
      { title: "Footwear", path: "/" },
      { title: "Watches & Accessories", path: "/" },
    ],
    card: {
      title: "Trendy Fashion",
      description:
        "Upgrade your wardrobe with the latest fashion trends for all seasons.",
      image: laptop,
    },
  },
  {
    name: "Electronics",
    image: electronics,
    alt: "electronics image",
    subMenu: [
      { title: "Laptops & Computers", path: "/" },
      { title: "Televisions", path: "/" },
      { title: "Home Appliances", path: "/" },
      { title: "Audio Devices", path: "/" },
    ],
    card: {
      title: "Smart Electronics",
      description:
        "Find gadgets, smart devices, and home electronics at great prices.",
      image: laptop,
    },
  },
  {
    name: "Furnitures",
    image: furniture,
    alt: "furniture image",
    subMenu: [
      { title: "Living Room", path: "/" },
      { title: "Bedroom", path: "/" },
      { title: "Office Furniture", path: "/" },
      { title: "Storage", path: "/" },
    ],
    card: {
      title: "Stylish Furniture",
      description: "Explore comfortable and elegant furniture for every room.",
      image: laptop,
    },
  },
  {
    name: "Travel",
    image: travel,
    alt: "travel image",
    subMenu: [
      { title: "Flight Booking", path: "/" },
      { title: "Train Tickets", path: "/" },
      { title: "Hotel Deals", path: "/" },
    ],
    card: {
      title: "Plan Your Journey",
      description: "Book flights, trains, and hotel stays at the best rates.",
      image: laptop,
    },
  },
  {
    name: "Toys",
    image: toys,
    alt: "toys image",
    subMenu: [
      { title: "Educational Toys", path: "/" },
      { title: "Outdoor Play", path: "/" },
      { title: "Soft Toys", path: "/" },
    ],
    card: {
      title: "Fun & Learning",
      description: "Choose from a wide range of toys that make learning fun.",
      image: laptop,
    },
  },
  {
    name: "Vehicles",
    image: vehicles,
    alt: "vehicles image",
    subMenu: [
      { title: "Bicycles", path: "/" },
      { title: "Two Wheelers", path: "/" },
      { title: "Accessories", path: "/" },
    ],
    card: {
      title: "Ride in Style",
      description: "Browse two-wheelers, cycles, and essential accessories.",
      image: laptop,
    },
  },
];

const CategoryList: React.FC = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const anchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 150); // show after 150ms
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 200); // hide after 200ms
  };

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/category/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="px-2 mt-4 mb-6">
      <div className="flex gap-5 sm:gap-15 md:gap-10 m-5 lg:mx-20 bg-background overflow-x-auto justify-between scrollbar-hide px-1">
        {Categories.map((category, index) => {
          const hasSubMenu = !!category.subMenu;
          const isActive = hoveredIndex === index;

          return (
            <div
              key={index}
              ref={(el) => {
                anchorRefs.current[index] = el;
              }}
              onClick={() => handleCategoryClick(category.name)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              className="cursor-pointer w-[100px] sm:w-auto flex-shrink-0 text-center relative"
            >
              <img
                src={category.image}
                alt={category.alt}
                className="w-[70px] h-[70px] mx-auto"
              />
              <p className="text-sm font-medium flex mt-1 items-center justify-center gap-1">
                {category.name}
                {hasSubMenu && (
                  <ImageButton
                    className="text-xs transform duration-300"
                    icon={isActive ? "up" : "down"}
                  />
                )}
              </p>

              {hasSubMenu && anchorRefs.current[index] && (
                <InvisibleSection
                  anchorRef={{
                    current: anchorRefs.current[index] as HTMLDivElement,
                  }}
                  content={
                    <div className="flex w-[500px] ">
                      {/* Left menu list */}
                      <ul className="min-w-[180px] py-2 overflow-y-auto">
                        {category.subMenu!.map((item, i) => (
                          <li
                            key={i}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(item.path);
                            }}
                            className="cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground rounded text-sm text-gray-700"
                          >
                            {item.title}
                          </li>
                        ))}
                      </ul>

                      {/* Right card details */}
                      <div className="flex flex-col justify-between w-max gap-3 px-3 py-2 h-full">
                        <div>
                          <h3 className="text-lg font-semibold">
                            {category.card.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {category.card.description}
                          </p>
                        </div>
                        <img
                          src={category.card.image}
                          alt={category.card.title}
                          className=" object-cover rounded"
                        />
                      </div>
                    </div>
                  }
                  visible={hoveredIndex === index}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
