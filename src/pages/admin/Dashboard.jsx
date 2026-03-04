import { useEffect, useState } from 'react';
import { getOrders } from '../../data/seedOrders';

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    setOrders(getOrders());
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProductCount(data.length))
      .catch(() => {});
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = [...orders].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const metrics = [
    { label: 'Total Products', value: productCount, icon: '📦', color: 'bg-blue-50 text-blue-700' },
    { label: 'Total Orders', value: orders.length, icon: '📋', color: 'bg-green-50 text-green-700' },
    { label: 'Revenue', value: `₹${totalRevenue.toFixed(2)}`, icon: '💰', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'Pending', value: orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length, icon: '⏳', color: 'bg-red-50 text-red-700' },
  ];

  const statusColor = (status) => {
    const map = { Delivered: 'bg-green-100 text-green-700', Shipped: 'bg-blue-100 text-blue-700', Processing: 'bg-yellow-100 text-yellow-700', Pending: 'bg-gray-100 text-gray-700', Cancelled: 'bg-red-100 text-red-700' };
    return map[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics.map(m => (
          <div key={m.label} className={`rounded-xl p-5 ${m.color}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-75">{m.label}</p>
                <p className="text-2xl font-bold mt-1">{m.value}</p>
              </div>
              <span className="text-3xl">{m.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Order ID</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Customer</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Date</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Total</th>
                <th className="px-6 py-3 text-left font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">#{order.id}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4 font-medium">₹{order.total.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
