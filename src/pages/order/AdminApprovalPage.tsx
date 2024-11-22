import React, { useState } from 'react';
import NavBar from '@/components/NavBar/NavBar';
import IncomingOrder from '@/components/Order/admin/IncomingOrder';

const AdminApprovalPage = () => {
  const [orders, setOrders] = useState([
    { id: 1, bookTitle: 'Book Title 1', user: 'User 1', amount: '$10', date: '2024-09-01', status: 'Pending' },
    { id: 2, bookTitle: 'Book Title 2', user: 'User 2', amount: '$15', date: '2024-09-02', status: 'Pending' },
    { id: 3, bookTitle: 'Book Title 3', user: 'User 3', amount: '$20', date: '2024-09-03', status: 'Approved' },
  ]);

  const handleApprove = (orderId:number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Approved' } : order
    ));
    
    // Notify user logic here (e.g., send an email or update user interface)
    alert(`Order ${orderId} approved.`);
  };

  const handleReject = (orderId:number) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'Rejected' } : order
    ));
    
    // Notify user logic here (e.g., send an email or update user interface)
    alert(`Order ${orderId} rejected.`);
  };

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <section className="px-4 md:px-8">
          <h1 className="font-bold leading-8 font-inter text-color3 text-2xl">
            Admin Approval
          </h1>
          <IncomingOrder/>sss
          <table className="min-w-full mt-4 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Book Title</th>
                <th className="py-3 px-4 text-left">User</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.filter(order => order.status === 'Pending').map(order => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.bookTitle}</td>
                  <td className="py-3 px-4">{order.user}</td>
                  <td className="py-3 px-4">{order.amount}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.status}</td>
                  <td className="py-3 px-4">
                    <button 
                      className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                      onClick={() => handleApprove(order.id)}
                    >
                      Approve
                    </button>
                    <button 
                      className="bg-red-500 text-white px-3 py-1 rounded"
                      onClick={() => handleReject(order.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminApprovalPage;