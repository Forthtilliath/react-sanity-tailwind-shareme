import React from 'react';
import { Circles } from 'react-loader-spinner';

import { SpinnerType } from '../@types';

const Spinner: SpinnerType = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Circles color="#00bfff" height={50} width={200} wrapperClass="m-5" />

      <p className="px-2 text-lg text-center">{message}</p>
    </div>
  );
};

export default Spinner;
