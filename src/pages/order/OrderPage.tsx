import NavBar from '@/components/NavBar/NavBar';
import IncomingOrder from '@/components/Order/admin/IncomingOrder';
import { IncomingMessage } from 'http';
import React from 'react';

const OrderPage = () => {
  const orders = [
    { id: 1, bookTitle: 'Book Title 1', amount: '$10', date: '2024-09-01', status: 'Approved', downloadLink: '/downloads/book1.pdf' },
    { id: 2, bookTitle: 'Book Title 2', amount: '$15', date: '2024-09-02', status: 'Pending Approval', downloadLink: null },
    { id: 3, bookTitle: 'Book Title 3', amount: '$20', date: '2024-09-03', status: 'Approved', downloadLink: '/downloads/book3.pdf' },
  ];

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        <section className="px-4 md:px-8">
          <h1 className="font-bold leading-8 font-inter text-color3 text-2xl">
            My Orders
            <IncomingOrder/>
          </h1>
          <table className="min-w-full mt-4 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Book Title</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{order.bookTitle}</td>
                  <td className="py-3 px-4">{order.amount}</td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">{order.status}</td>
                  <td className="py-3 px-4">
                    {order.status === 'Approved' && order.downloadLink ? (
                      <a
                        href={order.downloadLink}
                        className="text-blue-500 hover:underline"
                        download
                      >
                        Download
                      </a>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
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

export default OrderPage;