import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import  { OrdersPage } from './pages/Orders';
import { UsersPage } from './pages/Customers';
import { Sidebar } from './components/SlideBar';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('orders');

  return (
    <div className="min-h-screen bg-gray-100 flex">
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
          <h2 className="text-lg font-semibold text-gray-800">
            {currentPage === 'orders' ? 'Đơn hàng' : 'Người dùng'}
          </h2>
        </header>

        <main className="flex-1 p-6 lg:p-8">
          {currentPage === 'orders' ? <OrdersPage /> : <UsersPage />}
        </main>
      </div>
    </div>
  );
}
