import React, { useEffect, useState } from 'react';
import { DollarSign, Package } from 'lucide-react';
import axios from 'axios';

export function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const [ordersRes, statsRes] = await Promise.all([
          axios.get('https://game.sanboxs.site/server/orders'),
          axios.get('https://game.sanboxs.site/server/orders/stats'),
        ]);
        setOrders(ordersRes.data);
        setStats(statsRes.data);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Đơn hàng</h1>

      {/* --- Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Tổng doanh số</p>
              <h3 className="text-3xl font-bold">
                {stats.totalRevenue?.toLocaleString('vi-VN')}đ
              </h3>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <DollarSign className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">Số đơn hàng</p>
              <h3 className="text-3xl font-bold">{stats.totalOrders}</h3>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <Package className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Mã đơn</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Gói ăn</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Người đặt</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Số điện thoại</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Địa chỉ</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Số tiền</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Thanh toán</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Ngày tạo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.orderId}</td>
                    <td className="px-6 py-4 text-gray-700">{order.planName}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {order.deliveryInfo?.fullName || '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {order.deliveryInfo?.phone || '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-600 truncate max-w-[250px]">
                      {order.deliveryInfo?.address || '—'}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {order.price?.toLocaleString('vi-VN')}đ
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    Không có đơn hàng nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
