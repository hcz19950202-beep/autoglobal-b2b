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
          <div className="inline-flex flex-wrap items-center gap-2 mb-6">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-white/90 text-xs sm:text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              China Direct Export
            </div>
            <div className="bg-gradient-to-r from-amber-500/20 to-yellow-500/10 backdrop-blur-sm border border-amber-500/30 rounded-full px-4 py-1.5 text-amber-400 text-xs sm:text-sm font-bold flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              SGS Inspected
            </div>
            <div className="hidden sm:flex bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full px-4 py-1.5 text-blue-300 text-xs sm:text-sm font-bold items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Global RoRo/Container
            </div>
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
                  <option value="byd">BYD</option><option value="geely">Geely</option><option value="chery">Chery</option><option value="great-wall">Great Wall</option><option value="haval">Haval</option><option value="changan">Changan</option><option value="nio">NIO</option><option value="xpeng">XPeng</option><option value="li-auto">Li Auto</option><option value="zeekr">Zeekr</option><option value="hongqi">Hongqi</option><option value="mg">MG</option><option value="denza">Denza</option><option value="deepal">Deepal</option><option value="jetour">Jetour</option><option value="toyota">Toyota</option><option value="honda">Honda</option><option value="bmw">BMW</option><option value="mercedes">Mercedes-Benz</option><option value="nissan">Nissan</option><option value="tesla">Tesla</option><option value="volkswagen">Volkswagen</option><option value="audi">Audi</option><option value="hyundai">Hyundai</option>
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
