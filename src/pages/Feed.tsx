// import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

// import { SearchQueryKey, TPin } from '@types';
import { MasonryLayout, Spinner } from 'components/';

import { useSearchContext } from 'utils/contexts/SearchContext';
import usePins from 'utils/hooks/usePins';

// import { fetchFeed } from 'utils/queries';

const Feed = () => {
  const { categoryId: category } = useParams();
  const { debouncedSearchTerm: searchTerm } = useSearchContext();

  const { isLoading, error, data: pins } = usePins({ searchTerm, category });
  // const {
  //   isLoading,
  //   error,
  //   data: pins,
  // } = useQuery<Promise<TPin[]>, Error, TPin[], SearchQueryKey>(
  //   ['feed', { searchTerm: debouncedSearchTerm, category: categoryId }],
  //   fetchFeed
  // );

  if (isLoading)
    return (
      <Spinner
        message={
          searchTerm
            ? 'Searching for pins'
            : 'We are adding new ideas to your feed!'
        }
      />
    );

  if (error) return <p>Error...</p>;

  if (!pins.length)
    return <div className="mt-10 text-xl text-center">No Pins Found!</div>;

  return <MasonryLayout pins={pins} setPins={() => {}} />;
  // return <MasonryLayout pins={pins} setPins={setPins} />;
};

export default Feed;
