import { useNavigate } from "react-router-dom";
import { TProduct } from "./Products";

export default function ProductCard({ product }: { product: TProduct }) {

    const navigate = useNavigate();

    const handleShowDetails = (id: string) => {
        navigate(`/productDetails/${id}`);
    }
    
  return (
      <div onClick={()=>handleShowDetails(product._id)} className="">
          <div className="card bg-base-100 shadow-sm">
          <div className="badge absolute top-2 right-2 badge-secondary">NEW</div>
            <figure >
                <img className=" rounded-t-md"
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
                
            </figure>
              <div className="card-body bg-red-100 rounded-b-md">
                <h2 className="card-title">
                {product.name}
                    <div className="badge badge-secondary">{ product.category}</div>
                  </h2>
                  <p>Brand: { product.brand}</p>
                  <p className="line-clamp-2 text-gray-600">
  {product.description}
</p>
                <div>
                    <span className="">${product.price.toFixed(2)}</span>
                </div>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                </div>
            </div>
        </div>
    </div>
  )
}
