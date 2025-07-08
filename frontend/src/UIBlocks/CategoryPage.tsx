import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

type ProductType = {
  id: number;
  name: string;
  image: string;
  category: string;
  price: number;
};

interface Props {
  category?: string;
}

const CategoryPage: React.FC<Props> = () => {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [, setError] = useState<string | null>(null);
  const [cartStates, setCartStates] = useState<Record<number, string>>({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/products")
      .then((res) => res.json())
      .then((data: ProductType[]) => {
        setProduct(data);
        const initialCartStates: Record<number, string> = {};
        data.forEach((item) => {
          initialCartStates[item.id] = "Add to Cart";
        });
        setCartStates(initialCartStates);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const navigateProductPage = (id: number) => {
    navigate(`/productpage/${id}`);
  };

  const changeCart = (id: number) => {
    setCartStates((prev) => ({
      ...prev,
      [id]: prev[id] === "Add to Cart" ? "Added to Cart" : "Add to Cart",
    }));
  };

  return (
    <div className="mt-5 px-4 pb-8">
      {/* Small screen horizontal filter */}
      <div className="md:hidden overflow-x-auto scrollbar-hide mb-4">
        <div className="flex gap-4 min-w-max">
          {[
            "Category",
            "Product",
            "Brand",
            "Item Condition",
            "Price",
            "Payment Method",
          ].map((label, idx) => (
            <div key={idx} className="flex flex-col gap-1 min-w-[140px]">
              <p className="text-sm font-medium text-gray-700">{label}</p>
              <select className="border px-2 py-1 rounded">
                <option value="new">New</option>
                <option value="renewed">Renewed</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Main Layout for all screens */}
      <div className="flex flex-col md:flex-row gap-6 ">
        {/* Left Fixed Filter for md+ */}
        <div className="hidden md:block md:w-1/4">
          <div className="sticky top-24 ring ring-gray-300/30 bg-white p-0 h-[calc(100vh-6rem)]">
            <div className="p-6 space-y-4 overflow-y-auto h-full">
              <h6 className="text-gray-800 font-semibold">Customized Filter</h6>
              <hr />
              {[
                "Category",
                "Product",
                "Brand",
                "Item Condition",
                "Price",
                "Payment Method",
              ].map((label, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-700">{label}</p>
                  <select className="border w-full px-2 py-1 rounded">
                    <option value="new">New</option>
                    <option value="renewed">Renewed</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Section (visible in all devices) */}
        <div className="w-full md:w-3/4 space-y-5 mt-4 md:mt-0">
          {product.map((data) => (
            <div key={data.id}>
              <div className="grid grid-cols-[25%_50%_25%] items-center mx-5 gap-4 p-4">
                <div onClick={()=>{navigateProductPage(data.id)}}>
                  <img
                    className="h-24 w-24 mx-auto"
                    src={`http://127.0.0.1:8000/${data.image}`}
                    alt="product"
                  />
                </div>
                <div
                  onClick={()=>{navigateProductPage(data.id)}}
                  className="space-y-1 px-2 cursor-pointer"
                >
                  <h4 className="text-lg font-semibold">{data.name}</h4>
                  <p className="text-sm text-gray-600">{data.category}</p>
                  <p className="text-sm text-gray-600">Specification 2</p>
                  <p className="text-sm text-gray-600">Specification 3</p>
                  <p className="text-sm text-green-600">Offer</p>
                </div>
                <div className="text-right space-y-2">
                  <h2 className="text-xl font-bold text-orange-600">
                    $ {data.price}
                  </h2>
                  <p className="text-sm text-gray-500">Delivery Date</p>
                  <button
                    className="bg-orange-500 text-white text-sm px-4 py-2 rounded"
                    onClick={() => changeCart(data.id)}
                  >
                    {cartStates[data.id]}
                  </button>
                </div>
              </div>
              <hr className="border-t border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
