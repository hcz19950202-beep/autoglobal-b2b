import React, { useState, useEffect } from 'react';
import { 
  Users, Plus, Edit2, Trash2, Search, X, Shield, ShieldCheck, 
  Eye, EyeOff, Loader2, AlertTriangle, UserPlus, Mail, Phone, 
  Key, ToggleLeft, ToggleRight, Car, MessageSquare, Image, Settings 
} from 'lucide-react';
import { getStaffList, createStaff, updateStaff, deleteStaff, toggleStaff } from '../../services/api';

const mockStaff = [
  { _id: '1', name: '管理员', email: 'admin@autoglobal.com', role: 'admin', permissions: { vehicles: true, inquiries: true, homepage: true, settings: true }, isActive: true, lastLogin: '2026-04-01T10:00:00Z', createdAt: '2026-01-01T00:00:00Z' },
  { _id: '2', name: '张三', email: 'zhangsan@autoglobal.com', role: 'staff', permissions: { vehicles: true, inquiries: true, homepage: false, settings: false }, isActive: true, lastLogin: '2026-03-30T14:00:00Z', createdAt: '2026-02-15T00:00:00Z' },
  { _id: '3', name: '李四', email: 'lisi@autoglobal.com', role: 'staff', permissions: { vehicles: true, inquiries: false, homepage: false, settings: false }, isActive: false, lastLogin: null, createdAt: '2026-03-01T00:00:00Z' },
];

const StaffManage = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'staff',
    permissions: {
      vehicles: false,
      inquiries: false,
      homepage: false,
      settings: false
    }
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const data = await getStaffList();
      // Assume data is an array or has a property containing the list
      setStaffList(data || mockStaff);
    } catch (err) {
      console.error('Failed to fetch staff:', err);
      setStaffList(mockStaff);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleOpenModal = (staff = null) => {
    if (staff) {
      setCurrentStaff(staff);
      setFormData({
        name: staff.name,
        email: staff.email,
        phone: staff.phone || '',
        password: '', // Password empty when editing
        role: staff.role,
        permissions: { ...staff.permissions }
      });
    } else {
      setCurrentStaff(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'staff',
        permissions: {
          vehicles: false,
          inquiries: false,
          homepage: false,
          settings: false
        }
      });
    }
    setIsModalOpen(true);
    setShowPassword(false);
  };

  const handleToggleActive = async (staff) => {
    if (staff.role === 'admin') return;
    try {
      await toggleStaff(staff._id, !staff.isActive);
      fetchStaff();
    } catch (err) {
      console.error('Failed to toggle staff status:', err);
      // Fallback for mock data update
      setStaffList(prev => prev.map(s => s._id === staff._id ? { ...s, isActive: !s.isActive } : s));
    }
  };

  const handleDeleteStaff = async () => {
    if (!currentStaff || currentStaff.role === 'admin') return;
    try {
      await deleteStaff(currentStaff._id);
      setIsDeleteModalOpen(false);
      fetchStaff();
    } catch (err) {
      console.error('Failed to delete staff:', err);
      // Fallback
      setStaffList(prev => prev.filter(s => s._id !== currentStaff._id));
      setIsDeleteModalOpen(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      if (currentStaff) {
        await updateStaff(currentStaff._id, formData);
      } else {
        await createStaff(formData);
      }
      setIsModalOpen(false);
      fetchStaff();
    } catch (err) {
      console.error('Failed to save staff:', err);
      // Fallback: simulate local update
      if (currentStaff) {
        setStaffList(prev => prev.map(s => s._id === currentStaff._id ? { ...s, ...formData } : s));
      } else {
        setStaffList(prev => [...prev, { ...formData, _id: Date.now().toString(), isActive: true, lastLogin: null }]);
      }
      setIsModalOpen(false);
    } finally {
      setSubmitLoading(false);
    }
  };

  const togglePermission = (key) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [key]: !prev.permissions[key]
      }
    }));
  };

  // Permission Card component
  const PermissionCard = ({ id, icon: Icon, title, description, enabled }) => (
    <div 
      className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
        enabled ? 'border-blue-500 bg-blue-50' : 'border-gray-100 bg-white hover:border-gray-200'
      }`}
      onClick={() => togglePermission(id)}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${enabled ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
          <Icon size={20} />
        </div>
        <div>
          <div className="font-medium text-gray-900">{title}</div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
      <div className={`w-10 h-6 rounded-full relative transition-colors ${enabled ? 'bg-blue-500' : 'bg-gray-200'}`}>
        <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${enabled ? 'translate-x-4' : ''}`} />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">员工账号管理</h1>
          <p className="text-gray-500 mt-1">添加和管理后台登录的员工子账号</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors font-medium"
        >
          <Plus size={20} />
          <span>添加员工</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">姓名 / 邮箱</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">角色</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">权限标签</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">状态</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">最后登录</th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin mx-auto text-blue-500 mb-2" />
                    <span className="text-gray-400">正在加载数据...</span>
                  </td>
                </tr>
              ) : staffList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400">暂无员工数据</td>
                </tr>
              ) : staffList.map((staff) => (
                <tr key={staff._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        staff.role === 'admin' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{staff.name}</div>
                        <div className="text-sm text-gray-500">{staff.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {staff.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        <ShieldCheck size={12} />
                        管理员
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                        <Shield size={12} />
                        员工
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {staff.permissions.vehicles && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">车辆管理</span>
                      )}
                      {staff.permissions.inquiries && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">询盘管理</span>
                      )}
                      {staff.permissions.homepage && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">首页装修</span>
                      )}
                      {staff.permissions.settings && (
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-medium">系统设置</span>
                      )}
                      {!Object.values(staff.permissions).some(Boolean) && (
                        <span className="text-gray-400 text-xs italic">无权限</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      staff.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${staff.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                      {staff.isActive ? '已启用' : '已禁用'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {staff.lastLogin ? new Date(staff.lastLogin).toLocaleString('zh-CN', { 
                      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' 
                    }) : '从未登录'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(staff)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="编辑"
                      >
                        <Edit2 size={18} />
                      </button>
                      
                      {staff.role !== 'admin' && (
                        <>
                          <button 
                            onClick={() => handleToggleActive(staff)}
                            className={`p-2 rounded-lg transition-colors ${
                              staff.isActive ? 'text-gray-400 hover:text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                            }`}
                            title={staff.isActive ? '禁用' : '启用'}
                          >
                            {staff.isActive ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentStaff(staff);
                              setIsDeleteModalOpen(true);
                            }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="删除"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{currentStaff ? '编辑员工' : '添加员工'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <UserPlus size={16} className="text-gray-400" />
                    姓名 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="请输入员工真实姓名"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <Mail size={16} className="text-gray-400" />
                    邮箱 *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="example@autoglobal.com"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <Phone size={16} className="text-gray-400" />
                    手机号
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="请输入手机号（可选）"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
                    <Key size={16} className="text-gray-400" />
                    密码 {currentStaff ? '' : '*'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required={!currentStaff}
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder={currentStaff ? "留空则不修改密码" : "请输入登录密码"}
                      className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900">功能权限</h4>
                  <p className="text-sm text-gray-500">选择该员工可以访问的后台模块</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <PermissionCard 
                    id="vehicles"
                    icon={Car}
                    title="车辆管理"
                    description="添加、编辑、删除车辆信息"
                    enabled={formData.permissions.vehicles}
                  />
                  <PermissionCard 
                    id="inquiries"
                    icon={MessageSquare}
                    title="询盘管理"
                    description="查看和处理客户询盘"
                    enabled={formData.permissions.inquiries}
                  />
                  <PermissionCard 
                    id="homepage"
                    icon={Image}
                    title="首页装修"
                    description="编辑首页内容和图片"
                    enabled={formData.permissions.homepage}
                  />
                  <PermissionCard 
                    id="settings"
                    icon={Settings}
                    title="系统设置"
                    description="修改站点配置和联系方式"
                    enabled={formData.permissions.settings}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitLoading && <Loader2 size={18} className="animate-spin" />}
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <AlertTriangle size={32} className="text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">确认删除</h3>
              <p className="text-gray-500">
                确定要删除员工「<span className="font-bold text-gray-900">{currentStaff?.name}</span>」的账号吗？此操作不可撤回。
              </p>
            </div>
            
            <div className="mt-8 flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors font-medium"
              >
                取消
              </button>
              <button
                onClick={handleDeleteStaff}
                className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors font-medium"
              >
                确定删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManage;
