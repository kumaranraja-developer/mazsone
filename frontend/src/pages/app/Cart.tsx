import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import vehicles from "../../assets/category/vehicles.png";
import AnimateButton from '@/Components/Input/animatebutton';
import ImageButton from '@/Components/Button/ImageBtn';
import Button from '@/Components/Input/Button';

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
  savedItems: Product[];
}

type Action =
  | { category: 'increase' | 'decrease' | 'remove'; payload: number }
  | { category: 'saveLater'; payload: number }
  | { category: 'moveToCart'; payload: number }
  | { category: 'removeSaved'; payload: number };

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

  const [state, dispatch] = useReducer(reducer, {
    cartItems: initialData,
    savedItems: [],
  });

  function reducer(state: State, action: Action): State {
    const { cartItems, savedItems } = state;

    switch (action.category) {
      case 'increase':
      case 'decrease':
        return {
          ...state,
          cartItems: cartItems.map(item =>
            item.id === action.payload
              ? {
                  ...item,
                  quantity:
                    action.category === 'increase'
                      ? item.quantity + 1
                      : Math.max(1, item.quantity - 1),
                }
              : item
          ),
        };

      case 'remove':
        return {
          ...state,
          cartItems: cartItems.filter(item => item.id !== action.payload),
        };

      case 'saveLater': {
        const itemToSave = cartItems.find(i => i.id === action.payload);
        if (!itemToSave) return state;

        return {
          ...state,
          cartItems: cartItems.filter(i => i.id !== action.payload),
          savedItems: [...savedItems, itemToSave],
        };
      }

      case 'moveToCart': {
        const itemToMove = savedItems.find(i => i.id === action.payload);
        if (!itemToMove) return state;

        return {
          ...state,
          savedItems: savedItems.filter(i => i.id !== action.payload),
          cartItems: [...cartItems, itemToMove],
        };
      }

      case 'removeSaved':
        return {
          ...state,
          savedItems: savedItems.filter(i => i.id !== action.payload),
        };

      default:
        return state;
    }
  }

  const navigateProductPage = (id: number) => {
    navigate(`/productpage/${id}`);
  };

  const totalPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const renderItemCard = (item: Product, isSaved = false) => (
    <div key={item.id} className="border-b pb-4 relative last:border-0">
      <div className="grid grid-cols-3 items-center gap-4">
        <div onClick={() => navigateProductPage(item.id)} className="cursor-pointer">
          <img src={item.image} alt={item.title} className="h-24 w-24 object-contain mx-auto" />
        </div>

        <div onClick={() => navigateProductPage(item.id)} className="col-span-2 cursor-pointer">
          <h4 className="text-lg font-semibold">{item.title}</h4>
          <p className="text-sm text-gray-500">{item.category}</p>
          <p className="text-xs text-gray-400">Seller: <strong>{sellerName}</strong></p>
          <h2 className="text-lg font-bold text-green-700">
            ${Number(item.price * item.quantity).toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-2 items-center">
        <div className="flex justify-center gap-2">
          {!isSaved && (
            <>
              <ImageButton
                className="bg-create p-2 text-white rounded"
                onClick={() => dispatch({ category: 'decrease', payload: item.id })}
                disabled={item.quantity === 1}
                icon="minus"
              />
              <input
                type="number"
                value={item.quantity}
                readOnly
                className="w-12 text-center border rounded"
              />
              <ImageButton
                className="bg-create p-2 text-white rounded"
                onClick={() => dispatch({ category: 'increase', payload: item.id })}
                icon="plus"
              />
            </>
          )}
        </div>

        <div className="flex gap-4 col-span-2 justify-end text-sm">
          {isSaved ? (
            <>
              <AnimateButton
                className="bg-create"
                onClick={() => dispatch({ category: 'moveToCart', payload: item.id })}
                label="Move to cart"
                mode="cart"
              />
              <AnimateButton
                className="bg-delete"
                onClick={() => dispatch({ category: 'removeSaved', payload: item.id })}
                label="Remove"
                mode="delete"
              />
            </>
          ) : (
            <>
              <Button
                className="text-purple-600 cursor-pointer hover:border hover:border-ring"
                onClick={() => dispatch({ category: 'saveLater', payload: item.id })}
                label="Save for Later"
              />
              <AnimateButton
                className="bg-delete"
                onClick={() => dispatch({ category: 'remove', payload: item.id })}
                label="Remove"
                mode="delete"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[1fr_320px] lg:px-[10%] gap-10 p-5">
      {/* Left: Cart Items */}
      <div className="space-y-8 overflow-auto">
        <div className="space-y-4">
          {state.cartItems.map(item => renderItemCard(item))}
        </div>

        {state.savedItems.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-4">Saved for Later</h3>
            <div className="mt-4 space-y-4 border-b last:border-0 pt-4">
              {state.savedItems.map(item => renderItemCard(item, true))}
            </div>
          </>
        )}
      </div>

      {/* Right: Sticky Price Summary */}
      <div className="w-full max-w-sm mx-auto border p-5 space-y-4 lg:sticky top-20 self-start h-fit">
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
