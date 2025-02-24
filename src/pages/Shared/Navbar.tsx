import { useState } from "react"; // Add useState for mobile menu toggle
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { logout, selectCurrentUser } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import { RiMotorbikeLine } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import { HiMenu, HiX } from "react-icons/hi"; // Icons for mobile menu
import { useSelector } from "react-redux";
import { RootState } from "../../redux/features/store";
import { useGetUserByEmailQuery } from "../../redux/features/users/usersApi";
import ProfileDropdown from "./ProfileDropdown";
import { ProfileDropdownSkeleton } from "./ProfileDropdownSkeleton";

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

  return (
    <div className="flex justify-between items-center h-12 px-4 bg-white shadow-md">
      <NavLink className="flex items-baseline text-purple-500" to="/">
        <RiMotorbikeLine className="text-3xl md:-rotate-[25deg]" />
        <span className="hidden md:block text-lg font-medium">Bike Solution</span>
      </NavLink>

      <button
        className="sm:hidden text-purple-500"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
      </button>

      <nav className="hidden sm:flex">
        <ul className="nav flex gap-5">
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="hidden sm:flex items-center gap-3 text-xl">
        <div className="indicator">
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
            }
            to="/cart"
          >
            <TiShoppingCart />
          </NavLink>
          {cartItems.length > 0 && (
            <span className="absolute h-2 w-2 -right-[5px] -top-[5px] bg-blue-700 rounded-full"></span>
          )}
        </div>

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

      {isMobileMenuOpen && (
        <div className="sm:hidden absolute top-12 left-0 right-0 bg-white shadow-lg z-50 text-end">
          <ul className="flex flex-col p-4">
            <li>
              <NavLink
                to="/products"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  isActive ? "text-purple-500 font-semibold" : "hover:text-purple-500"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
              </NavLink>
            </li>
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