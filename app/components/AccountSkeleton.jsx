export default function AccountSkeleton() {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow animate-pulse">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b border-gray-600 pb-2 mb-4">
        <div className="h-6 bg-gray-600 rounded w-48"></div>
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-600 rounded w-16"></div>
          <div className="h-6 bg-gray-600 rounded w-6"></div>
        </div>
      </div>

      {/* Financial Sections Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Costs Section */}
        <div className="bg-red-900/40 p-4 rounded-lg">
          <div className="h-5 bg-gray-600 rounded w-16 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded w-3/4"></div>
          </div>
          <div className="h-px bg-gray-600 my-2"></div>
          <div className="h-5 bg-gray-600 rounded w-20 mt-2"></div>
        </div>

        {/* Saves Section */}
        <div className="bg-green-900/40 p-4 rounded-lg">
          <div className="h-5 bg-gray-600 rounded w-16 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
          </div>
          <div className="h-px bg-gray-600 my-2"></div>
          <div className="h-5 bg-gray-600 rounded w-20 mt-2"></div>
        </div>

        {/* Extras Section */}
        <div className="bg-yellow-900/40 p-4 rounded-lg">
          <div className="h-5 bg-gray-600 rounded w-20 mb-3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded"></div>
            <div className="h-4 bg-gray-600 rounded w-2/3"></div>
          </div>
          <div className="h-px bg-gray-600 my-2"></div>
          <div className="h-5 bg-gray-600 rounded w-20 mt-2"></div>
        </div>
      </div>

      {/* Add Entry Form Skeleton */}
      <div className="mt-6 p-4 border border-gray-600 rounded-lg">
        <div className="h-5 bg-gray-600 rounded w-24 mb-3"></div>
        <div className="grid grid-cols-4 gap-4">
          <div className="h-10 bg-gray-600 rounded"></div>
          <div className="h-10 bg-gray-600 rounded"></div>
          <div className="h-10 bg-gray-600 rounded"></div>
          <div className="h-10 bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
}
