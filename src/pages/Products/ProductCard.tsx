import { useNavigate } from "react-router-dom";
import { TProduct } from "./Products";

export default function ProductCard({ product }: { product: TProduct }) {
  const { _id, brand, category, description, name, price, product_image } = product;
  const navigate = useNavigate();

  const handleShowDetails = (id: string) => {
    navigate(`/productDetails/${id}`);
  };

  return (
    <div onClick={() => handleShowDetails(_id)} className="cursor-pointer group">
      <div className="card bg-base-100 shadow-md group-hover:shadow-xl hover:ring-2 hover:ring-green-500 rounded-md overflow-hidden flex flex-col h-full">
        <div className="badge absolute top-2 right-2 badge-secondary">NEW</div>
        
        {/* Image */}
        <figure className="w-full h-40">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
            src={product_image}
            alt={name}
          />
        </figure>

        {/* Card Body */}
        <div className="card-body bg-red-100 p-2 flex flex-col flex-grow">
          <h2 className="text-lg font-semibold flex justify-between">
            {name}
            <div className="badge badge-neutral">{category}</div>
          </h2>
          <p className="text-sm text-gray-700"><span className="font-semibold">Brand:</span> {brand}</p>
          <p className="text-sm text-gray-600 overflow-hidden whitespace-nowrap text-ellipsis">
            {description}
          </p>

          <div className="font-semibold text-gray-800">Price: <span className="text-xs">$ {price.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
