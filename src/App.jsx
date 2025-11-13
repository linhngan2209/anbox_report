import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { OrdersPage } from './pages/Orders';
import { UsersPage } from './pages/Customers';
import { FeedbackPage } from './pages/Feedback';
import { Sidebar } from './components/SlideBar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('orders');

  return (
    <div className="min-h-screen flex bg-gray-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm p-4 lg:hidden flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-600 hover:text-gray-900"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-semibold text-gray-800 capitalize">
            {currentPage === 'orders'
              ? 'Đơn hàng'
              : currentPage === 'users'
              ? 'Người dùng'
              : 'Phản hồi'}
          </h2>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {currentPage === 'orders' && <OrdersPage />}
          {currentPage === 'users' && <UsersPage />}
          {currentPage === 'feedback' && <FeedbackPage />}
        </main>
      </div>
    </div>
  );
}
