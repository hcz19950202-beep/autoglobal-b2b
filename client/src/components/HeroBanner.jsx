import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiSearch, HiOutlineArrowRight } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const HeroBanner = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { config } = useSiteConfig();
  const hp = config.homepage || {};
  const [searchParams, setSearchParams] = useState({ brand: '', model: '', year: '' });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchParams).toString();
    navigate(`/vehicles?${query}`);
  };

  const overlayMap = {
    blue: 'from-[#0a1628]/90 via-primary/70 to-transparent',
    green: 'from-[#0a2818]/90 via-green-700/70 to-transparent',
    dark: 'from-gray-900/95 via-gray-900/70 to-gray-900/40',
  };
  const overlayClass = overlayMap[hp.theme?.heroOverlay] || overlayMap.blue;

  return (
    <div className="relative h-[480px] sm:h-[560px] md:h-[680px] flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-110"
        style={{
          backgroundImage: `url("${hp.heroBg || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop'}")`,
          transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
        }}
      />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${overlayClass} z-[1]`} />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-[2] opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-float z-[2] hidden lg:block" />
      <div className="absolute bottom-20 left-10 w-56 h-56 bg-primary/10 rounded-full blur-3xl animate-float z-[2] hidden lg:block" style={{ animationDelay: '1.5s' }} />

      <div className="container-custom relative z-10 px-4">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6 text-white/90 text-xs sm:text-sm font-medium">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Trusted by 5,000+ Dealers Worldwide
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
            {hp.heroTitle || t('hero.title')}
          </h1>
          <p className="text-base sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl font-medium leading-relaxed">
            {hp.heroSubtitle || t('hero.subtitle')}
          </p>

          {/* Search Bar - Glass morphism style */}
          <div className="bg-white/95 backdrop-blur-lg p-2 rounded-xl sm:rounded-2xl shadow-2xl shadow-black/20 max-w-3xl border border-white/50">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2">
              <div className="w-full sm:flex-1 grid grid-cols-3 gap-2">
                <select className="w-full p-3 sm:p-3.5 border-none focus:ring-2 focus:ring-primary/30 rounded-lg sm:rounded-xl text-gray-700 bg-gray-50/80 text-sm font-medium" value={searchParams.brand} onChange={(e) => setSearchParams({...searchParams, brand: e.target.value})}>
                  <option value="">{t('hero.selectBrand')}</option>
                  <option value="toyota">Toyota</option><option value="honda">Honda</option><option value="bmw">BMW</option><option value="mercedes">Mercedes-Benz</option><option value="nissan">Nissan</option><option value="hyundai">Hyundai</option>
                </select>
                <select className="w-full p-3 sm:p-3.5 border-none focus:ring-2 focus:ring-primary/30 rounded-lg sm:rounded-xl text-gray-700 bg-gray-50/80 text-sm font-medium" value={searchParams.model} onChange={(e) => setSearchParams({...searchParams, model: e.target.value})}>
                  <option value="">{t('hero.selectModel')}</option>
                  <option value="land-cruiser">Land Cruiser</option><option value="camry">Camry</option><option value="hilux">Hilux</option><option value="civic">Civic</option><option value="x5">X5</option>
                </select>
                <select className="w-full p-3 sm:p-3.5 border-none focus:ring-2 focus:ring-primary/30 rounded-lg sm:rounded-xl text-gray-700 bg-gray-50/80 text-sm font-medium" value={searchParams.year} onChange={(e) => setSearchParams({...searchParams, year: e.target.value})}>
                  <option value="">{t('hero.selectYear')}</option>
                  <option value="2025">2025</option><option value="2024">2024</option><option value="2023">2023</option><option value="2022">2022</option><option value="2021">2021</option>
                </select>
              </div>
              <button type="submit" className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary-dark hover:to-orange-600 text-white rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-secondary/30 active:scale-95">
                <HiSearch className="w-5 h-5 mr-2" />{t('hero.search')}
              </button>
            </form>
          </div>

          {/* Quick Tags */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="text-white/50 text-xs sm:text-sm">{t('hero.popular')}</span>
            {[{ label: 'Toyota Land Cruiser', query: 'brand=Toyota' }, { label: 'Electric SUV', query: 'fuel=Electric' }, { label: 'Under $20k', query: 'maxPrice=20000' }].map((tag, i) => (
              <button key={i} onClick={() => navigate(`/vehicles?${tag.query}`)} className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all hover:scale-105">
                {tag.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-50 to-transparent z-[3]" />
    </div>
  );
};

export default HeroBanner;
