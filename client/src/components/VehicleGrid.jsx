import React from 'react';
import VehicleCard from './VehicleCard';
import { useLanguage } from '../i18n/LanguageContext';

const VehicleGrid = ({ vehicles, loading }) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-white rounded-lg h-[280px] sm:h-[400px] border border-gray-100">
            <div className="bg-gray-200 h-32 sm:h-48 w-full rounded-t-lg"></div>
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 sm:h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-8 sm:h-10 bg-gray-200 rounded w-full mt-4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className="text-center py-12 sm:py-20 bg-white rounded-lg border border-dashed border-gray-300">
        <h3 className="text-lg sm:text-xl font-medium text-gray-500">{t('listing.noResults')}</h3>
        <p className="text-gray-400 mt-2 text-sm">{t('listing.noResultsHint')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
};

export default VehicleGrid;
