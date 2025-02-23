export const CheckOutSkeleton = () => (
    <div className="my-10 max-w-lg mx-auto p-5 bg-white shadow-md rounded-md mt-5 border">
      <h2 className="text-center text-2xl font-bold mb-4">Checkout</h2>
  
      <div className="space-y-3">
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
  
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
  
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
  
        <div className="h-10 bg-gray-300 rounded animate-pulse"></div>
      </div>
  
      <div className="mt-5 border-t pt-3">
        <h3 className="text-xl font-semibold h-6 bg-gray-300 w-1/3 rounded animate-pulse"></h3>
  
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <div className="h-4 bg-gray-300 w-1/2 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-300 w-1/4 rounded animate-pulse"></div>
          </div>
        ))}
  
        <div className="space-y-2 mt-2">
          <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
          <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
        </div>
      </div>
  
      <div className="h-10 bg-gray-300 w-full mt-4 rounded animate-pulse"></div>
    </div>
  );