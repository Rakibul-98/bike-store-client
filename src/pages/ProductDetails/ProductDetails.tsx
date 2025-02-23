import { useParams } from 'react-router-dom';
import { useGetAllProductsQuery, useGetProductByIdQuery } from '../../redux/features/products/productsApi';
import DetailsCard from './DetailsCard';
import { TProduct } from '../Products/Products';
import ProductCard from '../Products/ProductCard';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const { productId } = useParams();
  const { data: product, error: productError, isLoading: isProductLoading } = useGetProductByIdQuery(productId as string);
  const { data: allProducts, error: allProductsError, isLoading: isAllProductsLoading } = useGetAllProductsQuery(undefined);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(4); // Small screens
      } else if (window.innerWidth < 1024) {
        setVisibleCount(3); // Medium screens
      } else {
        setVisibleCount(4); // Large screens
      }
    };

    updateVisibleCount(); // Initial call
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  if (productError || allProductsError) return <div>Error loading data</div>;

  const allProductsData = allProducts?.data?.result;

  // Function to get random suggested products
  const getRandomSuggestedProducts = (products: TProduct[], currentProductId: string | undefined) => {
    if (!products) return [];
    const filteredProducts = products.filter((p) => p._id !== currentProductId);
    return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, visibleCount);
  };

  const suggestedProducts = getRandomSuggestedProducts(allProductsData, productId);

  return (
    <div className="my-10">
      {/* Skeleton Loader for DetailsCard */}
      {isProductLoading ? (
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Skeleton */}
            <div className="w-[90%] mx-auto md:ms-0">
              <div className="h-[500px] w-full bg-gray-300 rounded-lg"></div>
            </div>

            {/* Details Skeleton */}
            <div className="flex items-center">
              <div className="w-10/12 mx-auto mt-5 md:mt-0">
                <div className="h-8 bg-gray-300 w-3/4 rounded mb-4"></div>
                <div className="flex gap-5 items-center mb-4">
                  <div className="rating rating-sm">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div key={index} className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    ))}
                  </div>
                  <div className="h-4 bg-gray-300 w-20 rounded"></div>
                </div>
                <div className="flex gap-5 my-5 items-center">
                  <div className="h-6 bg-gray-300 w-20 rounded"></div>
                  <div className="h-6 bg-gray-300 w-20 rounded"></div>
                  <div className="h-6 bg-gray-300 w-10 rounded"></div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="h-4 bg-gray-300 w-24 rounded"></div>
                  <div className="h-4 bg-gray-300 w-24 rounded"></div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="h-4 bg-gray-300 w-32 rounded"></div>
                  <div className="h-4 bg-gray-300 w-24 rounded"></div>
                </div>
                <div className="mb-4">
                  <div className="h-4 bg-gray-300 w-24 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 w-full rounded"></div>
                  <div className="h-3 bg-gray-300 w-full rounded mt-2"></div>
                  <div className="h-3 bg-gray-300 w-3/4 rounded mt-2"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-300 w-24 rounded mb-2"></div>
                  <ul>
                    {Array.from({ length: 3 }).map((_, index) => (
                      <li key={index} className="h-3 bg-gray-300 w-full rounded mt-1"></li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-end mt-5">
                  <div className="h-10 bg-gray-300 w-32 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <DetailsCard productData={product?.data} />
      )}

      {/* Suggested Products Section */}
      <h2 className="font-mono font-semibold text-2xl mt-10 mb-3">Products You May Like</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isAllProductsLoading
          ? Array.from({ length: visibleCount }).map((_, index) => (
              <div key={index} className="p-4 border rounded-lg shadow-md animate-pulse">
                <div className="h-28 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 w-28 my-2 rounded"></div>
                <div className="h-4 bg-gray-300 w-full rounded"></div>
                <div className="h-4 bg-gray-300 w-full mt-1 rounded"></div>
              </div>
            ))
          : suggestedProducts.map((p) => <ProductCard key={p._id} product={p} />)}
      </div>
    </div>
  );
}