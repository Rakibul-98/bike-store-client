import { TiShoppingCart } from "react-icons/ti";
import { NavLink } from "react-router-dom";
import { ItemType } from "../../../interfaces/interfaces";

type CartItemPropType = {
    cartItems: ItemType[];
}

const CartIcon = ({ cartItems }: CartItemPropType) => (
    
    <div className="indicator">
      <NavLink
        to="/cart"
        className={({ isActive }) =>
          isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
        }
      >
        <TiShoppingCart />
      </NavLink>
      {cartItems.length > 0 && (
        <span className="absolute h-2 w-2 -right-[5px] -top-[5px] bg-blue-700 rounded-full"></span>
      )}
    </div>
  );

  export default CartIcon;