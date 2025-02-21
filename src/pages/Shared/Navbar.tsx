import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { RiMotorbikeLine } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/features/store";


export default function Navbar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
  }

  return (
    // <div className="px-5 sm:px-0 2xl:px-10 flex justify-between items-center">
    <div className="flex justify-between items-center h-10">
        <Link className="flex items-baseline text-purple-500" to="/">
          <RiMotorbikeLine className="text-3xl md:-rotate-[25deg]"/>
          <span className="hidden md:block text-lg font-medium">Bike Solution</span>
        </Link>
      <nav>
        <ul className="nav flex gap-5">
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/adminDashboard">Admin dashboard</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="flex items-center gap-3 text-xl">
      <div className="indicator">
        
        <Link className="hover:text-purple-500" to="/cart">
          <TiShoppingCart />
          </Link>
          {
            cartItems.length > 0 &&
            <span className="absolute h-2 w-2 -right-[5px] -top-[5px] bg-blue-700 rounded-full"></span>
          }
    </div>
        
        {
          user ?
            (
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} className="hover:text-purple-500"><CgProfile /></div>
                <ul tabIndex={0} className="dropdown-content menu mt-3 bg-base-200 z-[1] shadow flex items-center ">
                <div className="avatar placeholder my-2">
                  <div className="ring-primary ring-offset-base-200 w-10 rounded-full ring ring-offset-2">
                  <span className="text-3xl">D</span>
                  </div>
                </div>
                  <p className="text-xs mb-3">{ user.user}</p>
                  <Link to="/dashboard">Go to Dashboard</Link>
                  <Link to="/profile">View Profile</Link>
                  <button onClick={handleLogout} className="">Logout</button>
                </ul>
              </div>
            )
          
             : <Link to="/login">Login</Link>
        }
      </div>
    </div>
  )
}
