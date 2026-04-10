import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineLightningBolt, HiOutlineScale, HiOutlineArrowRight } from 'react-icons/hi';
import { GiSpeedometer, GiGearStickPattern } from 'react-icons/gi';
import { useCompare } from '../contexts/CompareContext';
import { useLanguage } from '../i18n/LanguageContext';

const VehicleCard = ({ vehicle }) => {
  const { addToCompare, removeFromCompare, isInCompare, compareCount, maxCompare } = useCompare();
  const { t } = useLanguage();
  const { id, title, price, year, mileage, location, image, fuel, transmission, isFeatured } = vehicle;
  const inCompare = isInCompare(id);

  const handleCompareToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    inCompare ? removeFromCompare(id) : addToCompare(vehicle);
  };

  return (
    <div className="card-3d bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 group flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Dark gradient bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {isFeatured && (
            <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-lg shadow-amber-500/30 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
              {t('card.featured')}
            </div>
          )}
          <div className={`text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1 backdrop-blur-md uppercase ${mileage === 0 || mileage === '0' || mileage === '0 km' ? 'bg-green-500/90 border border-green-400/50' : 'bg-gray-800/80 border border-gray-600/50'}`}>
            {mileage === 0 || mileage === '0' || mileage === '0 km' ? '0KM / NEW' : 'USED'}
          </div>
        </div>

        {/* Location badge */}
        <div className="absolute bottom-2.5 left-2.5 sm:bottom-3 sm:left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-[10px] sm:text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
          <HiOutlineLocationMarker className="w-3 h-3 text-primary" />{location}
        </div>

        {/* Compare */}
        <button
          onClick={handleCompareToggle}
          disabled={!inCompare && compareCount >= maxCompare}
          className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-300 ${
            inCompare ? 'bg-primary text-white shadow-lg shadow-primary/30' : compareCount >= maxCompare ? 'bg-gray-200/80 text-gray-400 cursor-not-allowed' : 'bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-primary hover:text-white opacity-0 group-hover:opacity-100'
          }`}
        >
          <HiOutlineScale className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{inCompare ? t('card.added') : t('card.addCompare')}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-grow flex flex-col">
        <Link to={`/vehicles/${id}`}>
          <h3 className="text-gray-900 font-bold text-sm sm:text-[15px] leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{title}</h3>
        </Link>

        <div className="flex items-center justify-between text-gray-400 text-[10px] sm:text-xs mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><HiOutlineCalendar className="text-primary w-3.5 h-3.5" /> {year}</span>
            <span className="flex items-center gap-1"><GiSpeedometer className="text-primary w-3.5 h-3.5" /> {typeof mileage === 'number' ? mileage.toLocaleString() : mileage} km</span>
          </div>
          <span className="bg-gray-100 text-gray-600 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider border border-gray-200">
            LHD
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-4">
          <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
            <HiOutlineLightningBolt className="text-gray-400 text-sm flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-gray-600 font-medium truncate">{fuel}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-gray-50 p-2 rounded-lg">
            <GiGearStickPattern className="text-gray-400 text-sm flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] text-gray-600 font-medium truncate">{transmission}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <span className="text-gray-400 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider">FOB PRICE</span>
            <div className="text-primary text-xl sm:text-2xl font-black tracking-tight">${price?.toLocaleString()}</div>
          </div>
          <Link to={`/vehicles/${id}`} className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-dark hover:to-blue-700 text-white font-black px-4 py-2.5 sm:px-6 sm:py-3 rounded-xl text-[11px] sm:text-xs transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 active:scale-95 whitespace-nowrap flex items-center gap-1.5 border border-white/10">
            {t('card.inquireNow')} <HiOutlineArrowRight className="w-3.5 h-3.5 hidden sm:block" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
