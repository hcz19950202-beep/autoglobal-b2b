import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/HeroBanner';
import BrandShowcase from '../components/BrandShowcase';
import VehicleGrid from '../components/VehicleGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import StatsCounter from '../components/StatsCounter';
import Testimonials from '../components/Testimonials';
import ExportProcess from '../components/ExportProcess';
import TrustBadges from '../components/TrustBadges';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight, HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { useLanguage } from '../i18n/LanguageContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';
import useScrollReveal from '../hooks/useScrollReveal';

// 公告栏组件
const AnnouncementBar = ({ announcement }) => {
  const [visible, setVisible] = useState(true);
  if (!announcement?.enabled || !announcement?.text || !visible) return null;

  return (
    <div className="relative py-2.5 px-4 text-center text-white text-sm font-medium" style={{ backgroundColor: announcement.bgColor || '#ff6b35' }}>
      <div className="container-custom flex items-center justify-center">
        {announcement.link ? (
          <a href={announcement.link} className="hover:underline">{announcement.text}</a>
        ) : (
          <span>{announcement.text}</span>
        )}
        <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100">
          <HiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// 广告轮播组件
const BannerCarousel = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const activeBanners = (banners || []).filter(b => b.enabled);

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % activeBanners.length), 5000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  if (activeBanners.length === 0) return null;

  return (
    <section className="py-6 sm:py-10">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/1] sm:aspect-[4/1] bg-gray-100 shadow-lg">
          {activeBanners.map((banner, idx) => (
            <div key={banner.id} className={`absolute inset-0 transition-all duration-700 ${idx === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}`}>
              {banner.link ? (
                <Link to={banner.link} className="block w-full h-full"><img src={banner.image} alt={banner.title} className="w-full h-full object-cover" /></Link>
              ) : (
                <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
              )}
              <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6 bg-black/40 backdrop-blur-sm text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg">{banner.title}</div>
            </div>
          ))}
          {activeBanners.length > 1 && (
            <>
              <button onClick={() => setCurrent(prev => prev > 0 ? prev - 1 : activeBanners.length - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg z-10 transition-all"><HiChevronLeft className="w-5 h-5" /></button>
              <button onClick={() => setCurrent(prev => (prev + 1) % activeBanners.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-lg z-10 transition-all"><HiChevronRight className="w-5 h-5" /></button>
              <div className="absolute bottom-3 right-4 flex gap-1.5">
                {activeBanners.map((_, idx) => (
                  <button key={idx} onClick={() => setCurrent(idx)} className={`h-2 rounded-full transition-all duration-300 ${idx === current ? 'bg-white w-6' : 'bg-white/50 w-2'}`} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  const { t } = useLanguage();
  const { config } = useSiteConfig();
  const hp = config.homepage || {};
  const [featuredVehicles, setFeaturedVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const featuredRef = useScrollReveal();

  useEffect(() => {
    setTimeout(() => {
      setFeaturedVehicles([
        { id: 1, title: '2022 Toyota Land Cruiser 300 V6 Twin Turbo', price: 85000, year: 2022, mileage: 12000, location: 'Dubai, UAE', fuel: 'Petrol', transmission: 'Auto', isFeatured: true, image: 'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=600' },
        { id: 2, title: '2021 BMW X5 xDrive40i M Sport Package', price: 62000, year: 2021, mileage: 25000, location: 'Hamburg, DE', fuel: 'Petrol', transmission: 'Auto', isFeatured: true, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600' },
        { id: 3, title: '2023 Tesla Model Y Long Range AWD', price: 48000, year: 2023, mileage: 5000, location: 'Shanghai, CN', fuel: 'Electric', transmission: 'Auto', isFeatured: true, image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600' },
        { id: 4, title: '2020 Honda CR-V 1.5T Prestige CVT', price: 24500, year: 2020, mileage: 45000, location: 'Guangzhou, CN', fuel: 'Petrol', transmission: 'CVT', isFeatured: true, image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&q=80&w=600' },
        { id: 5, title: '2021 Mercedes-Benz E300 AMG Line', price: 54000, year: 2021, mileage: 18000, location: 'Shenzhen, CN', fuel: 'Hybrid', transmission: 'Auto', isFeatured: true, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=600' },
        { id: 6, title: '2022 Hyundai Tucson 1.6T Ultimate', price: 29000, year: 2022, mileage: 15000, location: 'Tianjin, CN', fuel: 'Petrol', transmission: 'DCT', isFeatured: true, image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&q=80&w=600' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // 板块配置
  const sections = hp.sections || [];

  const sectionComponents = {
    brands: <BrandShowcase key="brands" />,
    banners: <BannerCarousel key="banners" banners={hp.banners} />,
    featured: (
      <section key="featured" className="py-14 sm:py-24 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10 sm:mb-14">
            <div ref={featuredRef} className="scroll-reveal">
              <div className="inline-block bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Premium Inventory</div>
              <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-2 sm:mb-3">{t('featured.title')}</h2>
              <p className="text-gray-500 text-sm sm:text-lg max-w-lg">{t('featured.subtitle')}</p>
            </div>
            <Link to="/vehicles" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              {t('featured.viewAll')} <HiOutlineArrowRight />
            </Link>
          </div>
          <VehicleGrid vehicles={featuredVehicles} loading={loading} />
          <div className="mt-10 sm:mt-14 text-center md:hidden">
            <Link to="/vehicles" className="inline-flex items-center btn-primary text-base px-8 py-3">
              {t('featured.viewAll')} <HiOutlineArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
    ),
    whyUs: <WhyChooseUs key="whyUs" />,
    stats: <StatsCounter key="stats" />,
    cta: (
      <section key="cta" className="py-20 sm:py-28 relative overflow-hidden">
        {/* Premium dark background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#132144] to-[#0a1628]" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container-custom relative z-10 text-center text-white">
          <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">Start Today</div>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 sm:mb-6 leading-tight">{t('cta.title')}</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/vehicles" className="bg-gradient-to-r from-secondary to-orange-500 hover:from-secondary-dark hover:to-orange-600 text-white font-bold px-10 sm:px-14 py-4 rounded-xl text-lg transition-all duration-300 hover:shadow-xl hover:shadow-secondary/30 active:scale-95">
              {t('cta.browseInventory')}
            </Link>
            <Link to="/contact" className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white font-bold px-10 sm:px-14 py-4 rounded-xl text-lg transition-all duration-300">
              {t('cta.contactSales')}
            </Link>
          </div>
        </div>
      </section>
    ),
  };

  // 新增的固定板块（不参与排序配置）
  const trustComponents = (
    <React.Fragment key="trust-extras">
      <TrustBadges />
      <ExportProcess />
      <Testimonials />
    </React.Fragment>
  );

  const orderedSections = sections.length > 0
    ? sections.filter(s => s.enabled).map(s => sectionComponents[s.id]).filter(Boolean)
    : Object.values(sectionComponents);

  return (
    <div>
      <AnnouncementBar announcement={hp.announcement} />
      <HeroBanner />
      {/* Trust badges right after hero */}
      <TrustBadges />
      {orderedSections}
      {/* Export process & testimonials before CTA */}
      <ExportProcess />
      <Testimonials />
    </div>
  );
};

export default Home;
