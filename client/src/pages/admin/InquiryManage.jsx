import React, { useState, useEffect } from 'react';
import { getAllInquiries, updateInquiryStatus } from '../../services/api';
import {
  Search, Eye, Globe, MessageSquare, Mail, Phone,
  Loader2, ChevronLeft, ChevronRight, X, User, Building2, Calendar, ExternalLink, Car
} from 'lucide-react';

const InquiryManage = () => {
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      try {
        const response = await getAllInquiries({ page, status: statusFilter === 'all' ? '' : statusFilter, search: searchTerm, limit: 10 });
        setInquiries(response.inquiries || []);
        setTotalPages(response.totalPages || 1);
      } catch (e) {
        setInquiries([
          { id: '1', buyerName: 'John Smith', email: 'john@globalmotors.de', phone: '+49 123 456789', company: 'Global Motors', country: '德国', vehicleTitle: '丰田凯美瑞混动 2022', quantity: 2, message: '我们需要2辆用于出口到德国，请提供CIF汉堡港的最优价格。', status: 'new', createdAt: '2026-03-25T10:30:00Z' },
          { id: '2', buyerName: 'Ali Khan', email: 'ali@almadina.ae', phone: '+971 50 123 4567', company: 'Al-Madina Traders', country: '阿联酋', vehicleTitle: '宝马5系 M运动版', quantity: 1, message: '请问这辆车还有库存吗？对宝马5系非常感兴趣。', status: 'contacted', createdAt: '2026-03-24T15:45:00Z' },
          { id: '3', buyerName: 'Li Wei', email: 'liwei@asiacar.cn', phone: '+86 138 0000 0000', company: 'Asia Car Import', country: '中国', vehicleTitle: '奔驰E级 2023', quantity: 1, message: '我们需要右舵版本的奔驰E级，请问是否符合要求？', status: 'negotiating', createdAt: '2026-03-24T09:15:00Z' },
          { id: '4', buyerName: 'David Brown', email: 'david@brown-autos.co.uk', phone: '+44 20 1234 5678', company: 'Brown Autos', country: '英国', vehicleTitle: '本田CR-V 尊贵版', quantity: 5, message: '批量采购询价，需要5-10辆2020年以上的CR-V。', status: 'closed', createdAt: '2026-03-23T11:20:00Z' },
        ]);
        setTotalPages(1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchInquiries(); }, [statusFilter, page]);
  useEffect(() => {
    const timer = setTimeout(() => { fetchInquiries(); }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleStatusUpdate = async (id, newStatus) => {
    setIsUpdating(true);
    try {
      await updateInquiryStatus(id, newStatus);
    } catch (err) {}
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
    if (selectedInquiry?.id === id) setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    setIsUpdating(false);
  };

  const statusMap = {
    new: { label: '待处理', style: 'bg-blue-100 text-blue-700 border-blue-200' },
    contacted: { label: '已联系', style: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
    negotiating: { label: '谈判中', style: 'bg-purple-100 text-purple-700 border-purple-200' },
    closed: { label: '已成交', style: 'bg-green-100 text-green-700 border-green-200' },
  };

  const filters = [
    { label: '全部', value: 'all' },
    { label: '待处理', value: 'new' },
    { label: '已联系', value: 'contacted' },
    { label: '谈判中', value: 'negotiating' },
    { label: '已成交', value: 'closed' }
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">客户询盘管理</h1>
        <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-100 flex overflow-hidden">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatusFilter(f.value)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                statusFilter === f.value ? 'bg-[#1a73e8] text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="搜索买家姓名、邮箱或公司..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20 focus:border-[#1a73e8] transition-all text-sm" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-[#1a73e8] animate-spin mb-4" />
              <p className="text-gray-500">加载中...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-[0.1em] border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4">买家 / 公司</th>
                  <th className="px-6 py-4">国家</th>
                  <th className="px-6 py-4">意向车辆</th>
                  <th className="px-6 py-4">接收日期</th>
                  <th className="px-6 py-4 text-center">状态</th>
                  <th className="px-6 py-4 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.length > 0 ? inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-blue-50 flex items-center justify-center text-[#1a73e8] mr-3 font-bold text-sm">
                          {inquiry.buyerName.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-900 group-hover:text-[#1a73e8] transition-colors">{inquiry.buyerName}</div>
                          <div className="text-xs text-gray-500">{inquiry.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-sm text-gray-600 font-medium">
                        <Globe className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        {inquiry.country}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-800 font-bold truncate max-w-[200px]">{inquiry.vehicleTitle}</div>
                      <div className="text-xs text-gray-500">数量: {inquiry.quantity} 辆</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-2 text-gray-400" />
                        {new Date(inquiry.createdAt).toLocaleDateString('zh-CN')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-block px-2.5 py-1 text-[10px] font-bold rounded-md border ${statusMap[inquiry.status]?.style || 'bg-gray-100 text-gray-700'}`}>
                        {statusMap[inquiry.status]?.label || inquiry.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => { setSelectedInquiry(inquiry); setShowDetailModal(true); }} className="p-2 text-gray-400 hover:text-[#1a73e8] hover:bg-blue-50 rounded-lg transition-all" title="查看详情">
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <MessageSquare className="h-12 w-12 text-gray-200 mb-2 mx-auto" />
                      <p className="text-gray-500">暂无询盘记录</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400 font-bold">第 <span className="text-gray-900">{page}</span> / <span className="text-gray-900">{totalPages}</span> 页</p>
          <div className="flex space-x-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50"><ChevronLeft className="h-4 w-4 text-gray-500" /></button>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50"><ChevronRight className="h-4 w-4 text-gray-500" /></button>
          </div>
        </div>
      </div>

      {/* 询盘详情弹窗 */}
      {showDetailModal && selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDetailModal(false)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden">
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900">询盘详情</h3>
                <p className="text-xs text-gray-500 font-medium mt-1">编号: INQ-{selectedInquiry.id}</p>
              </div>
              <button onClick={() => setShowDetailModal(false)} className="p-2 bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all border border-gray-200">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-8 py-8 space-y-8">
              {/* 状态更新 */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
                <div className="flex items-center">
                  <span className={`px-3 py-1 text-xs font-bold rounded-lg border ${statusMap[selectedInquiry.status]?.style}`}>
                    {statusMap[selectedInquiry.status]?.label}
                  </span>
                  <span className="ml-3 text-sm text-blue-600 font-medium">更新状态：</span>
                </div>
                <div className="flex gap-2">
                  {Object.entries(statusMap).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => handleStatusUpdate(selectedInquiry.id, key)}
                      disabled={isUpdating || selectedInquiry.status === key}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                        selectedInquiry.status === key ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-800'
                      }`}
                    >
                      {val.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 买家信息 */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <User className="h-4 w-4 mr-2" /> 买家信息
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start"><div className="text-sm font-bold text-gray-800 w-20">姓名：</div><div className="text-sm text-gray-600">{selectedInquiry.buyerName}</div></div>
                    <div className="flex items-start"><div className="text-sm font-bold text-gray-800 w-20">公司：</div><div className="text-sm text-gray-600 flex items-center"><Building2 className="h-3.5 w-3.5 mr-1.5 text-gray-400" />{selectedInquiry.company}</div></div>
                    <div className="flex items-start"><div className="text-sm font-bold text-gray-800 w-20">国家：</div><div className="text-sm text-gray-600 flex items-center"><Globe className="h-3.5 w-3.5 mr-1.5 text-gray-400" />{selectedInquiry.country}</div></div>
                    <div className="flex items-start pt-2 border-t mt-2"><div className="text-sm font-bold text-gray-800 w-20">邮箱：</div><a href={`mailto:${selectedInquiry.email}`} className="text-sm text-[#1a73e8] font-medium hover:underline flex items-center"><Mail className="h-3.5 w-3.5 mr-1.5" />{selectedInquiry.email}</a></div>
                    <div className="flex items-start"><div className="text-sm font-bold text-gray-800 w-20">电话：</div><a href={`tel:${selectedInquiry.phone}`} className="text-sm text-gray-600 flex items-center hover:text-[#1a73e8]"><Phone className="h-3.5 w-3.5 mr-1.5 text-gray-400" />{selectedInquiry.phone}</a></div>
                  </div>
                </div>

                {/* 车辆需求 */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                    <Car className="h-4 w-4 mr-2" /> 意向车辆
                  </h4>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="text-sm font-bold text-gray-900 mb-1">{selectedInquiry.vehicleTitle}</div>
                    <div className="text-xs text-gray-500 mb-4">需求数量: {selectedInquiry.quantity} 辆</div>
                    <span className="text-xs font-bold text-[#1a73e8] flex items-center">
                      查看车辆详情 <ExternalLink className="h-3 w-3 ml-1" />
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-400 font-bold">
                    <Calendar className="h-3.5 w-3.5 mr-2" /> 接收时间: {new Date(selectedInquiry.createdAt).toLocaleString('zh-CN')}
                  </div>
                </div>
              </div>

              {/* 留言 */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" /> 买家留言
                </h4>
                <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-700 leading-relaxed italic">
                  "{selectedInquiry.message}"
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button onClick={() => setShowDetailModal(false)} className="px-6 py-2.5 bg-gray-800 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg">
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryManage;
