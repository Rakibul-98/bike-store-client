export const UserProfileSkeleton = () => (
  <div className="my-10 min-h-[80vh] flex items-center justify-center">
    <div className="md:w-96 shadow-lg rounded-xl p-6 text-center border bg-gray-50">
      {/* Profile Image Skeleton */}
      <div className="relative mx-auto w-24 h-24">
        <div className="w-full h-full rounded-full border-4 border-green-500 bg-gray-300 animate-pulse"></div>
      </div>

      {/* User Name Skeleton */}
      <div className="mt-4">
        <div className="h-6 bg-gray-300 w-3/4 mx-auto rounded animate-pulse"></div>
      </div>

      {/* Read-only Fields Skeleton */}
      <div className="text-left space-y-2 text-gray-700 mt-4">
        <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
        <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
      </div>

      {/* Save Button Skeleton */}
      <div className="mt-4">
        <div className="h-10 bg-gray-300 w-full rounded-lg animate-pulse"></div>
      </div>
    </div>
  </div>
);