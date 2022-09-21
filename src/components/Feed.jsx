import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { feedQuery, searchQuery } from '../utils/data';
import { useToggle } from '../utils/hooks';

import { client } from '../client';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
  const [loading, toggleLoading, startLoading, stopLoading] = useToggle(false);
  const [pins, setPins] = useState([]);

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

  return <MasonryLayout pins={pins} />;
};

export default Feed;
