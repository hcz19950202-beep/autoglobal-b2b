import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiHome, HiOutlineHome, HiViewGrid, HiOutlineViewGrid, HiOutlineScale, HiScale, HiOutlineChatAlt2, HiChatAlt2 } from 'react-icons/hi';
import { useCompare } from '../contexts/CompareContext';
import { useLanguage } from '../i18n/LanguageContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { compareCount } = useCompare();
  const { t } = useLanguage();

  // Don't show on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { 
      path: '/', 
      label: t('nav.home'), 
      icon: HiOutlineHome, 
      activeIcon: HiHome 
    },
    { 
      path: '/vehicles', 
      label: t('nav.vehicles'), 
      icon: HiOutlineViewGrid, 
      activeIcon: HiViewGrid 
    },
    { 
      path: '/compare', 
      label: t('nav.compare'), 
      icon: HiOutlineScale, 
      activeIcon: HiScale,
      badge: compareCount > 0 ? compareCount : null
    },
    { 
      path: '/contact', 
      label: t('nav.contact'), 
      icon: HiOutlineChatAlt2, 
      activeIcon: HiChatAlt2 
    },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-bottom">
      <div className="grid grid-cols-4 h-14">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== '/' && location.pathname.startsWith(item.path));
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-0.5 relative ${
                isActive ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-secondary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
