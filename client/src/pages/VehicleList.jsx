import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchFilters from '../components/SearchFilters';
import VehicleGrid from '../components/VehicleGrid';
import Pagination from '../components/Pagination';
import { useLanguage } from '../i18n/LanguageContext';

const VehicleList = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const [filters, setFilters] = useState({
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    fromYear: searchParams.get('fromYear') || '',
    toYear: searchParams.get('toYear') || '',
    bodyType: searchParams.get('bodyType') || '',
    fuel: searchParams.get('fuel') || '',
    transmission: searchParams.get('transmission') || '',
  });

  useEffect(() => {
    setFilters({
      brand: searchParams.get('brand') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      fromYear: searchParams.get('fromYear') || '',
      toYear: searchParams.get('toYear') || '',
      bodyType: searchParams.get('bodyType') || '',
      fuel: searchParams.get('fuel') || '',
      transmission: searchParams.get('transmission') || '',
    });
    fetchVehicles();
  }, [searchParams]);

  const fetchVehicles = () => {
    setLoading(true);
    setTimeout(() => {
      const mockVehicles = [
        { id: 1, title: '2022 Toyota Land Cruiser 300 V6', price: 85000, year: 2022, mileage: 12000, location: 'Dubai, UAE', fuel: 'Petrol', transmission: 'Auto', image: 'https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=600' },
        { id: 2, title: '2021 BMW X5 xDrive40i M Sport', price: 62000, year: 2021, mileage: 25000, location: 'Hamburg, DE', fuel: 'Petrol', transmission: 'Auto', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600' },
        { id: 3, title: '2023 Tesla Model Y Long Range', price: 48000, year: 2023, mileage: 5000, location: 'Shanghai, CN', fuel: 'Electric', transmission: 'Auto', image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=600' },
        { id: 4, title: '2020 Honda CR-V 1.5T Prestige', price: 24500, year: 2020, mileage: 45000, location: 'Guangzhou, CN', fuel: 'Petrol', transmission: 'CVT', image: 'https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&q=80&w=600' },
        { id: 7, title: '2022 Lexus RX 450h+ Hybrid', price: 58000, year: 2022, mileage: 8000, location: 'Tokyo, JP', fuel: 'Hybrid', transmission: 'Auto', image: 'https://images.unsplash.com/photo-1565043581484-a3c9c6f2a023?auto=format&fit=crop&q=80&w=600' },
        { id: 8, title: '2021 Audi Q7 55 TFSI quattro', price: 59000, year: 2021, mileage: 22000, location: 'Munich, DE', fuel: 'Petrol', transmission: 'Auto', image: 'https://images.unsplash.com/photo-1562141961-b5d1856d091e?auto=format&fit=crop&q=80&w=600' },
        { id: 9, title: '2022 Ford F-150 Lariat 4x4', price: 65000, year: 2022, mileage: 15000, location: 'Houston, USA', fuel: 'Petrol', transmission: 'Auto', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=600' },
        { id: 10, title: '2023 Volkswagen ID.4 Pro', price: 42000, year: 2023, mileage: 2000, location: 'Berlin, DE', fuel: 'Electric', transmission: 'Auto', image: 'https://images.unsplash.com/photo-1617719113223-d975b63a0df3?auto=format&fit=crop&q=80&w=600' },
      ];
      setVehicles(mockVehicles);
      setLoading(false);
    }, 800);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchParams({});
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-primary text-white py-8 sm:py-12">
        <div className="container-custom">
          <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{t('listing.title')}</h1>
          <p className="text-blue-100 opacity-80 text-sm sm:text-base">{t('listing.subtitle')}</p>
        </div>
      </div>

      <SearchFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onClearFilters={handleClearFilters} 
      />

      <div className="container-custom py-6 sm:py-12">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <p className="text-gray-600 text-sm">
            {t('listing.found')} <span className="font-bold text-gray-900">{vehicles.length * 12}</span> {t('listing.vehiclesCount')}
          </p>
          <div className="flex items-center gap-2">
            <label className="text-xs sm:text-sm text-gray-500 hidden sm:block">{t('listing.sortBy')}</label>
            <select className="border-none bg-transparent text-xs sm:text-sm font-bold text-gray-900 focus:ring-0">
              <option>{t('listing.newest')}</option>
              <option>{t('listing.priceLow')}</option>
              <option>{t('listing.priceHigh')}</option>
              <option>{t('listing.yearNewest')}</option>
            </select>
          </div>
        </div>

        <VehicleGrid vehicles={vehicles} loading={loading} />
        
        {!loading && vehicles.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>
    </div>
  );
};

export default VehicleList;
