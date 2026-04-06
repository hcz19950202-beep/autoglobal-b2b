import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import { useLanguage } from '../i18n/LanguageContext';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { config, getWhatsAppUrl } = useSiteConfig();
  const { t } = useLanguage();

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center group no-print"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip */}
      <div className={`mr-3 bg-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium text-gray-700 whitespace-nowrap transition-all duration-300 hidden md:block ${
        isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
      }`}>
        {t('whatsapp.tooltip')}
      </div>

      {/* Button */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 bg-[#25D366] hover:bg-[#20BD5C] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse animation ring */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        <FaWhatsapp className="w-7 h-7 relative z-10" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
