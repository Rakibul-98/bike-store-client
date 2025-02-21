import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserByEmailQuery } from "../../redux/features/users/usersApi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/features/cart/CartSlice";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";

export default function CheckOut() {
  const cartItems = useSelector((state: any) => state.cart.items);
  const { totalAmount, shippingCost, tax, discount, grandTotal } = useSelector(state => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();

  const loggedInUser = useSelector((state: any) => state.auth.user);
  const { data: user, error, isLoading } = useGetUserByEmailQuery(loggedInUser?.user);

  // ✅ Move useState ABOVE conditional returns
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // ✅ Use useEffect to update formData when user data is fetched
  useEffect(() => {
    if (user?.data) {
      setFormData(prev => ({
        ...prev,
        name: user.data.name || "",
        email: user.data.email || "",
        address: "Mirpur, Dhaka",
        phone: "0189374646489",
      }));
    }
  }, [user]);
  // ✅ Conditional return AFTER useState
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user data</div>;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOrder = () => {
    if (!formData.address || !formData.phone) {
      toast.error("Please fill in all details!");
      return;
    }

    const orderData = {
      customer: user.data._id,
      address: formData.address,
      phone: formData.phone,
      items: cartItems.map((item) => ({
        product: item._id, // Assuming _id is the product ID
        order_quantity: item.cart_quantity, // Assuming cart_quantity is the quantity selected
      })),
      totalAmount: grandTotal,
    };

    console.log(orderData);
    createOrder(orderData).unwrap();
    dispatch(clearCart());
    toast.success("Order placed successfully!");
    navigate("/order-success");
  };

  return (
    <div className="max-w-3xl mx-auto p-5 bg-white shadow-md rounded-md mt-5">
      <h2 className="text-center text-2xl font-bold mb-4">Checkout</h2>

      {/* User Information Form */}
      <div className="space-y-3">
        <input type="text" name="name" value={formData.name} disabled className="w-full border p-2 rounded" />
        <input type="email" name="email" value={formData.email} disabled className="w-full border p-2 rounded" />
        <input type="text" name="address" placeholder="Enter address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>

      {/* Order Summary */}
      <div className="mt-5 border-t pt-3">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        {cartItems.map((item: any) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <p>{item.name} (x{item.cart_quantity})</p>
            <p>${(item.price * item.cart_quantity).toFixed(2)}</p>
          </div>
        ))}
        <p className="flex justify-between mt-2"><span>Subtotal:</span> ${totalAmount.toFixed(2)}</p>
        <p className="flex justify-between"><span>Tax:</span> ${tax}</p>
        <p className="flex justify-between"><span>Shipping:</span> ${shippingCost}</p>
        <p className="flex justify-between border-b py-2"><span>Discount:</span> ${discount}</p>
        <p className="flex justify-between font-bold"><span>Grand Total:</span> ${grandTotal}</p>
      </div>

      {/* Order Now Button */}
      <button onClick={handleOrder} className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600">
        Order Now
      </button>
    </div>
  );
}
