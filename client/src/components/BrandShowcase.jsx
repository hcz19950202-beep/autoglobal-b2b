import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const BrandShowcase = () => {
  const { t } = useLanguage();

  const brands = [
    { name: 'Toyota', logo: 'https://www.carlogos.org/car-logos/toyota-logo-2020-640.png' },
    { name: 'Honda', logo: 'https://www.carlogos.org/car-logos/honda-logo-1700x1150.png' },
    { name: 'BMW', logo: 'https://www.carlogos.org/car-logos/bmw-logo-2020-gray.png' },
    { name: 'Mercedes', logo: 'https://www.carlogos.org/car-logos/mercedes-benz-logo-2011-640.png' },
    { name: 'Nissan', logo: 'https://www.carlogos.org/car-logos/nissan-logo-2020-640.png' },
    { name: 'Hyundai', logo: 'https://www.carlogos.org/car-logos/hyundai-logo-640.png' },
    { name: 'Ford', logo: 'https://www.carlogos.org/car-logos/ford-logo-640.png' },
    { name: 'Audi', logo: 'https://www.carlogos.org/car-logos/audi-logo-2016-640.png' },
    { name: 'Lexus', logo: 'https://www.carlogos.org/car-logos/lexus-logo-640.png' },
    { name: 'Tesla', logo: 'https://www.carlogos.org/car-logos/tesla-logo-640.png' },
  ];

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
              key={brand.name}
              to={`/vehicles?brand=${brand.name}`}
              className="flex flex-col items-center p-3 sm:p-6 rounded-xl border border-gray-50 hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="h-10 sm:h-16 flex items-center justify-center mb-2 sm:mb-4">
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="max-h-full max-w-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-primary text-xs sm:text-base">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;
