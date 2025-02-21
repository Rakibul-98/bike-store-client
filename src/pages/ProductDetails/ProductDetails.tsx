import { useParams } from 'react-router-dom';
import { useGetAllProductsQuery, useGetProductByIdQuery } from '../../redux/features/products/productsApi';
import DetailsCard from './DetailsCard';
import { TProduct } from '../Products/Products';
import ProductCard from '../Products/ProductCard';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
    const { productId } = useParams();
    const { data: product, error: productError, isLoading: isProductLoading } = useGetProductByIdQuery(productId);
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
        window.addEventListener("resize", updateVisibleCount);
        return () => window.removeEventListener("resize", updateVisibleCount);
      }, []);
    

    if (isProductLoading || isAllProductsLoading) return <div>Loading...</div>;
    if (productError || allProductsError) return <div>Error loading data</div>;

    const allProductsData = allProducts?.data?.result;

    // Function to get 4 random suggested products
    const getRandomSuggestedProducts = (products:TProduct[], currentProductId: string | undefined) => {
        if (!products) return [];
        const filteredProducts = products.filter((p) => p._id !== currentProductId);
        return filteredProducts.sort(() => 0.5 - Math.random()).slice(0, visibleCount);
    };

    const suggestedProducts = getRandomSuggestedProducts(allProductsData, productId);

    return (
        <div className='my-10'>
            <DetailsCard productData = { product?.data } />
            <h2 className='font-mono font-semibold text-2xl mt-10 mb-3'>Products You may Like</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {suggestedProducts.map((p) => (
                    <ProductCard key={p._id} product={p} />
                ))}
            </div>
        </div>
    );
}