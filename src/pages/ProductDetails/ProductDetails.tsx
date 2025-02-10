import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/features/products/productsApi";

export default function ProductDetails() {
  const { id } = useParams();

  // Fetch product data
  const { data, isLoading, error } = useGetProductByIdQuery(id!);

  // Ensure data exists before accessing data.data
  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Failed to load product.</p>;
  if (!data || !data.data) return <p>Product not found.</p>;

  // Extract product properties
  const { name, category, description, brand, inStock, price } = data.data;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold">Product Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-2">
      <div>
        <img
          className="w-full object-cover object-center"
          src={`/api/products/image/${id}`}
          alt={name}
        />
      </div>
      <div className="">
        <h2 className="text-xl font-bold flex justify-between">{name} <span className=" badge badge-neutral"><small>{inStock ? "In Stock" : "Out of Stock"}</small></span></h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-gray-800"><strong>Brand:</strong> {brand}</p>
        <p className="text-gray-800"><strong>Category:</strong> {category}</p>
        <p className="text-green-600 font-bold"><strong>Price:</strong> ${price}</p>
        <div className="flex justify-end space-x-5">
          <button className="px-3 border-2">Add to Cart</button>
          <button className="px-3 border-2">Buy Now</button>
        </div>
        </div>
        
      </div>
    </div>
  );
}
