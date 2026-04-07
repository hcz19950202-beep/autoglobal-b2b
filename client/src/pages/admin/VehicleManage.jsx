import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVehicles, deleteVehicle } from '../../services/api';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  X,
  Car
} from 'lucide-react';

const VehicleManage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      try {
        const response = await getVehicles({ page, search: searchTerm, limit: 10 });
        const list = (response.vehicles || []).map(v => ({
          ...v,
          id: v._id || v.id,
          mainImage: v.images?.[0] || v.mainImage,
          status: v.stockStatus || v.status || 'available',
        }));
        setVehicles(list);
        setTotalPages(response.pages || response.totalPages || 1);
      } catch (e) {
        setVehicles([
          { id: '1', mainImage: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=200&q=80', title: '丰田凯美瑞混动 2022', brand: '丰田', year: 2022, price: 32000, status: 'available' },
          { id: '2', mainImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=200&q=80', title: '宝马5系 M运动版', brand: '宝马', year: 2021, price: 45000, status: 'reserved' },
          { id: '3', mainImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d62bc3?auto=format&fit=crop&w=200&q=80', title: '奔驰E级 豪华版 2023', brand: '奔驰', year: 2023, price: 58000, status: 'sold' },
          { id: '4', mainImage: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=200&q=80', title: '本田CR-V 尊贵版', brand: '本田', year: 2020, price: 28500, status: 'available' },
          { id: '5', mainImage: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=200&q=80', title: '奥迪A6 Avant 四驱版', brand: '奥迪', year: 2022, price: 42000, status: 'available' },
        ]);
        setTotalPages(1);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { fetchVehicles(); }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, page]);

  const handleDelete = async () => {
    if (!vehicleToDelete) return;
    setIsDeleting(true);
    try {
      await deleteVehicle(vehicleToDelete.id);
      setShowDeleteModal(false);
      fetchVehicles();
    } catch (err) {
      setVehicles(prev => prev.filter(v => v.id !== vehicleToDelete.id));
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
      setVehicleToDelete(null);
    }
  };

  const confirmDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
  };

  const getStatusBadge = (status) => {
    const map = {
      available: { style: 'bg-green-100 text-green-700', label: '在售' },
      reserved: { style: 'bg-yellow-100 text-yellow-700', label: '已预留' },
      sold: { style: 'bg-red-100 text-red-700', label: '已售出' },
    };
    return map[status] || { style: 'bg-gray-100 text-gray-700', label: status };
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">车辆库存管理</h1>
        <Link
          to="/admin/vehicles/new"
          className="flex items-center justify-center px-4 py-2 bg-[#1a73e8] text-white rounded-lg shadow-sm hover:bg-[#1557b0] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          添加车辆
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* 搜索/筛选 */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索车辆名称、品牌..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1a73e8]/20 focus:border-[#1a73e8] transition-all text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-lg">
              <Filter className="h-4 w-4 mr-2" />
              筛选
            </button>
          </div>
        </div>

        {/* 车辆列表 */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-[#1a73e8] animate-spin mb-4" />
              <p className="text-gray-500">加载中...</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">图片</th>
                  <th className="px-6 py-4">车辆信息</th>
                  <th className="px-6 py-4">品牌 / 年份</th>
                  <th className="px-6 py-4 text-right">价格 (USD)</th>
                  <th className="px-6 py-4 text-center">状态</th>
                  <th className="px-6 py-4 text-center">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {vehicles.length > 0 ? (
                  vehicles.map((vehicle) => {
                    const badge = getStatusBadge(vehicle.status);
                    return (
                      <tr key={vehicle.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <img src={vehicle.mainImage || '/placeholder-car.jpg'} alt={vehicle.title} className="h-12 w-20 object-cover rounded-md shadow-sm bg-gray-100" />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-gray-900">{vehicle.title}</div>
                          <div className="text-xs text-gray-500">编号: #{vehicle.id.toString().slice(-6)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-800">{vehicle.brand}</div>
                          <div className="text-xs text-gray-500">{vehicle.year}年</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="text-sm font-bold text-gray-900">${vehicle.price?.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-md ${badge.style}`}>
                            {badge.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Link to={`/admin/vehicles/edit/${vehicle.id}`} className="p-1.5 text-gray-400 hover:text-[#1a73e8] hover:bg-blue-50 rounded-lg transition-all" title="编辑">
                              <Edit2 className="h-4 w-4" />
                            </Link>
                            <button onClick={() => confirmDelete(vehicle)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="删除">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center">
                        <Car className="h-12 w-12 text-gray-200 mb-2" />
                        <p className="text-gray-500">暂无符合条件的车辆</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* 分页 */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-500 font-medium">
            第 <span className="text-gray-900">{page}</span> / <span className="text-gray-900">{totalPages}</span> 页
          </p>
          <div className="flex space-x-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-2 border border-gray-200 rounded-lg disabled:opacity-30 hover:bg-gray-50 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 删除确认弹窗 */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">确认删除</h3>
              <p className="text-gray-500 text-center text-sm mb-6">
                确定要删除 <span className="font-bold text-gray-800">「{vehicleToDelete?.title}」</span> 吗？此操作不可撤回。
              </p>
              <div className="flex space-x-3">
                <button onClick={() => setShowDeleteModal(false)} className="flex-grow py-3 px-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  取消
                </button>
                <button onClick={handleDelete} disabled={isDeleting} className="flex-grow py-3 px-4 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-200 flex items-center justify-center disabled:opacity-50">
                  {isDeleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  确认删除
                </button>
              </div>
            </div>
            <button onClick={() => setShowDeleteModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleManage;
