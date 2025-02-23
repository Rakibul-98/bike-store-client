import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

export default function Reports() {
  // Dummy Sales Data
  const salesSummary = {
    totalRevenue: 152400,
    totalOrders: 1250,
    totalProfit: 58200,
  };

  // Dummy Order Statistics
  const orderStats = {
    pending: 15,
    delivered: 1200,
    cancelled: 35,
  };

  // Dummy Revenue Chart Data
  const revenueData = [
    { month: "Jan", revenue: 12000 },
    { month: "Feb", revenue: 9500 },
    { month: "Mar", revenue: 14200 },
    { month: "Apr", revenue: 16800 },
    { month: "May", revenue: 15000 },
    { month: "Jun", revenue: 13200 },
    { month: "Jul", revenue: 17500 },
    { month: "Aug", revenue: 19000 },
    { month: "Sep", revenue: 21000 },
    { month: "Oct", revenue: 19500 },
    { month: "Nov", revenue: 18500 },
    { month: "Dec", revenue: 22000 },
  ];

  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <p className="text-gray-600 mb-6">View and analyze sales, inventory, and other data.</p>

      {/* Sales Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-xl font-bold text-blue-700">${salesSummary.totalRevenue}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-xl font-bold text-green-700">{salesSummary.totalOrders}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Profit</h2>
          <p className="text-xl font-bold text-yellow-700">${salesSummary.totalProfit}</p>
        </div>
      </div>

      {/* Order Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-100 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Pending Orders</h2>
          <p className="text-xl font-bold">{orderStats.pending}</p>
        </div>
        <div className="bg-green-200 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Delivered Orders</h2>
          <p className="text-xl font-bold">{orderStats.delivered}</p>
        </div>
        <div className="bg-red-200 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Cancelled Orders</h2>
          <p className="text-xl font-bold">{orderStats.cancelled}</p>
        </div>
      </div>      

      {/* Revenue Chart */}
      <h2 className="text-xl font-bold mb-3">Monthly Revenue</h2>
      <div className="w-full h-64 bg-gray-100 p-4 rounded-lg">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
