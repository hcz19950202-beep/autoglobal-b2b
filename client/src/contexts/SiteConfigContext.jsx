import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultConfig = {
  whatsapp: {
    phone: '8612345678900',
    defaultMessage: 'Hi, I\'m interested in your used car inventory. Please send me more details.',
  },
  contact: {
    email: 'sales@autoglobal.com',
    phone: '+86 123 4567 8900',
    address: 'Guangzhou, China',
  },
  company: {
    name: 'AutoGlobal',
    currency: 'USD',
  },
  // ======== 页面装修配置 ========
  homepage: {
    // 1. Hero 大图
    heroBg: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    heroTitle: '',      // 留空则使用 i18n 翻译
    heroSubtitle: '',
    // 2. 公告横幅
    announcement: {
      text: '',
      link: '',
      bgColor: '#ff6b35',
      enabled: false,
    },
    // 3. 广告轮播
    banners: [
      { id: '1', title: '丰田全系列', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&q=80&w=1200', link: '/vehicles?brand=Toyota', enabled: true },
      { id: '2', title: '新能源专区', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200', link: '/vehicles?fuel=Electric', enabled: true },
    ],
    // 4. 板块排序与显隐
    sections: [
      { id: 'brands',   name: '品牌展示', enabled: true },
      { id: 'banners',  name: '广告轮播', enabled: true },
      { id: 'featured', name: '精选车辆', enabled: true },
      { id: 'whyUs',    name: '优势介绍', enabled: true },
      { id: 'stats',    name: '数据统计', enabled: true },
      { id: 'cta',      name: '行动号召', enabled: true },
    ],
    // 5. 统计数据（可自定义数字）
    stats: {
      vehicles: '10,000+',
      countries: '50+',
      partners: '5,000+',
      experience: '15+',
    },
    // 6. 主题色
    theme: {
      primaryColor: '#1a73e8',
      secondaryColor: '#ff6b35',
      heroOverlay: 'blue',   // blue | green | dark
    },
  },
};

// 深度合并工具
function deepMerge(target, source) {
  const result = { ...target };
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

const SiteConfigContext = createContext();

export const SiteConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('siteConfig');
      if (saved) return deepMerge(defaultConfig, JSON.parse(saved));
    } catch (e) {}
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('siteConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (section, values) => {
    setConfig(prev => ({
      ...prev,
      [section]: typeof values === 'object' && !Array.isArray(values)
        ? { ...prev[section], ...values }
        : values,
    }));
  };

  const getWhatsAppUrl = (customMessage) => {
    const msg = customMessage || config.whatsapp.defaultMessage;
    return `https://wa.me/${config.whatsapp.phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <SiteConfigContext.Provider value={{ config, updateConfig, getWhatsAppUrl, defaultConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfig = () => useContext(SiteConfigContext);
export default SiteConfigContext;
