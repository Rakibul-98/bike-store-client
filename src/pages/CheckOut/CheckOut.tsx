import { useDispatch, useSelector } from "react-redux";
import { useGetUserByEmailQuery } from "../../redux/features/users/usersApi";
import toast from "react-hot-toast";
import { clearCart } from "../../redux/features/cart/CartSlice";
import { useCreateOrderMutation } from "../../redux/features/orders/ordersApi";
import { useForm } from "react-hook-form";
import { CheckOutSkeleton } from "./CheckOutSkeleton";

export default function CheckOut() {
  const cartItems = useSelector((state: any) => state.cart.items);
  const { totalAmount, shippingCost, tax, discount, grandTotal } = useSelector( (state) => state?.cart );

  const dispatch = useDispatch();

  const [createOrder] = useCreateOrderMutation();

  const loggedInUser = useSelector((state: any) => state.auth.user);
  const { data: user, error, isLoading } = useGetUserByEmailQuery(loggedInUser?.user);

  const { register, handleSubmit, formState: {  errors } } = useForm();

  if (isLoading) return <CheckOutSkeleton/>;
  if (error) return toast.error("Error loading user data");

  const onSubmit = async (data) => {
    if (!data.address || !data.phone) {
      toast.error("Please fill in all details!");
      return;
    }

    const orderData = {
      customer: user.data._id,
      address: data.address,
      phone: data.phone,
      items: cartItems.map((item) => ({
        product: item._id,
        order_quantity: item.cart_quantity,
      })),
      totalAmount: grandTotal,
    };

    try {
      const res = await createOrder(orderData).unwrap();
      console.log(res)
      const url = res.data;
      if (!res?.error) {
        toast.success("Order placed successfully!");
        console.log(res)
        setTimeout(() => {
          window.location.href = url;
        }, 1000)
        dispatch(clearCart());
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to place order.");
    }
  };

  return (
    <div className="my-10 max-w-lg mx-auto p-5 bg-white shadow-md rounded-md mt-5 border">
      <h2 className="text-center text-2xl font-bold mb-4">Checkout</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <input
              type="text"
            defaultValue={user.data.user_name}
              {...register("name")}
              className={`${errors.name && "border-red-500 focus:outline-red-500"} w-full border p-2 rounded`}
            />
            <input
              type="email"
              defaultValue={user.data.email}
              disabled
              {...register("email")}
              className={`${errors.email && "border-red-500 focus:outline-red-500"} w-full border p-2 rounded`}
            />
            <input
              type="text"
              {...register("address", {required: true})}
              placeholder="Enter address"
              className={`${errors.address && "border-red-500 focus:outline-red-500"} w-full border p-2 rounded`}
            />
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="Enter phone number"
              className={`${errors.phone && "border-red-500 focus:outline-red-500"} w-full border p-2 rounded`}
            />

        <div className="mt-5 border-t pt-3">
          <h3 className="text-xl font-semibold">Order Summary</h3>
          {cartItems.map((item: any) => (
            <div key={item._id} className="flex justify-between border-b py-2">
              <p>{item.name} (x{item.cart_quantity})</p>
              <p>${(item.price * item.cart_quantity).toFixed(2)}</p>
            </div>
          ))}
          <p className="flex justify-between mt-2">
            <span>Subtotal:</span> ${totalAmount.toFixed(2)}
          </p>
          <p className="flex justify-between">
            <span>Tax:</span> ${tax}
          </p>
          <p className="flex justify-between">
            <span>Shipping:</span> ${shippingCost}
          </p>
          <p className="flex justify-between border-b py-2">
            <span>Discount:</span> ${discount}
          </p>
          <p className="flex justify-between font-bold">
            <span>Grand Total:</span> ${grandTotal}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
        >
          Order Now
        </button>
      </form>
    </div>
  );
}