import React, { useState } from 'react';

import { useSearchContext } from '../utils/contexts/SearchContext';
import { feedQuery, searchQuery } from '../utils/data';
import { useEffectOnce } from '../utils/hooks';

import { client } from '../client';
import { MasonryLayout, Spinner } from './';

const Search = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { searchTerm } = useSearchContext();

  useEffectOnce(() => {
    setLoading(true);
    const query = searchTerm
      ? searchQuery(searchTerm.toLowerCase())
      : feedQuery();

    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
    });
  }, [searchTerm]);

  if (loading) return <Spinner message="Searching for pins" />;

  if (!pins.length && searchTerm !== '')
    return <div className="mt-10 text-xl text-center">No Pins Found!</div>;

  // return <MasonryLayout pins={pins} setPins={setPins} />;
  return (
    <>
      Search
      <MasonryLayout pins={pins} setPins={setPins} />
    </>
  );
};

export default Search;
