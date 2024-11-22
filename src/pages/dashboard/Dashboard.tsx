import NavBar from '@/components/NavBar/NavBar';
import React from 'react';

const Dashboard = () => {
  const totalSales = 15000; // Example data
  const totalOrders = 120; // Example data
  const totalItems = 300; // Example data
  const recentOrders = [
    { id: 1, item: 'Order #001', amount: '$100', date: '2024-09-01' },
    { id: 2, item: 'Order #002', amount: '$200', date: '2024-09-02' },
    { id: 3, item: 'Order #003', amount: '$150', date: '2024-09-03' },
  ];

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <section className="px-4 md:px-8">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 mr-2"
              viewBox="0 0 24 24"
              fill="url(#gradient)"
            >
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
                </linearGradient>
              </defs>
              <path d="M3 3h18v18H3V3z" />
            </svg>
            <h1 className="font-bold leading-8 font-inter text-color3 text-2xl">
              Dashboard
            </h1>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8 mt-6">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 shadow-lg rounded-lg p-6 text-white">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-3xl font-bold">${totalSales}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg rounded-lg p-6 text-white">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-red-500 shadow-lg rounded-lg p-6 text-white">
            <h2 className="text-lg font-semibold">Total Items</h2>
            <p className="text-3xl font-bold">{totalItems}</p>
          </div>
        </div>

        <section className="mt-8 px-4 md:px-8">
          <h2 className="font-bold text-xl mb-4 text-gray-800">Recent Orders</h2>
          <ul className="bg-white shadow-lg rounded-lg p-4">
            {recentOrders.map(order => (
              <li key={order.id} className="flex justify-between py-3 border-b last:border-b-0 text-gray-700">
                <span>{order.item}</span>
                <span className="font-semibold">{order.amount}</span>
                <span className="text-gray-500">{order.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;