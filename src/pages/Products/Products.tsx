import { useGetAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCard from "./ProductCard";

export type TProduct = {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  quantity: number;
  description: string;
  inStock: boolean;
  isDeleted: boolean;
};

export default function Products() {
  const { data, isLoading, error } = useGetAllProductsQuery(undefined);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Products Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(data?.data) && data.data.length > 0 ? (
          data.data.map((product : TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full">No products available.</p>
        )}
      </div>
    </div>
  );
}
