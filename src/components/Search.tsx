import { FunctionComponent, useState } from 'react';
import { useEffect } from 'react';
import React from 'react';

import { useSearchContext } from '../utils/contexts/SearchContext';
import { feedQuery, searchQuery } from '../utils/data';

import { MasonryLayout, Spinner } from '.';
import { TPin } from '../@types';
import { client } from '../client';

const Search: FunctionComponent<{}> = () => {
  const [pins, setPins] = useState<TPin[]>([]);
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
