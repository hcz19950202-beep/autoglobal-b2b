import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineCheck, HiOutlineExternalLink, HiOutlineCog, HiOutlineGlobeAlt, HiOutlineBell } from 'react-icons/hi';
import { useSiteConfig } from '../../contexts/SiteConfigContext';

const Settings = () => {
  const { config, updateConfig, getWhatsAppUrl } = useSiteConfig();

  // 本地表单状态
  const [whatsappPhone, setWhatsappPhone] = useState(config.whatsapp.phone);
  const [whatsappMessage, setWhatsappMessage] = useState(config.whatsapp.defaultMessage);
  const [contactEmail, setContactEmail] = useState(config.contact.email);
  const [contactPhone, setContactPhone] = useState(config.contact.phone);
  const [contactAddress, setContactAddress] = useState(config.contact.address);
  const [companyName, setCompanyName] = useState(config.company.name);
  const [currency, setCurrency] = useState(config.company.currency);

  const [savedSection, setSavedSection] = useState('');

  const showSaved = (section) => {
    setSavedSection(section);
    setTimeout(() => setSavedSection(''), 2000);
  };

  const handleSaveWhatsApp = () => {
    updateConfig('whatsapp', { phone: whatsappPhone, defaultMessage: whatsappMessage });
    showSaved('whatsapp');
  };

  const handleSaveContact = () => {
    updateConfig('contact', { email: contactEmail, phone: contactPhone, address: contactAddress });
    showSaved('contact');
  };

  const handleSaveCompany = () => {
    updateConfig('company', { name: companyName, currency });
    showSaved('company');
  };

  // 同步外部变更
  useEffect(() => {
    setWhatsappPhone(config.whatsapp.phone);
    setWhatsappMessage(config.whatsapp.defaultMessage);
    setContactEmail(config.contact.email);
    setContactPhone(config.contact.phone);
    setContactAddress(config.contact.address);
    setCompanyName(config.company.name);
    setCurrency(config.company.currency);
  }, [config]);

  return (
    <div className="max-w-4xl mx-auto space-y-8 font-sans pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">系统设置</h1>
        <p className="text-gray-500 text-sm mt-1">管理站点配置、联系方式和社交账号</p>
      </div>

      {/* ========== WhatsApp 设置 ========== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-[#25D366]/5 to-transparent flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center mr-4">
              <FaWhatsapp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">WhatsApp 设置</h3>
              <p className="text-xs text-gray-500 mt-0.5">配置全站的 WhatsApp 一键联系号码和默认消息</p>
            </div>
          </div>
          {savedSection === 'whatsapp' && (
            <span className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-lg animate-pulse">
              <HiOutlineCheck className="w-4 h-4 mr-1" /> 已保存
            </span>
          )}
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              WhatsApp 号码 <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-3">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaWhatsapp className="h-4 w-4 text-[#25D366]" />
                </div>
                <input
                  type="text"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="如：8613800138000"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-[#25D366] transition-all text-sm font-mono"
                />
              </div>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-3 bg-[#25D366] text-white rounded-xl hover:bg-[#20BD5C] transition-colors text-sm font-bold whitespace-nowrap"
              >
                <HiOutlineExternalLink className="w-4 h-4" />
                测试
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              格式说明：国家码 + 手机号，不加 + 号和空格。例如中国号码 13800138000 → 输入 <code className="bg-gray-100 px-1 rounded">8613800138000</code>
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              默认打招呼消息
            </label>
            <textarea
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              rows="3"
              placeholder="客户点击 WhatsApp 按钮时自动填充的消息..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-100 focus:border-[#25D366] transition-all text-sm resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              此消息会预填到客户的 WhatsApp 输入框中，客户可修改后发送
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
            <p className="text-xs font-bold text-gray-500 mb-2">生效范围：</p>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-gray-600">首页浮动按钮</span>
              <span className="text-[10px] font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-gray-600">车辆详情页</span>
              <span className="text-[10px] font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-gray-600">询盘弹窗</span>
              <span className="text-[10px] font-bold bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-gray-600">联系我们页</span>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSaveWhatsApp}
              className="px-8 py-2.5 bg-[#25D366] text-white rounded-xl font-bold hover:bg-[#20BD5C] transition-colors shadow-lg shadow-green-100 flex items-center gap-2"
            >
              <HiOutlineCheck className="w-4 h-4" />
              保存 WhatsApp 设置
            </button>
          </div>
        </div>
      </div>

      {/* ========== 联系方式 ========== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[#1a73e8] rounded-xl flex items-center justify-center mr-4">
              <HiOutlinePhone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">联系方式</h3>
              <p className="text-xs text-gray-500 mt-0.5">页脚和联系页面显示的联系信息</p>
            </div>
          </div>
          {savedSection === 'contact' && (
            <span className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-lg animate-pulse">
              <HiOutlineCheck className="w-4 h-4 mr-1" /> 已保存
            </span>
          )}
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <HiOutlineMail className="inline w-4 h-4 mr-1 text-gray-400" />
                业务邮箱
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="sales@autoglobal.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <HiOutlinePhone className="inline w-4 h-4 mr-1 text-gray-400" />
                联系电话
              </label>
              <input
                type="text"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+86 123 4567 8900"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              <HiOutlineLocationMarker className="inline w-4 h-4 mr-1 text-gray-400" />
              公司地址
            </label>
            <input
              type="text"
              value={contactAddress}
              onChange={(e) => setContactAddress(e.target.value)}
              placeholder="广州市天河区..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-[#1a73e8] transition-all text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveContact}
              className="px-8 py-2.5 bg-[#1a73e8] text-white rounded-xl font-bold hover:bg-[#1557b0] transition-colors shadow-lg shadow-blue-100 flex items-center gap-2"
            >
              <HiOutlineCheck className="w-4 h-4" />
              保存联系方式
            </button>
          </div>
        </div>
      </div>

      {/* ========== 公司信息 ========== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mr-4">
              <HiOutlineCog className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">公司信息</h3>
              <p className="text-xs text-gray-500 mt-0.5">基本的公司名和货币单位设置</p>
            </div>
          </div>
          {savedSection === 'company' && (
            <span className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-3 py-1 rounded-lg animate-pulse">
              <HiOutlineCheck className="w-4 h-4 mr-1" /> 已保存
            </span>
          )}
        </div>
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">公司名称</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="AutoGlobal"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-gray-400 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                <HiOutlineGlobeAlt className="inline w-4 h-4 mr-1 text-gray-400" />
                报价货币
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-gray-400 transition-all text-sm"
              >
                <option value="USD">USD - 美元</option>
                <option value="EUR">EUR - 欧元</option>
                <option value="CNY">CNY - 人民币</option>
                <option value="AED">AED - 迪拉姆</option>
                <option value="JPY">JPY - 日元</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleSaveCompany}
              className="px-8 py-2.5 bg-gray-800 text-white rounded-xl font-bold hover:bg-black transition-colors shadow-lg shadow-gray-200 flex items-center gap-2"
            >
              <HiOutlineCheck className="w-4 h-4" />
              保存公司信息
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
