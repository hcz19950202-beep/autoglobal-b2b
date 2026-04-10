import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail, HiOutlineLockClosed, HiExclamationCircle } from 'react-icons/hi';
import { login } from '../../services/api';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 先尝试调用真实 API
      const response = await login({ email, password });
      if (response.token) {
        // 检查角色：只有 admin 和 staff 能进后台
        if (response.role !== 'admin' && response.role !== 'staff') {
          setError('此账号没有后台管理权限');
          setIsLoading(false);
          return;
        }
        localStorage.setItem('adminToken', response.token);
        localStorage.setItem(
          'adminUser',
          JSON.stringify({
            _id: response._id,
            name: response.name,
            email: response.email,
            role: response.role,
            permissions: response.permissions,
          })
        );
        navigate('/admin');
      }
    } catch (err) {
      setError(err.response?.data?.message || '账号或密码错误');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-[#1a73e8] p-3 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-white tracking-wider">AutoGlobal</h1>
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900">管理后台</h2>
        <p className="mt-2 text-center text-sm text-gray-600">管理员和员工均可登录</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-4 shadow-xl rounded-2xl border border-gray-100 sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded flex items-center">
                <HiExclamationCircle className="h-5 w-5 text-red-400 mr-3 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                邮箱地址
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineMail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a73e8] focus:border-[#1a73e8] transition-all sm:text-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                密码
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <HiOutlineLockClosed className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1a73e8] focus:border-[#1a73e8] transition-all sm:text-sm"
                  placeholder="输入密码"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-medium text-white bg-[#1a73e8] hover:bg-[#1557b0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                )}
                {isLoading ? '登录中...' : '登录'}
              </button>
            </div>
          </form>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <p className="text-xs text-center text-gray-500">管理员和员工账号均可登录后台</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
