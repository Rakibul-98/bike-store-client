import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen relative ">
      <div className="w-[95%] mx-auto">
      <div className="sticky top-0 z-50 py-1 bg-base-100">
      <Navbar/>
        </div>
        <Outlet/>
      </div>
        <Footer/>
    </div>
  )
}
