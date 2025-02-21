import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TProduct } from "../Products/Products";
import OrderSummery from "./OrderSummery";
import CartItem from "./CartItem";

export default function Cart() {
  const cartItems = useSelector((state: any) => state.cart.items);

  return (
    <div className="my-5">
      {
        cartItems.length > 0 && (
          <div className="lg:flex justify-between gap-10">
        
        {/* Cart Items Section */}
        <div className="lg:w-3/5 max-h-[550px] overflow-y-auto">
          {cartItems.length > 0 && (
            cartItems.map((item: TProduct, i) => (
              <CartItem key={i} item={item} />
            ))
          )}
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-2/5">
          {cartItems.length > 0 && <OrderSummery />}
        </div>
      </div>
        )
      }

      {/* Empty Cart Message */}
      {cartItems.length === 0 && (
        <div className="cart-summary h-[500px] flex flex-col justify-center p-5 rounded shadow mt-5">
          <h2 className="text-center text-lg font-bold">Your cart is empty</h2>
          <Link 
            className="flex justify-center text-blue-500 hover:underline mt-2" 
            to="/products"
          >
            Back to products
          </Link>
        </div>
      )}
    </div>
  );
}
