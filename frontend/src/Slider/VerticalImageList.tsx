import { useRef } from "react";

interface VerticalImageListProps {
  images: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export default function VerticalImageList({
  images,
  selectedIndex,
  onSelect,
}: VerticalImageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "up" | "down") => {
    if (scrollRef.current) {
      const scrollAmount = 100;
      scrollRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-24 flex flex-col items-center">
      <button
        className="w-full h-8 flex items-center justify-center text-xl bg-white border"
        onClick={() => scroll("up")}
      >
        ▲
      </button>

      <div
        ref={scrollRef}
        className="h-[400px] w-full overflow-y-auto space-y-2 border"
      >
        {images.map((img, index) => (
          <div
            key={index}
            onClick={() => onSelect(index)}
            className={`border ${
              index === selectedIndex ? "border-blue-500" : "border-transparent"
            } p-1 cursor-pointer`}
          >
            <img
              src={img}
              alt={`Thumb ${index}`}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>

      <button
        className="w-full h-8 flex items-center justify-center text-xl bg-white border"
        onClick={() => scroll("down")}
      >
        ▼
      </button>
    </div>
  );
}
