import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { TProduct } from "../Products/Products";
import { useState } from "react";
import { BsCartPlus, BsCheck } from "react-icons/bs";

export default function DetailsCard({ productData }: { productData: TProduct}) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const { available_quantity, brand, category, description, features, inStock, name, price, product_image } = productData;

  const fakePrice = (price * 1.3);
  const discountPercentage = Math.ceil((100 - ((price / fakePrice) * 100)));
  
  const handleAddToCart = () => {
    dispatch(addToCart(productData));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-no-repeat bg-cover" >
        <div className="w-[90%] mx-auto md:ms-0" >
          <img className="h-[500px] w-full"
            src={product_image}
            alt={name} />
        </div>
        <div className="flex items-center">
        <div className="w-10/12 mx-auto mt-5 md:mt-0">
          <h2 className="text-3xl font-semibold font-mono">{name}</h2>
          <div className="flex gap-5 items-center">
            <div className="rating rating-sm">
              <input type="radio" name="rating-1" className="mask mask-star" />
              <input type="radio" name="rating-1" className="mask mask-star" />
              <input type="radio" name="rating-1" className="mask mask-star" />
              <input type="radio" name="rating-1" className="mask mask-star" defaultChecked/>
              <input type="radio" name="rating-1" className="mask mask-star" />
            </div>
            <p>(200 Reviews)</p>
          </div>
          <div className="flex gap-5 my-5 items-center">
            <p className="text-red-500 font-medium text-xl">${price}</p>
            <p className="line-through">${fakePrice}</p>
            <p className="bg-red-500 py-1 px-[6px] text-xs text-white">-{discountPercentage}%</p>
          </div>
          
          <div className="flex justify-between">
            <p><span className="font-semibold font-serif">Brand:</span> {brand}</p>
            <p><span className="font-semibold font-serif">Category:</span> {category}</p>
          </div>
          <div className="flex justify-between">
            <p><span className="font-semibold font-serif">Available Quantity:</span> {available_quantity}</p>
            <p><span className="font-semibold font-serif">In-Stock:</span> {inStock ? 'Available' : 'Out of stock'}</p>
          </div>
          <div>
            <h3 className="font-semibold font-serif mt-3">Description</h3>
          <p>
            {description}
          </p>
          </div>
          <ul>
              <h3 className="font-semibold font-serif mt-3">Features: </h3>
              {features.map((feature: string, index: number) => (
                  <li className="list-disc list-inside lis" key={index}>{feature}</li>
              ))}
          </ul>
          <div className="flex justify-end mt-5">
            {/* <button onClick={handleAddToCart} className="btn btn-primary">Add to cart</button> */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center gap-2 px-5 py-[6px] ${added ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'} text-white font-semibold rounded-btn shadow-lg transition-all duration-300`}
            >
              {added ? (
                <>
                  <BsCheck className="text-lg" /> Added
                </>
              ) : (
                <>
                  <BsCartPlus className="text-lg" /> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
