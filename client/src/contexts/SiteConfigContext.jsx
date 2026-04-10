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
    // 7. 热门搜索快捷标签 (Hero Banner)
    popularSearches: [
      { id: '1', text: 'BYD EV', link: '/vehicles?brand=BYD' },
      { id: '2', text: 'Electric Cars', link: '/vehicles?fuel=Electric' },
      { id: '3', text: 'Under $10k', link: '/vehicles?maxPrice=10000' },
    ],
    // 8. 品牌展示墙
    brands: [
      { id: '1', name: 'BYD', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/BYD_logo.svg', link: '/vehicles?brand=BYD' },
      { id: '2', name: 'Geely', logo: 'https://upload.wikimedia.org/wikipedia/en/2/29/Geely_logo.svg', link: '/vehicles?brand=Geely' },
      { id: '3', name: 'Changan', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Changan_Auto_logo.svg', link: '/vehicles?brand=Changan' },
      { id: '4', name: 'Great Wall', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Great_Wall_Motor_logo.svg', link: '/vehicles?brand=Great Wall' },
      { id: '5', name: 'Chery', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Chery_logo.svg', link: '/vehicles?brand=Chery' },
      { id: '6', name: 'NIO', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/NIO_logo.svg', link: '/vehicles?brand=NIO' },
      { id: '7', name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg', link: '/vehicles?brand=Toyota' },
      { id: '8', name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Honda_Logo.svg', link: '/vehicles?brand=Honda' },
      { id: '9', name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg', link: '/vehicles?brand=Tesla' },
      { id: '10', name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg', link: '/vehicles?brand=Mercedes-Benz' },
    ],
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
