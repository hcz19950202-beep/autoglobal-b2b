import React, { createContext, useContext, useState, useCallback } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const MAX_COMPARE = 4;

  const addToCompare = useCallback((vehicle) => {
    setCompareList(prev => {
      if (prev.length >= MAX_COMPARE) return prev;
      if (prev.find(v => v.id === vehicle.id)) return prev;
      return [...prev, vehicle];
    });
  }, []);

  const removeFromCompare = useCallback((vehicleId) => {
    setCompareList(prev => prev.filter(v => v.id !== vehicleId));
  }, []);

  const isInCompare = useCallback((vehicleId) => {
    return compareList.some(v => v.id === vehicleId);
  }, [compareList]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
  }, []);

  return (
    <CompareContext.Provider value={{
      compareList,
      addToCompare,
      removeFromCompare,
      isInCompare,
      clearCompare,
      maxCompare: MAX_COMPARE,
      compareCount: compareList.length,
    }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);
export default CompareContext;
