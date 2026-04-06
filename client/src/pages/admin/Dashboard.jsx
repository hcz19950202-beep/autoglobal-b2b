import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HiOutlineTruck,
  HiOutlineCheckCircle,
  HiOutlineTrendingUp,
  HiOutlineChatAlt2,
  HiOutlinePlus,
  HiOutlineArrowRight,
} from 'react-icons/hi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    availableVehicles: 0,
    soldVehicles: 0,
    newInquiries: 0
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalVehicles: 124,
        availableVehicles: 98,
        soldVehicles: 26,
        newInquiries: 15
      });
      setRecentInquiries([
        { id: 1, buyerName: 'John Smith', company: 'Global Motors', country: '德国', vehicleTitle: '丰田凯美瑞 2022', createdAt: '2026-03-25T10:30:00Z', status: '待处理' },
        { id: 2, buyerName: 'Ali Khan', company: 'Al-Madina Traders', country: '阿联酋', vehicleTitle: '宝马5系 2021', createdAt: '2026-03-24T15:45:00Z', status: '已联系' },
        { id: 3, buyerName: 'Li Wei', company: 'Asia Car Import', country: '中国', vehicleTitle: '奔驰E级 2023', createdAt: '2026-03-24T09:15:00Z', status: '谈判中' },
        { id: 4, buyerName: 'Ahmed Hassan', company: 'Cairo Auto Group', country: '埃及', vehicleTitle: '本田CR-V 2020', createdAt: '2026-03-23T11:00:00Z', status: '待处理' },
        { id: 5, buyerName: 'Maria Lopez', company: 'LatAm Motors', country: '墨西哥', vehicleTitle: '福特F-150 2022', createdAt: '2026-03-22T08:30:00Z', status: '已联系' },
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const statCards = [
    { label: '车辆总数', value: stats.totalVehicles, icon: HiOutlineTruck, color: 'bg-blue-500' },
    { label: '在售车辆', value: stats.availableVehicles, icon: HiOutlineCheckCircle, color: 'bg-green-500' },
    { label: '已售出', value: stats.soldVehicles, icon: HiOutlineTrendingUp, color: 'bg-orange-500' },
    { label: '新询盘', value: stats.newInquiries, icon: HiOutlineChatAlt2, color: 'bg-purple-500' },
  ];

  const getStatusStyle = (status) => {
    const styles = {
      '待处理': 'bg-blue-100 text-blue-700',
      '已联系': 'bg-yellow-100 text-yellow-700',
      '谈判中': 'bg-purple-100 text-purple-700',
      '已成交': 'bg-green-100 text-green-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans">
      {/* 快捷操作 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">数据概览</h1>
        <div className="flex space-x-3">
          <Link
            to="/admin/vehicles/new"
            className="flex items-center px-4 py-2 bg-[#1a73e8] text-white rounded-lg shadow-sm hover:bg-[#1557b0] transition-colors"
          >
            <HiOutlinePlus className="h-4 w-4 mr-2" />
            添加车辆
          </Link>
          <Link
            to="/admin/inquiries"
            className="flex items-center px-4 py-2 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            <HiOutlineChatAlt2 className="h-4 w-4 mr-2" />
            查看所有询盘
          </Link>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className={`${stat.color} p-4 rounded-xl text-white`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 最近询盘 */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">最近询盘</h3>
            <Link to="/admin/inquiries" className="text-sm font-medium text-[#1a73e8] hover:underline flex items-center">
              查看全部 <HiOutlineArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">买家</th>
                  <th className="px-6 py-4">国家</th>
                  <th className="px-6 py-4">意向车辆</th>
                  <th className="px-6 py-4">日期</th>
                  <th className="px-6 py-4 text-center">状态</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentInquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{inquiry.buyerName}</div>
                      <div className="text-xs text-gray-500">{inquiry.company}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inquiry.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 truncate max-w-[150px]">{inquiry.vehicleTitle}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString('zh-CN')}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(inquiry.status)}`}>
                        {inquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 月度销售图 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">月度销售</h3>
            <div className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-1 rounded">2026年</div>
          </div>
          <div className="flex-grow flex items-end justify-between gap-2 min-h-[250px] pb-6">
            {[40, 65, 55, 80, 70, 95, 85, 90, 100, 75, 85, 95].map((height, i) => (
              <div key={i} className="w-full bg-gray-50 rounded-t-md relative group" style={{ height: '200px' }}>
                <div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a73e8] to-[#64b5f6] rounded-t-md transition-all duration-500 group-hover:from-orange-400 group-hover:to-orange-300"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap">
                  {height} 辆
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-2">
            <span>1月</span>
            <span>6月</span>
            <span>12月</span>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="text-sm font-bold text-gray-700 mb-4">热销车型</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-[#1a73e8] font-bold text-xs">01</div>
                  <span className="text-sm font-medium text-gray-600">丰田海拉克斯</span>
                </div>
                <span className="text-sm font-bold text-gray-800">已售 12 辆</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">02</div>
                  <span className="text-sm font-medium text-gray-600">本田 CR-V</span>
                </div>
                <span className="text-sm font-bold text-gray-800">已售 8 辆</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
