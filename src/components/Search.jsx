import { useState } from 'react';
import { useEffect } from 'react';

import { useSearchContext } from '../utils/contexts/SearchContext';
import { feedQuery, searchQuery } from '../utils/data';

import { client } from '../client';
import { MasonryLayout, Spinner } from './';

const Search = () => {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { debouncedSearchTerm } = useSearchContext();

  useEffect(() => {
    setLoading(true);
    const query = debouncedSearchTerm
      ? searchQuery(debouncedSearchTerm.toLowerCase())
      : feedQuery();

    client.fetch(query).then((data) => {
      setPins(data);
      setLoading(false);
    });
  }, [debouncedSearchTerm]);

  if (loading) return <Spinner message="Searching for pins" />;

  if (!pins.length && debouncedSearchTerm !== '')
    return <div className="mt-10 text-xl text-center">No Pins Found!</div>;

  return <MasonryLayout pins={pins} setPins={setPins} />;
};

export default Search;
