import { useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';

import { feedQuery, searchQuery } from '../utils/data';
import { useLoading } from '../utils/hooks';

import { MasonryLayout, Spinner } from '.';
import { TPin } from '../@types';
import { client } from '../client';

const Feed = () => {
  const { loading, startLoading, stopLoading } = useLoading(false);
  const [pins, setPins] = useState<TPin[]>([]);

  const { categoryId } = useParams();

  useEffect(() => {
    startLoading();
    const query = categoryId ? searchQuery(categoryId) : feedQuery();

    client.fetch(query).then((data) => {
      setPins(data);
      stopLoading();
    });
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins.length) return <h2>No pins available</h2>;

  return <MasonryLayout pins={pins} setPins={setPins} />;
};

export default Feed;
