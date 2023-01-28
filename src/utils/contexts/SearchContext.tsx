import { PropsWithChildren, createContext, useContext, useState } from 'react';
import React from 'react';

import { TSetter } from '@types';

import { useDebounce } from '../hooks';

export interface ISearchContext {
  searchTerm: string;
  setSearchTerm: TSetter<string>;
  debouncedSearchTerm?: string;
}

const defaultValue = {};

const SearchContext = createContext<ISearchContext | null>(null);

/**
 * Context of the search input
 */
function SearchProvider({ children }: PropsWithChildren) {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 250) || undefined;

  /**
   * TODO Voir pour avoir des noms plus simples à utiliser
   * * Inverser les noms searchTerm et debouncedSearchTerm ?
   */
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
