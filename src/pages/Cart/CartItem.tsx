import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity, removeFromCart } from "../../redux/features/cart/cartSlice";
import { TbTrashX } from "react-icons/tb";
import { LuMinus, LuPlus } from "react-icons/lu";
import toast from "react-hot-toast";

export default function CartItem({ item }) {

    const dispatch = useDispatch();
    
    const handleIncrement = (productId: string) => {
      if (item.cart_quantity >= item.available_quantity) {
        toast.error("Not enough stock available!");
        return;
      }
      dispatch(increaseQuantity(productId));
    };
    
      const handleDecrement = (productId: string) => {
        dispatch(decreaseQuantity(productId));
      };
    
      const handleRemoveItem = (productId: string) => {
        dispatch(removeFromCart(productId));
    };
    
  return (
    <div className="cart-item bg-gray-100 flex gap-5 mb-5 rounded-md lg:w-[80%] shadow-lg" key={item._id}>
          <figure>
          <img src={item.product_image} alt={item.name} className="item-image w-28 h-20 rounded-s-md" />
        </figure>
        <div className="item-details w-full flex justify-between items-center">
            <div className="font-serif">
                <h3 className="item-name text-lg font-semibold">{item.name}</h3>
                <p className="item-price">${item.price}</p>
            </div>
            <div className="flex gap-1 items-center">
                <button type="button" onClick={() => handleDecrement(item._id)} className="bg-warning p-1 text-white" >
                <LuMinus />
                  </button>
                  <span className=" px-2 bg-gray-100 text-lg">{item.cart_quantity}</span>
                <button type="button" onClick={() => handleIncrement(item._id)} className="bg-green-500 p-1 text-white" >
                <LuPlus />
                </button>
                <button type="button" onClick={() => handleRemoveItem(item._id)} className="mx-3 rounded-full p-1 bg-red-400 text-2xl text-white hover:bg-red-600" >
                    <TbTrashX />
                </button>
            </div>
        </div>
    </div>
  )
}
