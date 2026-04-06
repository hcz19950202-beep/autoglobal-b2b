import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  User,
  Image,
  Users
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: '数据看板', path: '/admin', icon: LayoutDashboard },
    { name: '车辆管理', path: '/admin/vehicles', icon: Car },
    { name: '询盘管理', path: '/admin/inquiries', icon: MessageSquare },
    { name: '首页装修', path: '/admin/homepage', icon: Image },
    { name: '员工管理', path: '/admin/staff', icon: Users },
    { name: '系统设置', path: '/admin/settings', icon: Settings },
  ];

  const getPageTitle = () => {
    const current = menuItems.find(item => item.path === location.pathname);
    if (current) return current.name;
    if (location.pathname.includes('/admin/vehicles/new')) return '添加车辆';
    if (location.pathname.includes('/admin/vehicles/edit')) return '编辑车辆';
    return '管理后台';
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      {/* 侧边栏 */}
      <aside
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#1a1a2e] text-white transition-all duration-300 flex flex-col z-20`}
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen ? (
            <h1 className="text-xl font-bold text-white tracking-wider">AutoGlobal 后台</h1>
          ) : (
            <span className="text-xl font-bold mx-auto">AG</span>
          )}
        </div>

        <nav className="flex-grow mt-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#1a73e8] text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
              {isSidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-lg transition-colors"
          >
            <LogOut className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : 'mx-auto'}`} />
            {isSidebarOpen && <span>退出登录</span>}
          </button>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-grow flex flex-col">
        {/* 顶部栏 */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-between px-6 z-10">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="ml-4 text-xl font-semibold text-gray-800">{getPageTitle()}</h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-[#1a73e8] relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-[#ff6b35] rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">管理员</p>
                <p className="text-xs text-gray-500">超级管理员</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <User className="h-6 w-6 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* 内容区域 */}
        <main className="flex-grow overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
