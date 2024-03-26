import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

function DataProvider({ children }) {
  const [cart, setCart] = useState([]);

  const add = (product) => {
    setCart([...cart, product]);
  };

  const remove = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  return (
    <DataContext.Provider value={{ cart, add, remove }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataProvider, useData };
