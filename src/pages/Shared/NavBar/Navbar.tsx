import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/features/hooks";
import { logout, selectCurrentUser } from "../../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { RiMotorbikeLine } from "react-icons/ri";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/features/store";
import { useGetUserByEmailQuery } from "../../../redux/features/users/usersApi";
import ProfileDropdown from "../ProfileDropdown";
import { ProfileDropdownSkeleton } from "../ProfileDropdownSkeleton";
import CartIcon from "./CartIcon";
import CustomNavLink from "./CustomNavLink";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const loggedInUser = useAppSelector(selectCurrentUser);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const { data: user, error, isLoading } = useGetUserByEmailQuery(loggedInUser?.user || "", {
    skip: !loggedInUser?.user,
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successful");

    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  // Reusable navigation links
  const navLinks = [
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];
  

  // Reusable cart icon component
  

  return (
    <div className="flex justify-between items-center h-12 px-4 bg-white shadow-md">
      {/* Logo */}
      <NavLink className="flex items-baseline text-purple-500" to="/">
        <RiMotorbikeLine className="text-3xl md:-rotate-[25deg]" />
        <span className="hidden md:block text-lg font-medium">Bike Solution</span>
      </NavLink>

      {/* Mobile Cart Icon and Menu Toggle */}
      <div className="flex items-center gap-3 sm:hidden">
        <CartIcon cartItems={cartItems} />
        <button
          className="text-purple-500"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden sm:flex">
        <ul className="nav flex gap-5">
          {navLinks.map((link) => (
            <li key={link.to}>
              <CustomNavLink to={link.to} label={link.label} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Cart and Profile */}
      <div className="hidden sm:flex items-center gap-3 text-xl">
        <CartIcon cartItems={cartItems} />
        {isLoading ? (
          <ProfileDropdownSkeleton />
        ) : error ? (
          <p className="text-red-500 text-sm">Failed to load</p>
        ) : user ? (
          <ProfileDropdown user={user.data} handleLogout={handleLogout} />
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-1 text-sm uppercase rounded transition duration-300 border bg-gray-200 text-purple-500 font-bold hover:bg-purple-500 hover:text-white ${
                isActive && "bg-purple-500 text-white"
              }`
            }
          >
            Login
          </NavLink>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-12 left-0 right-0 bg-white shadow-lg z-50 text-end">
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => (
              <li key={link.to}>
                <CustomNavLink to={link.to} label={link.label} onClick={() => setIsMobileMenuOpen(false)} />
              </li>
            ))}
            {isLoading ? (
              <li>
                <ProfileDropdownSkeleton />
              </li>
            ) : error ? (
              <li className="text-red-500 text-sm">Failed to load</li>
            ) : user ? (
              <li>
                <ProfileDropdown user={user.data} handleLogout={handleLogout} />
              </li>
            ) : (
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-1 text-sm uppercase rounded transition duration-300 border bg-gray-200 text-purple-500 font-bold hover:bg-purple-500 hover:text-white ${
                      isActive && "bg-purple-500 text-white"
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}