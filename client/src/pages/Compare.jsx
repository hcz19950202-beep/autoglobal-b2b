import React from 'react';
import { Link } from 'react-router-dom';
import { HiX, HiOutlineScale, HiOutlineTrash } from 'react-icons/hi';
import { useCompare } from '../contexts/CompareContext';

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare, compareCount } = useCompare();

  const specs = [
    { key: 'price', label: 'Price (USD)', format: (v) => v?.price ? `$${v.price.toLocaleString()}` : '-' },
    { key: 'year', label: 'Year', format: (v) => v?.year || '-' },
    { key: 'mileage', label: 'Mileage', format: (v) => v?.mileage ? `${v.mileage.toLocaleString()} km` : '-' },
    { key: 'fuel', label: 'Fuel Type', format: (v) => v?.fuel || '-' },
    { key: 'transmission', label: 'Transmission', format: (v) => v?.transmission || '-' },
    { key: 'bodyType', label: 'Body Type', format: (v) => v?.bodyType || '-' },
    { key: 'engine', label: 'Engine', format: (v) => v?.engine || '-' },
    { key: 'driveType', label: 'Drive Type', format: (v) => v?.driveType || '-' },
    { key: 'color', label: 'Color', format: (v) => v?.color || '-' },
    { key: 'condition', label: 'Condition', format: (v) => v?.condition || '-' },
    { key: 'location', label: 'Location', format: (v) => v?.location || '-' },
  ];

  if (compareCount < 2) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <HiOutlineScale className="w-16 h-16 text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">No vehicles selected for comparison.</h2>
        <p className="text-gray-500 mb-8">Add vehicles from the inventory page to compare them side by side.</p>
        <Link to="/vehicles" className="btn-primary">Browse Vehicles</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 min-h-screen">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vehicle Comparison</h1>
            <p className="text-gray-500 mt-1">Compare specifications side by side</p>
          </div>
          <button onClick={clearCompare} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium">
            <HiOutlineTrash className="w-5 h-5" /> Remove All
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-500 w-40 bg-gray-50">Vehicle</th>
                {compareList.map(vehicle => (
                  <th key={vehicle.id} className="p-4 text-center border-l border-gray-100">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(vehicle.id)}
                        className="absolute -top-1 -right-1 bg-red-100 text-red-500 rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-200 z-10"
                      >
                        <HiX className="w-4 h-4" />
                      </button>
                      <Link to={`/vehicles/${vehicle.id}`}>
                        <img src={vehicle.image || 'https://via.placeholder.com/300x200'} alt={vehicle.title} className="w-full h-40 object-cover rounded-lg mb-3" />
                        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 hover:text-primary">{vehicle.title}</h3>
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {specs.map((spec, idx) => {
                const values = compareList.map(v => spec.format(v));
                const allSame = values.every(val => val === values[0]);
                return (
                  <tr key={spec.key} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                    <td className="p-4 text-sm font-semibold text-gray-500">{spec.label}</td>
                    {compareList.map((vehicle, i) => (
                      <td key={vehicle.id} className={`p-4 text-center text-sm border-l border-gray-100 ${!allSame ? 'font-bold text-primary' : 'text-gray-700'}`}>
                        {values[i]}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Compare;
