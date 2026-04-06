import React from 'react';
import { Link } from 'react-router-dom';
import { HiX, HiOutlineScale } from 'react-icons/hi';
import { useCompare } from '../contexts/CompareContext';

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare, compareCount, maxCompare } = useCompare();

  if (compareCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1a1a2e]/95 backdrop-blur-md z-50 border-t border-white/10 transform transition-transform duration-300 translate-y-0">
      {/* Desktop */}
      <div className="container-custom py-3 hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-white font-semibold">
            <HiOutlineScale className="w-5 h-5 text-secondary" />
            <span>Compare ({compareCount}/{maxCompare})</span>
          </div>
          <div className="flex gap-3">
            {compareList.map(vehicle => (
              <div key={vehicle.id} className="relative bg-white/10 rounded-lg p-1 flex items-center gap-2 pr-8">
                <img src={vehicle.image || 'https://via.placeholder.com/60x40'} alt="" className="w-14 h-10 object-cover rounded" />
                <span className="text-white text-xs font-medium max-w-[120px] truncate">{vehicle.title}</span>
                <button
                  onClick={() => removeFromCompare(vehicle.id)}
                  className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  <HiX className="w-3 h-3" />
                </button>
              </div>
            ))}
            {Array.from({ length: maxCompare - compareCount }).map((_, i) => (
              <div key={`empty-${i}`} className="w-[180px] h-12 border border-dashed border-white/20 rounded-lg flex items-center justify-center text-white/30 text-xs">
                + Add Vehicle
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={clearCompare} className="text-white/60 hover:text-white text-sm underline">
            Clear All
          </button>
          <Link
            to="/compare"
            className={`px-6 py-2 rounded-md font-bold text-sm transition-all ${
              compareCount >= 2
                ? 'bg-secondary hover:bg-secondary-dark text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed pointer-events-none'
            }`}
          >
            Compare Now
          </Link>
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white">
          <HiOutlineScale className="w-5 h-5 text-secondary" />
          <span className="font-semibold text-sm">{compareCount} selected</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={clearCompare} className="text-white/60 text-sm">Clear</button>
          <Link
            to="/compare"
            className={`px-5 py-2 rounded-md font-bold text-sm ${
              compareCount >= 2
                ? 'bg-secondary text-white'
                : 'bg-gray-600 text-gray-400 pointer-events-none'
            }`}
          >
            Compare ({compareCount})
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompareBar;
