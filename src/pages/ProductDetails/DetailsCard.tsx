import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/CartSlice";
import { useEffect, useState, useMemo } from "react";
import { BsCartPlus, BsCheck, BsExclamationTriangle } from "react-icons/bs";
import toast from "react-hot-toast";
import { createSelector } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import { useGetUserByEmailQuery } from "../../redux/features/users/usersApi";
import { RootState } from "../../redux/features/store";
import { ItemType } from "../../interfaces/interfaces";

const selectCartItems = (state:RootState ) => state.cart.items;
const memoizedCartItems = createSelector(
  [selectCartItems],
  (items) => (Array.isArray(items) ? items : [])
);

export default function DetailsCard({ productData }: { productData: ItemType }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [isLimitExceed, setIsLimitExceed] = useState(false);

  const loggedInUser = useSelector((state:RootState) => state?.auth?.user);
  const { data: user, error: userError, isLoading: isUserLoading } = useGetUserByEmailQuery(
    loggedInUser?.user || ""
  );

  const {
    available_quantity,
    brand,
    category,
    description,
    features,
    inStock,
    name,
    price,
    product_image,
    _id,
  } = productData;

  const cartItems = useSelector(memoizedCartItems);
  const cartItem = cartItems.find((item) => item._id === _id);
  const cartQuantity = cartItem?.cart_quantity || 0;

  const fakePrice = useMemo(() => price * 1.3, [price]);
  const discountPercentage = useMemo(
    () => Math.ceil(100 - (price / fakePrice) * 100),
    [price, fakePrice]
  );

  useEffect(() => {
    setIsLimitExceed(cartQuantity + 1 > available_quantity);
  }, [cartQuantity, available_quantity]);

  const handleAddToCart = () => {
    if (!isLimitExceed) {
      dispatch(addToCart(productData));
      setAdded(true);
      toast.success("Added to cart successfully!");
      setTimeout(() => setAdded(false), 1500);
    } else {
      toast.error("You cannot add more than the available quantity.");
    }
  };

  if (isUserLoading) return toast.loading("loading user");
  if (userError) return toast.error("Error loading user");

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-no-repeat bg-cover">
        <div className="w-[90%] mx-auto md:ms-0">
          <img className="h-[500px] w-full" src={product_image} alt={name} />
        </div>

        <div className="flex items-center">
          <div className="w-10/12 mx-auto mt-5 md:mt-0">
            <h2 className="text-3xl font-semibold font-mono">{name}</h2>
            <div className="flex gap-5 items-center">
              <div className="rating rating-sm">
                {Array.from({ length: 5 }).map((_, index) => (
                  <input key={index} type="radio" name="rating-1" className="mask mask-star" />
                ))}
              </div>
              <p>(200 Reviews)</p>
            </div>
            <div className="flex gap-5 my-5 items-center">
              <p className="text-red-500 font-medium text-xl">${price}</p>
              <p className="line-through">${fakePrice}</p>
              <p className="bg-red-500 py-1 px-[6px] text-xs text-white">-{discountPercentage}%</p>
            </div>

            <div className="flex justify-between">
              <p>
                <span className="font-semibold font-serif">Brand:</span> {brand}
              </p>
              <p>
                <span className="font-semibold font-serif">Category:</span> {category}
              </p>
            </div>
            <div className="flex justify-between">
              <p>
                <span className="font-semibold font-serif">Available Quantity:</span>{" "}
                {available_quantity}
              </p>
              <p>
                <span className="font-semibold font-serif">In-Stock:</span>{" "}
                <span className={inStock ? "text-green-500" : "text-red-500"}>
                  {inStock ? "Available" : "Out of stock"}
                </span>
              </p>
            </div>
            <div>
              <h3 className="font-semibold font-serif mt-3">Description</h3>
              <p>{description}</p>
            </div>
            <ul>
              <h3 className="font-semibold font-serif mt-3">Features:</h3>
              {features.map((feature: string, index: number) => (
                <li className="list-disc list-inside" key={index}>
                  {feature}
                </li>
              ))}
            </ul>

            <div className="flex justify-end mt-5">
              {loggedInUser?.role === "customer" && !user?.data?.isBlocked ? (
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock || isLimitExceed}
                  className={`flex items-center gap-2 px-5 py-[6px] ${
                    !inStock || isLimitExceed
                      ? "bg-gray-400 cursor-not-allowed"
                      : added
                      ? "bg-green-500"
                      : "bg-blue-500 hover:bg-blue-700"
                  } text-white font-semibold rounded-btn shadow-lg transition-all duration-300`}
                >
                  {!inStock || isLimitExceed ? (
                    <>
                      <BsExclamationTriangle className="text-lg" /> Out of Stock
                    </>
                  ) : added ? (
                    <>
                      <BsCheck className="text-lg" /> Added
                    </>
                  ) : (
                    <>
                      <BsCartPlus className="text-lg" /> Add to Cart
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-5 py-[6px] font-semibold rounded-btn shadow-lg border bg-slate-200 hover:bg-base-100"
                >
                  {user?.data?.isBlocked ? "User Blocked" : "Login as customer to buy product"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}