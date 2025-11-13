import React, { useEffect, useState } from 'react';
import { User, MessageCircle } from 'lucide-react';
import axios from 'axios';

export function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState({ totalFeedbacks: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        // Lấy danh sách phản hồi
        const feedbackRes = await axios.get('https://game.sanboxs.site/server/feedback');

        // Tạo thống kê đơn giản: tổng phản hồi
        const totalFeedbacks = feedbackRes.data.length;

        setFeedbacks(feedbackRes.data);
        setStats({ totalFeedbacks });
        setError(null);
      } catch (err) {
        console.error(err);
        setError('Không thể tải phản hồi. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 text-gray-500 text-lg">
        Đang tải dữ liệu...
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64 text-red-600 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-gray-700" /> Phản hồi người dùng
        </h1>

        {/* --- Card thống kê --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Tổng phản hồi</p>
                <h3 className="text-3xl font-bold">{stats.totalFeedbacks}</h3>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <User className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* --- Bảng phản hồi --- */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Tên</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Nội dung</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Ngày gửi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feedbacks.length > 0 ? (
                  feedbacks.map((fb) => (
                    <tr key={fb._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900">{fb.name}</td>
                      <td className="px-6 py-4 text-gray-700">{fb.email}</td>
                      <td className="px-6 py-4 text-gray-700">{fb.message}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {new Date(fb.createdAt).toLocaleString('vi-VN')}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center py-8 text-gray-500">
                      Chưa có phản hồi nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
