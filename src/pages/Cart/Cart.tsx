import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderSummery from "./OrderSummery";
import CartItem from "./CartItem";
import emptyCart from "../../assets/images/empty-cart.svg";
import { RootState } from "../../redux/features/store";
import { ItemType } from "../../interfaces/interfaces";

export default function Cart() {

  const cartItems: ItemType[] = useSelector((state: RootState) => {
    
    const items = state?.cart?.items;
    return Array.isArray(items) ? items : [];
  });


  return (
    <div className="my-5">
      {
        cartItems.length > 0 && (
          <div className="lg:flex justify-between gap-10">
        
        <div className="lg:w-3/5 max-h-[550px] overflow-y-auto">
          {cartItems.length > 0 && (
            cartItems.map((item, i) => (
              <CartItem key={i} item={item} />
            ))
          )}
        </div>

        <div className="lg:w-2/5">
          {cartItems.length > 0 && <OrderSummery />}
        </div>
      </div>
        )
      }

      {cartItems.length === 0 && (
        <div className="cart-summary flex flex-col justify-center items-center p-5 rounded shadow mt-5">
          <img className="max-w-md" src={emptyCart} alt="" />
          <div>
          <h2 className="text-center text-lg font-bold capitalize">Your cart is empty</h2>
          <Link 
            className="flex justify-center text-blue-500 hover:underline mt-2" 
            to="/products"
          >
            Add Products
          </Link>
          </div>
        </div>
      )}
    </div>
  );
}
