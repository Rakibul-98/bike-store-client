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

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "home",
                element: <Home/>
            },
            {
                path: "products",
                element: <Products/>
            },
            {
                path: "productDetails/:id",
                element: <ProductDetails/>
            },
            {
                path: "about",
                element: <About/>
            },
            {
                path: "cart",
                element: <Cart/>
            },
            {
                path: "checkout",
                element: <CheckOut/>
            },
            {
                path: "contact",
                element: <Contact/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "register",
                element: <Register/>
            },

            {
                path: "*",
                element: <NotFound/>
            }
        ]
    }
])


export default router;