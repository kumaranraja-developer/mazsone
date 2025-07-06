import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicles from "../../assets/category/vehicles.png";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface State {
  cartItems: Product[];
}

type Action =
  | { category: 'increase' | 'decrease' | 'remove' | 'saveLater'; payload: number };

const initialData: Product[] = [
  {
    id: 1,
    title: 'Wireless Headphones',
    price: 59.99,
    image: vehicles,
    category: 'Electronics',
    quantity: 1,
  },
  {
    id: 2,
    title: 'Running Shoes',
    price: 89.49,
    image: vehicles,
    category: 'Footwear',
    quantity: 1,
  },
  {
    id: 3,
    title: 'Cotton T-shirt',
    price: 19.99,
    image: vehicles,
    category: 'Clothing',
    quantity: 1,
  },
];

export default function Cart() {
  const sellerName = 'Raja';
  const navigate = useNavigate();

  const navigateProductPage = () => navigate('/product');

  function reducer(state: State, action: Action): State {
    switch (action.category) {
      case 'increase':
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      case 'decrease':
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      case 'remove':
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        };
      case 'saveLater':
        return state;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, { cartItems: initialData });

  const totalPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="grid lg:grid-cols-2 gap-6 p-5">

      {/* Left: Cart Items */}
      <div className="space-y-4 overflow-auto">
        {state.cartItems.map((item) => (
          <div key={item.id} className="border-b pb-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <div onClick={navigateProductPage} className="cursor-pointer">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 object-contain mx-auto"
                />
              </div>
              <div onClick={navigateProductPage} className="col-span-2 cursor-pointer">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="text-xs text-gray-400">
                  Seller: <strong>{sellerName}</strong>
                </p>
                <h2 className="text-lg font-bold text-green-700">
                  ${Number(item.price * item.quantity).toFixed(2)}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-2 items-center">
              <div className="flex justify-center gap-2">
                <button
                  className="w-8 h-8 bg-green-600 text-white rounded"
                  onClick={() => dispatch({ category: 'decrease', payload: item.id })}
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="w-12 text-center border rounded"
                />
                <button
                  className="w-8 h-8 bg-green-600 text-white rounded"
                  onClick={() => dispatch({ category: 'increase', payload: item.id })}
                >
                  +
                </button>
              </div>
              <div className="flex gap-4 col-span-2 justify-end text-sm">
                <span
                  className="text-purple-600 cursor-pointer"
                  onClick={() => dispatch({ category: 'saveLater', payload: item.id })}
                >
                  Save for Later
                </span>
                <span
                  className="text-red-600 cursor-pointer"
                  onClick={() => dispatch({ category: 'remove', payload: item.id })}
                >
                  Remove
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right: Price Summary */}
      <div className="w-full max-w-sm mx-auto border p-5 space-y-4">
        <h4 className="text-lg font-bold">Price Details</h4>
        <hr />
        <div className="grid grid-cols-5">
          <p className="col-span-4">
            Price ({state.cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)
          </p>
          <p className="text-right">${totalPrice.toFixed(2)}</p>
        </div>
        <div className="grid grid-cols-5">
          <p className="col-span-4">Discount</p>
          <p className="text-right">$0.00</p>
        </div>
        <div className="grid grid-cols-5">
          <p className="col-span-4">Delivery Charges</p>
          <p className="text-right">Free</p>
        </div>
        <hr />
        <div className="grid grid-cols-5 font-semibold">
          <p className="col-span-4">Total Amount</p>
          <p className="text-right">${totalPrice.toFixed(2)}</p>
        </div>
        <button className="bg-orange-500 w-full py-2 text-white font-medium rounded hover:bg-orange-600 transition">
          Place Order
        </button>
      </div>
    </div>
  );
}
