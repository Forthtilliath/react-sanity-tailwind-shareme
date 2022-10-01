import React from 'react';
import Masonry from 'react-masonry-css';

import { Pin } from '.';
import { MasonryLayoutType } from '../@types';

const breakpointObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

const MasonryLayout: MasonryLayoutType = ({ pins, setPins }) => {
  return (
    <Masonry className="flex" breakpointCols={breakpointObj}>
      {pins.map((pin) => (
        <Pin key={pin._id} pin={pin} setPins={setPins} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
