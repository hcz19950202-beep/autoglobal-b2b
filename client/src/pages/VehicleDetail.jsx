import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { HiOutlineBadgeCheck, HiOutlineCheckCircle, HiChevronLeft, HiChevronRight, HiOutlineShieldCheck } from 'react-icons/hi';
import { GiSpeedometer, GiGearStickPattern } from 'react-icons/gi';
import { FaGasPump, FaCalendarAlt, FaWhatsapp } from 'react-icons/fa';
import InquiryForm from '../components/InquiryForm';
import VehicleCard from '../components/VehicleCard';
import PdfExportButton from '../components/PdfExport';
import { useLanguage } from '../i18n/LanguageContext';
import { useCompare } from '../contexts/CompareContext';
import { useSiteConfig } from '../contexts/SiteConfigContext';

const VehicleDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addToCompare, isInCompare } = useCompare();
  const { config, getWhatsAppUrl } = useSiteConfig();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveImage(prev => (prev + 1) % vehicle.images.length);
      } else {
        setActiveImage(prev => prev > 0 ? prev - 1 : vehicle.images.length - 1);
      }
    }
    setTouchStart(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setVehicle({
        id: id,
        title: '2022 Toyota Land Cruiser 300 V6 Twin Turbo',
        price: 85000,
        year: 2022,
        mileage: 12500,
        location: 'Dubai, UAE',
        fuel: 'Petrol',
        transmission: 'Automatic',
        bodyType: 'SUV',
        color: 'Pearl White',
        engine: '3.5L V6',
        driveType: '4WD',
        doors: 5,
        seats: 7,
        condition: 'Excellent',
        images: [
          'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1200',
          'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200'
        ],
        image: 'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=600',
        features: ['Sunroof', 'Leather Seats', 'Navigation System', '360 Camera', 'Cruise Control', 'Parking Sensors', 'Bluetooth', 'Keyless Entry'],
        description: 'This 2022 Toyota Land Cruiser 300 is in pristine condition. A GCC spec vehicle with full service history. Packed with off-road capabilities and luxury features. Ideal for export to markets requiring rugged and reliable luxury SUVs.'
      });
      setLoading(false);
      window.scrollTo(0, 0);
    }, 500);
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-primary font-bold">Loading...</div>;
  if (!vehicle) return <div className="h-screen flex items-center justify-center">Vehicle not found.</div>;

  const whatsappMsg = `Hi, I'm interested in ${vehicle.title} (Stock ID: AG-${vehicle.id}00234), priced at $${vehicle.price?.toLocaleString()}. Please send me more details.`;
  const whatsappUrl = getWhatsAppUrl(whatsappMsg);

  return (
    <div className="bg-gray-50 py-4 sm:py-8">
      <div className="container-custom">
        {/* Breadcrumbs */}
        <div className="mb-4 sm:mb-6 flex items-center text-xs sm:text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary">{t('detail.home')}</Link>
          <span className="mx-2">/</span>
          <Link to="/vehicles" className="hover:text-primary">{t('detail.vehicles')}</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium truncate">{vehicle.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Gallery */}
            <div className="bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
              <div 
                className="relative aspect-[16/9] mb-2 sm:mb-4 overflow-hidden rounded-lg sm:rounded-xl"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img src={vehicle.images[activeImage]} alt={vehicle.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setActiveImage(prev => prev > 0 ? prev - 1 : vehicle.images.length - 1)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 sm:p-2 rounded-full shadow hover:bg-white"
                >
                  <HiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button 
                  onClick={() => setActiveImage(prev => (prev + 1) % vehicle.images.length)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 sm:p-2 rounded-full shadow hover:bg-white"
                >
                  <HiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                {/* Image counter on mobile */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full sm:hidden">
                  {activeImage + 1} / {vehicle.images.length}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-4">
                {vehicle.images.map((img, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`aspect-[4/3] rounded-md sm:rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Price Card (only on mobile) */}
            <div className="lg:hidden bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  <HiOutlineBadgeCheck /> {t('detail.inStock')}
                </span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                  <HiOutlineShieldCheck /> {t('detail.verified')}
                </span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">{vehicle.title}</h1>
              <p className="text-gray-400 text-xs mb-3">{t('detail.stockId')}: AG-{vehicle.id}00234</p>
              <div className="p-3 bg-gray-50 rounded-lg mb-3">
                <p className="text-gray-500 text-xs uppercase font-bold">{t('detail.fobPrice')}</p>
                <span className="text-3xl font-bold text-primary">${vehicle.price?.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setIsInquiryModalOpen(true)}
                  className="btn-secondary !py-3 text-sm font-bold"
                >
                  {t('detail.inquireBestPrice')}
                </button>
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold py-3 rounded-md text-sm transition-colors"
                >
                  <FaWhatsapp className="w-4 h-4" /> WhatsApp
                </a>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <PdfExportButton 
                  vehicle={vehicle} 
                  className="w-full border-2 border-primary text-primary hover:bg-blue-50 font-bold py-2.5 rounded-md text-xs transition-colors"
                />
                <button
                  onClick={() => addToCompare(vehicle)}
                  disabled={isInCompare(vehicle.id)}
                  className={`w-full border-2 font-bold py-2.5 rounded-md text-xs transition-colors ${
                    isInCompare(vehicle.id) 
                      ? 'border-gray-300 text-gray-400 bg-gray-50' 
                      : 'border-primary text-primary hover:bg-blue-50'
                  }`}
                >
                  {isInCompare(vehicle.id) ? t('card.added') : t('card.addCompare')}
                </button>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">{t('detail.specs')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
                {[
                  { icon: <FaCalendarAlt size={18} />, label: t('detail.yearLabel'), value: vehicle.year },
                  { icon: <GiSpeedometer size={22} />, label: t('detail.mileage'), value: `${vehicle.mileage?.toLocaleString()} km` },
                  { icon: <FaGasPump size={18} />, label: t('detail.fuelLabel'), value: vehicle.fuel },
                  { icon: <GiGearStickPattern size={22} />, label: t('detail.transLabel'), value: vehicle.transmission },
                ].map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg sm:rounded-xl flex items-center justify-center text-primary flex-shrink-0">
                      {spec.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider">{spec.label}</p>
                      <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-0 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
                {[
                  { label: t('detail.bodyType'), value: vehicle.bodyType },
                  { label: t('detail.color'), value: vehicle.color },
                  { label: t('detail.engine'), value: vehicle.engine },
                  { label: t('detail.driveType'), value: vehicle.driveType },
                  { label: t('detail.doors'), value: vehicle.doors },
                  { label: t('detail.seats'), value: vehicle.seats },
                  { label: t('detail.condition'), value: vehicle.condition },
                  { label: t('detail.location'), value: vehicle.location },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 border-b border-gray-50 last:border-none">
                    <span className="text-gray-500 text-sm">{spec.label}</span>
                    <span className="font-semibold text-gray-900 text-sm">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900">{t('detail.features')}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {vehicle.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                    <HiOutlineCheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-5 sm:p-8 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-gray-900">{t('detail.description')}</h2>
              <p className="text-gray-600 leading-relaxed text-base sm:text-lg">{vehicle.description}</p>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <HiOutlineBadgeCheck /> {t('detail.inStock')}
                </span>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <HiOutlineShieldCheck /> {t('detail.verified')}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{vehicle.title}</h1>
              <p className="text-gray-400 text-sm mb-6">{t('detail.stockId')}: AG-{vehicle.id}00234</p>

              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 uppercase font-bold tracking-tight">{t('detail.fobPrice')}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">${vehicle.price?.toLocaleString()}</span>
                  <span className="text-gray-400 text-xs font-medium">{t('detail.approx')} €{Math.round(vehicle.price * 0.92).toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={() => setIsInquiryModalOpen(true)}
                className="w-full btn-secondary !py-4 text-lg font-bold flex items-center justify-center gap-2 mb-3"
              >
                {t('detail.inquireBestPrice')}
              </button>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5C] text-white font-bold py-3.5 rounded-md transition-colors mb-3"
              >
                <FaWhatsapp className="w-5 h-5" /> {t('detail.whatsappInquiry')}
              </a>
              
              <PdfExportButton 
                vehicle={vehicle} 
                className="w-full bg-white border-2 border-primary text-primary hover:bg-blue-50 font-bold py-3.5 rounded-md transition-colors mb-3"
              />

              <button
                onClick={() => addToCompare(vehicle)}
                disabled={isInCompare(vehicle.id)}
                className={`w-full border-2 font-bold py-3 rounded-md transition-colors text-sm ${
                  isInCompare(vehicle.id) 
                    ? 'border-gray-300 text-gray-400 bg-gray-50' 
                    : 'border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                }`}
              >
                {isInCompare(vehicle.id) ? `✓ ${t('card.added')}` : `+ ${t('card.addCompare')}`}
              </button>

              <div className="mt-8 pt-8 border-t space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src="https://ui-avatars.com/api/?name=Sales+Team&background=1a73e8&color=fff" alt="" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{t('detail.salesTeam')}</p>
                    <p className="text-xs text-gray-500">{t('detail.salesExpert')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <HiOutlineBadgeCheck className="text-primary flex-shrink-0" />
                  <span>{t('detail.inspection')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <HiOutlineBadgeCheck className="text-primary flex-shrink-0" />
                  <span>{t('detail.customs')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Vehicles */}
        <div className="mt-12 sm:mt-20">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-900">{t('detail.relatedVehicles')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <VehicleCard key={i} vehicle={{
                id: i,
                title: 'Premium Luxury SUV Variant ' + i,
                price: 75000 + (i * 1000),
                year: 2021 + Math.floor(i/2),
                mileage: 10000 + (i * 5000),
                location: 'Global Stock',
                fuel: 'Petrol',
                transmission: 'Auto',
                image: `https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=600&sig=${i}`
              }} />
            ))}
          </div>
        </div>
      </div>

      <InquiryForm 
        isOpen={isInquiryModalOpen} 
        onClose={() => setIsInquiryModalOpen(false)} 
        vehicle={vehicle} 
      />
    </div>
  );
};

export default VehicleDetail;
