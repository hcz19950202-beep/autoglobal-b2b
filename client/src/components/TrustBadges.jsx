import React from 'react';
import { 
  HiShieldCheck, 
  HiBadgeCheck, 
  HiClipboardCheck, 
  HiLockClosed, 
  HiGlobeAlt 
} from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';

const badgeItems = [
  {
    id: 'sgs',
    icon: HiShieldCheck,
    label: "SGS CERTIFIED"
  },
  {
    id: 'iso',
    icon: HiBadgeCheck,
    label: "ISO 9001:2015"
  },
  {
    id: 'inspection',
    icon: HiClipboardCheck,
    label: "200+ Point Inspection"
  },
  {
    id: 'payment',
    icon: HiLockClosed,
    label: "Secure Payment"
  },
  {
    id: 'insurance',
    icon: HiGlobeAlt,
    label: "Global Insurance"
  }
];

const TrustBadges = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-white border-y border-gray-100 py-6 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-8 md:gap-0">
          {badgeItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <React.Fragment key={item.id}>
                {/* Badge Item */}
                <div className="flex items-center flex-shrink-0 group cursor-default">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mr-3 transition-colors group-hover:bg-primary/10 group-hover:text-primary text-gray-400">
                    <Icon className="text-2xl" />
                  </div>
                  <span className="text-gray-500 font-mono text-sm tracking-tighter whitespace-nowrap group-hover:text-primary transition-colors">
                    {t(`trust.badge.${item.id}`, item.label)}
                  </span>
                </div>

                {/* Vertical Divider (only on desktop and between items) */}
                {index < badgeItems.length - 1 && (
                  <div className="hidden md:block w-[1px] h-8 bg-gray-200" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
      
      {/* CSS for hiding scrollbar but allowing scroll */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TrustBadges;
