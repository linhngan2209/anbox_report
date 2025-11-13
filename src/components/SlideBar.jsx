import React from 'react';
import { ShoppingCart, Users, MessageSquare, ChevronRight, X } from 'lucide-react';

export function Sidebar({ isOpen, onClose, currentPage, setCurrentPage }) {
  const menuItems = [
    { id: 'orders', label: 'Đơn hàng', icon: ShoppingCart, page: 'orders' },
    { id: 'users', label: 'Người dùng', icon: Users, page: 'users' },
    { id: 'feedback', label: 'Phản hồi', icon: MessageSquare, page: 'feedback' },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="p-4 h-full overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setCurrentPage(item.page);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors
                    ${currentPage === item.page ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
}
