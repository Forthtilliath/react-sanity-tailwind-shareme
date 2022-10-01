import { PropsWithChildren, createContext, useContext, useState } from 'react';
import React from 'react';

import { ISearchContext } from '../../@types';
import { useDebounce } from '../hooks';

const SearchContext = createContext<ISearchContext | null>(null);

function SearchProvider({ children }: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250);

  const value = {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (context === null) {
    throw new Error('useSearchContext was used outside of its Provider');
  }

  return context;
};

export { SearchProvider, useSearchContext };
