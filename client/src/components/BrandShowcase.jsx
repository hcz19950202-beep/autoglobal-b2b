import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const BrandShowcase = () => {
  const { t } = useLanguage();
  const { config } = useSiteConfig();
  const brands = config.homepage?.brands || [];

  if (!brands || brands.length === 0) return null;

  return (
    <section className="py-10 sm:py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">{t('brands.title')}</h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">{t('brands.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-8">
          {brands.map((brand) => (
            <Link 
              key={brand.id}
              to={brand.link || `/vehicles?brand=${brand.name}`}
              className="flex flex-col items-center p-3 sm:p-6 rounded-xl border border-gray-50 hover:border-primary/30 hover:shadow-lg transition-all group bg-gray-50/30"
            >
              <div className="h-10 sm:h-16 flex items-center justify-center mb-2 sm:mb-4">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-full max-w-full grayscale group-hover:grayscale-0 transition-all duration-300 drop-shadow-sm object-contain"
                  loading="lazy"
                />
              </div>
              <span className="font-bold text-gray-700 group-hover:text-primary text-xs sm:text-base tracking-wide uppercase">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
