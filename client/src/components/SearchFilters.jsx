import React, { useState } from 'react';
import { HiOutlineTrash, HiOutlineAdjustments } from 'react-icons/hi';
import { FaCar, FaTruckPickup, FaBus } from 'react-icons/fa';
// import { GiSuv } from 'react-icons/gi';
import { useLanguage } from '../i18n/LanguageContext';

const SearchFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const { t } = useLanguage();
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const bodyTypes = [
    { id: 'sedan', label: t('filters.sedan'), icon: <FaCar /> },
    { id: 'suv', label: t('filters.suv'), icon: <FaCar /> }, // Replaced GiSuv with FaCar
    { id: 'mpv', label: t('filters.mpv'), icon: <FaBus /> },
    { id: 'pickup', label: t('filters.pickup'), icon: <FaTruckPickup /> },
    { id: 'van', label: t('filters.van'), icon: <FaBus /> },
  ];

  const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Nissan', 'Hyundai', 'Ford', 'Audi', 'Volkswagen', 'Tesla'];
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid', 'Electric', 'LPG'];
  const transmissions = ['Automatic', 'Manual'];

  const activeFilterCount = Object.values(filters).filter(v => v).length;

  return (
    <div className="bg-white shadow-sm border-b sticky top-16 md:top-20 z-40">
      <div className="container-custom py-3 sm:py-4">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex items-center justify-between mb-3">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-sm font-semibold text-gray-700 px-3 py-2 bg-gray-50 rounded-lg"
          >
            <HiOutlineAdjustments className="w-5 h-5" />
            {t('filters.brand')}
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button onClick={onClearFilters} className="text-xs text-red-500 font-medium">
              {t('filters.clearAll')}
            </button>
          )}
        </div>

        {/* Filters Grid - always visible on desktop, toggleable on mobile */}
        <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block`}>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 mb-3 sm:mb-4">
            {/* Brand */}
            <div className="flex flex-col">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-1">{t('filters.brand')}</label>
              <select 
                className="border-gray-200 rounded p-2 text-sm focus:ring-primary focus:border-primary"
                value={filters.brand || ''}
                onChange={(e) => onFilterChange('brand', e.target.value)}
              >
                <option value="">{t('filters.allBrands')}</option>
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-1">{t('filters.price')}</label>
              <div className="flex items-center gap-1">
                <input 
                  type="number" placeholder={t('filters.min')}
                  className="w-full border-gray-200 rounded p-2 text-sm"
                  value={filters.minPrice || ''}
                  onChange={(e) => onFilterChange('minPrice', e.target.value)}
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" placeholder={t('filters.max')}
                  className="w-full border-gray-200 rounded p-2 text-sm"
                  value={filters.maxPrice || ''}
                  onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>

            {/* Year */}
            <div className="flex flex-col">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-1">{t('filters.year')}</label>
              <div className="flex items-center gap-1">
                <input 
                  type="number" placeholder={t('filters.from')}
                  className="w-full border-gray-200 rounded p-2 text-sm"
                  value={filters.fromYear || ''}
                  onChange={(e) => onFilterChange('fromYear', e.target.value)}
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" placeholder={t('filters.to')}
                  className="w-full border-gray-200 rounded p-2 text-sm"
                  value={filters.toYear || ''}
                  onChange={(e) => onFilterChange('toYear', e.target.value)}
                />
              </div>
            </div>

            {/* Fuel */}
            <div className="flex flex-col">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-1">{t('filters.fuel')}</label>
              <select 
                className="border-gray-200 rounded p-2 text-sm focus:ring-primary focus:border-primary"
                value={filters.fuel || ''}
                onChange={(e) => onFilterChange('fuel', e.target.value)}
              >
                <option value="">{t('filters.allFuel')}</option>
                {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Transmission */}
            <div className="hidden lg:flex flex-col">
              <label className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase mb-1">{t('filters.transmission')}</label>
              <select 
                className="border-gray-200 rounded p-2 text-sm focus:ring-primary focus:border-primary"
                value={filters.transmission || ''}
                onChange={(e) => onFilterChange('transmission', e.target.value)}
              >
                <option value="">{t('filters.allTrans')}</option>
                {transmissions.map(tt => <option key={tt} value={tt}>{tt}</option>)}
              </select>
            </div>
          </div>

          {/* Body Type Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 border-t pt-3 sm:pt-4">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {bodyTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => onFilterChange('bodyType', filters.bodyType === type.id ? '' : type.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all text-sm ${
                    filters.bodyType === type.id 
                      ? 'bg-primary border-primary text-white' 
                      : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary'
                  }`}
                >
                  <span className="text-base sm:text-lg">{type.icon}</span>
                  <span className="text-xs sm:text-sm font-medium">{type.label}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={onClearFilters}
              className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors"
            >
              <HiOutlineTrash className="w-4 h-4" />
              {t('filters.clearAll')}
            </button>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;
              return (
                <div key={key} className="bg-blue-50 text-primary text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-md flex items-center gap-1.5 sm:gap-2">
                  <span>{key}: {value}</span>
                  <button onClick={() => onFilterChange(key, '')} className="hover:text-primary-dark text-base leading-none">&times;</button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
