import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  const [quantity, setQuantity] = useState(1); // Start with 1 to avoid 0 items
  const [inputValue, setInputValue] = useState(quantity); // To track the value in the input field

  const handleInputChange = (e) => {
    const newValue = Number(e.target.value);
    if (newValue >= 1) { // Prevent invalid values like 0 or negative
      setQuantity(newValue);
      setInputValue(newValue);
    }
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
    setInputValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity <= 1) {
      setQuantity(0);
      setInputValue(0);
    } else {
      setQuantity(prev => prev - 1);
      setInputValue(prev => prev - 1);
    }
  };

  const removeItem = () => {
    setQuantity(0);
    setInputValue(0);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-items mb-5">
        {quantity > 0 && (
          <div className="cart-item bg-yellow-200 flex gap-5">
            <img src="item-image.jpg" alt="item" className="item-image" />
            <div className="item-details w-full flex justify-between">
              <div>
                <h3 className="item-name">Item Name</h3>
                <p className="item-price">$20.00</p>
              </div>
              <div className="flex items-center mb-5 md:mb-0">
              <button
                  type="button"
                  onClick={handleDecrement}
                  className="border px-2 py-1 text-lg"
                >
                  -
                </button>
                <input
                  className={`mx-2 w-12 text-center text-black rounded-[3px] focus:outline-none focus:border border-black h-[30px]`}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={() => setQuantity(inputValue)}
                />
                
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="border px-2 py-1 text-lg"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {quantity === 0 && (
        <div className="cart-summary bg-slate-200">
          <h2>Your cart is empty</h2>
          <Link className="flex justify-center" to='/products'>Back to products</Link>
        </div>
      )}
      {quantity > 0 && (
        <div className="cart-summary bg-slate-200">
          <h2 className="flex justify-between">Subtotal <span>${quantity * 20}</span></h2>
          <form action="">
            <input type="text" placeholder="Enter your coupon code" />
            <button type="submit">Apply Coupon</button>
          </form>
          <p className="flex justify-between">Total (after applying coupon): <span>${quantity * 20}</span></p>
          <Link className="flex justify-center" to='/checkout'>Checkout</Link>
        </div>
      )}
    </div>
  );
}
