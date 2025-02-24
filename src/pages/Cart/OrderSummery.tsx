import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { TProduct } from "../Products/Products";
import {  SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { applyCoupon, clearCart } from "../../redux/features/cart/CartSlice";
import { RootState } from "../../redux/features/store";

type CouponType = {
  coupon: string;
}

export default function OrderSummery() {
  const { register, handleSubmit } = useForm<CouponType>();
  const { totalAmount, totalItems, shippingCost, tax, discount, grandTotal, appliedCoupon } = useSelector((state: RootState) => state.cart);
  const [enteredCoupon, setEnteredCoupon] = useState<string | null>(null);

  
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<CouponType> = (data) => {
    setEnteredCoupon(data.coupon);
    dispatch(applyCoupon(data.coupon));
    if (data.coupon !== appliedCoupon) {
      toast.error("Invalid or expired coupon!");
    } else {
      toast.success("Coupon applied successfully!");
    }
  };

  useEffect(() => {
    if (enteredCoupon !== null) {
      if (appliedCoupon === enteredCoupon) {
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid or expired coupon!");
      }
    }
  }, [appliedCoupon, enteredCoupon]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveCoupon = () => {
    dispatch(applyCoupon(null));
  }

  return (
    <div className="cart-summary bg-gray-100 p-5 rounded-md shadow-lg">
      <h2 className="text-center font-serif text-2xl font-medium">Order Summary</h2>
      <hr className="h-[2px] bg-gray-600 my-2" />
      <div className="w-10/12 mx-auto font-mono">
        <div>
          <p className="flex justify-between"><span className="font-bold text-lg">Total items:</span> {totalItems}</p>
          <p className="flex justify-between"><span className="font-bold text-lg">Subtotal:</span> ${totalAmount.toFixed(2)}</p>
          <p className="flex justify-between"><span className="font-bold text-lg">Shipping:</span> ${shippingCost.toFixed(2)}</p>
          <p className="flex justify-between"><span className="font-bold text-lg">Tax:</span> ${tax.toFixed(2)}</p>

          {/* Coupon Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="my-3 flex justify-end w-[99%]">
            <input 
              className="flex-1 py-1 px-2 focus:outline-none border rounded" 
              type="text" 
              placeholder="Enter Coupon" 
              {...register("coupon")} 
            />
            <input 
              className="bg-primary px-3 py-1 text-white ms-3 rounded cursor-pointer hover:bg-primary-dark" 
              type="submit" 
              value="Apply" 
            />
          </form>

          {appliedCoupon && discount > 0 && (
            <p className="flex justify-between"><span className="font-bold text-lg">Saved: <span className="text-xs">({appliedCoupon})<sup onClick={handleRemoveCoupon} className="text-sm hover:text-red-500 cursor-pointer">x</sup></span></span> ${discount.toFixed(2)}</p>
          )}

          <hr className="h-[2px] bg-gray-600 my-2" />
          <p className="flex justify-between"><span className="font-bold text-lg">Grand Total:</span> ${grandTotal}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center my-5 gap-3">
          <button onClick={() => {
            const modal = document.getElementById('clear-cart-modal') as HTMLDialogElement;
            modal?.showModal();
          }} className="bg-red-600 w-7/12 py-2 text-white font-bold rounded">
            Clear cart
          </button>
          <dialog id="clear-cart-modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Are You Sure to clear cart items?</h3>
              <p className="py-4">This action could not be undone!</p>
              <div className="modal-action">
                  <form className="flex gap-5" method="dialog">
                  <button onClick={handleClearCart} className="bg-red-500 px-3 py-1 text-white hover:bg-red-600">Confirm</button>          
                  <button className=" px-3 py-1 bg-gray-300 hover:bg-gray-200">Close</button>
                </form>
              </div>
            </div>
          </dialog>
          <Link 
            className="bg-gradient-to-br from-purple-500 to-pink-500 w-7/12 text-center py-2 text-white font-bold rounded" 
            to="/checkout"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
