import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/features/hooks";
import { logout } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");
  }

  return (
    <div className="bg-zinc-300">
      <nav>
        <ul className="nav flex justify-between items-center mx-10 p-2">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/login">Login</Link></li>
          <button onClick={handleLogout} className="">Logout</button>
        </ul>
      </nav>
    </div>
  )
}
