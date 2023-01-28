import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { SearchQueryKey, TPin } from '@types';

import { MasonryLayout, Spinner } from 'components/';

import { useSearchContext } from 'utils/contexts/SearchContext';
import { fetchFeed } from 'utils/queries';

const Search = () => {
  const { debouncedSearchTerm } = useSearchContext();

  const {
    isLoading,
    error,
    data: pins,
  } = useQuery<Promise<TPin[]>, Error, TPin[], SearchQueryKey>(
    ['feed', { searchTerm: debouncedSearchTerm }],
    fetchFeed
  );
  console.log({ pins });

  if (isLoading) return <Spinner message="Searching for pins" />;

  if (error) return <p>Error...</p>;

  if (!pins.length && debouncedSearchTerm !== '')
    return <div className="mt-10 text-xl text-center">No Pins Found!</div>;

  return <MasonryLayout pins={pins} setPins={() => {}} />;
  // return <MasonryLayout pins={pins} setPins={setPins} />;
};

export default Search;
