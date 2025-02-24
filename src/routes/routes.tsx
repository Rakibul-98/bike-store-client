import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import NotFound from "../pages/NotFound/NotFound";
import Products from "../pages/Products/Products";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Cart from "../pages/Cart/Cart";
import CheckOut from "../pages/CheckOut/CheckOut";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import AllProducts from "../pages/Dashboard/Admin/components/AllProducts/AllProducts";
import AllUsers from "../pages/Dashboard/Admin/components/AllUsers/AllUsers";
import AllOrders from "../pages/Dashboard/Admin/components/AllOrders/AllOrders";
import Reports from "../pages/Dashboard/Admin/components/Reports/Reports";
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard/CustomerDashboard";
import ProtectedRoute from "../layout/ProtectedRoute";
import UserProfile from "../pages/UserProfile/UserProfile";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },


      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: "profile", element: <ProtectedRoute><UserProfile /></ProtectedRoute> },
      { path: "productDetails/:productId", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: "order-success", element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },

      {
        path: "adminDashboard",
        element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>,
        children: [
          { index: true, element: <AllProducts /> },
          { path: "allProducts", element: <AllProducts /> },
          { path: "allUsers", element: <AllUsers /> },
          { path: "allOrders", element: <AllOrders /> },
          { path: "reports", element: <Reports /> },
        ],
      },

      {
        path: "customerDashboard",
        element: <ProtectedRoute><CustomerDashboard /></ProtectedRoute>,
        children: [
          { index: true, element: <AllOrders /> },
          { path: "allOrders", element: <AllOrders /> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
