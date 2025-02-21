import { Link } from "react-router-dom";

export default function Promotion() {
    return (
      <div className="mt-20">
        <div className="relative bg-no-repeat bg-cover lg:bg-center h-64 rounded-lg overflow-hidden flex items-center justify-center lg:justify-end text-center" 
             style={{ backgroundImage: "url('https://i.ibb.co.com/20Gsp38b/sale.jpg')" }}>
          <h1 className="text-4xl font-bold text-white z-10 me-10">
            Limited-Time Offers! Up to <span className="text-yellow-400">50% OFF</span>
          </h1>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 text-white">
          <div className="bg-gradient-to-r from-[#0033ff] via-[#0099ff] to-[#00ffff]
 shadow-lg rounded-lg p-6 text-center hover:bg-gradient-to-br ">
            <h2 className="text-2xl font-semibold">New Year Sale</h2>
            <p className=" mt-2 mb-5">Get up to 30% OFF on all mountain bikes!</p>
            <Link to='/products' className=" bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Shop Now
            </Link>
          </div>
  
          <div className="bg-gradient-to-r from-purple-700 via-indigo-500 to-pink-400 shadow-lg rounded-lg p-6 text-center hover:bg-gradient-to-bl">
            <h2 className="text-2xl font-semibold">Flash Deal</h2>
            <p className=" mt-2 mb-5">Buy 1 Get 1 Free on all accessories!</p>
            <Link to='/products' className=" bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600">
              Claim Offer
            </Link>
          </div>
  
          <div className="bg-gradient-to-r from-[#ff007f] via-[#ff4f00] to-[#ffd500]
 shadow-lg rounded-lg p-6 text-center hover:bg-gradient-to-tl">
            <h2 className="text-2xl font-semibold">Membership Discount</h2>
            <p className=" mt-2 mb-5">Join our VIP Club & get 20% OFF on your first order.</p>
            <Link to='/products' className=" bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
              Join Now
            </Link>
          </div>
        </div>
      </div>
    );
  }
  