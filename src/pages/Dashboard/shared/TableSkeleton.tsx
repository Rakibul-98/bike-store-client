export const TableSkeleton = () => (
    <table className="table">
      <thead>
        <tr>
          {/* Skeleton for Table Headers */}
          {Array.from({ length: 4 }).map((_, index) => (
            <th key={index}>
              <div className="inline-flex items-center gap-2">
                <div className="h-4 bg-gray-300 w-20 rounded animate-pulse"></div>
                <div className="flex text-base">
                  <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="h-4 w-4 bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            </th>
          ))}
          <th>
            <div className="h-4 bg-gray-300 w-20 rounded animate-pulse"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Skeleton for Table Rows */}
        {Array.from({ length: 8 }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: 4 }).map((_, colIndex) => (
              <td key={colIndex}>
                <div className="h-4 bg-gray-300 w-full rounded animate-pulse"></div>
              </td>
            ))}
            <td>
              <div className="h-8 bg-gray-300 w-16 rounded animate-pulse"></div>
            </td>
            <td>
              <div className="h-6 bg-gray-300 w-6 rounded-full animate-pulse"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );