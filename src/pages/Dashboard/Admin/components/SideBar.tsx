import { useEffect } from "react";
import { AiFillProduct, AiOutlineMenuUnfold } from "react-icons/ai";
import { BiPurchaseTag } from "react-icons/bi";
import { FaChartPie, FaUsers } from "react-icons/fa";
import { RiCloseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function SideBar({ isOpen, setIsOpen }) {
  
  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
        className={`bg-gray-900 text-white min-h-full transition-all duration-300 ${
          isOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Sidebar Header with Toggle Button */}
        <div className="flex items-center justify-between py-3 px-4 bg-red-400">
          {isOpen && <span className="text-md lg:text-lg font-semibold whitespace-nowrap">Admin Panel</span>}
          <button onClick={() => setIsOpen(!isOpen)} className={`text-white text-xl ${!isOpen && "w-full flex justify-center"}`}>
            {isOpen ? <RiCloseLargeFill className="ms-5" /> : <AiOutlineMenuUnfold className="text-2xl" />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className={`${!isOpen && " text-2xl flex justify-center items-center"}"mt-4"`}>
          <ul className="space-y-2 pt-1">
          <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
          <Link className="flex items-center justify-center" to="/adminDashboard/allProducts"><AiFillProduct />
          {isOpen && <span className="ml-3">Products</span>}</Link>
            </li>
            <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
            <FaUsers />
              {isOpen && <span className="ml-3">Users</span>}
            </li>
            <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
            <BiPurchaseTag />
              {isOpen && <span className="ml-3">Orders</span>}
            </li>
            <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
            <FaChartPie />
              {isOpen && <span className="ml-3">Reports</span>}
            </li>
          </ul>
        </nav>
      </div>
  )
}
