
import { Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function UsersPage() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('https://game.sanboxs.site/server/auth/get-list-user');
        const data = res.data;
        const formatted = data.map((user, index) => ({
          id: `U${index + 1}`,
          name: user.name,
          email: user.email || '',
          phone: user.phoneNumber || '',
          joinDate: new Date(user.createdAt).toLocaleDateString('vi-VN'),
        }));
        setUsersData(formatted);
      } catch (err) {
        console.error('Lỗi khi lấy danh sách người dùng:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalUsers = usersData.length;

  if (loading) {
    return <div className="text-center mt-10">Đang tải...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Người dùng</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Tổng số người dùng</p>
              <h3 className="text-3xl font-bold">{totalUsers}</h3>
            </div>
            <div className="bg-white/20 p-4 rounded-lg">
              <Users className="w-8 h-8" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Tên</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Số điện thoại</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ngày tham gia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{user.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
