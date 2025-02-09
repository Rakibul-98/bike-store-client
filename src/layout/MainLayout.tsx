import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen relative">
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}
