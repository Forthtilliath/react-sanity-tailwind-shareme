import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { TComment, TPin } from '@types';

const pinsSlice = createSlice({
  name: 'pins',
  initialState: [] as TPin[],
  reducers: {
    getAll: (state: TPin[], action: PayloadAction<TPin[]>) => {
      state = action.payload;
      return state;
    },
    addPin: (state: TPin[], action: PayloadAction<TPin>) => {},
    deletePin: (state: TPin[], action: PayloadAction<string>) => {
      state.filter(pin => pin._id !== action.payload)
    },
    addComment: (state: TPin[], action: PayloadAction<TComment>) => { },
    save: (state: TPin[], action: PayloadAction<TPin>) => { },
    unsave: (state: TPin[], action: PayloadAction<TPin>) => { },
  },
});

export default pinsSlice;
