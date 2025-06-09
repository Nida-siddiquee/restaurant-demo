import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Postcode {
  code: string;
  label: string;
}

interface PostcodesState {
  data: Postcode[];
  selected?: Postcode | null;
  loading: boolean;
  error?: string | null;
}

const initialState: PostcodesState = {
  data: [],
  selected: null,
  loading: false,
  error: null,
};

const postcodesSlice = createSlice({
  name: 'postcodes',
  initialState,
  reducers: {
    fetchPostcodesRequest: state => {
      state.loading = true;
      state.error = undefined;
    },
    fetchPostcodesSuccess: (state, action: PayloadAction<Postcode[]>) => {
      state.data = action.payload;
      state.loading = false;
    },
    fetchPostcodesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectPostcode: (state, action: PayloadAction<Postcode>) => {
      state.selected = action.payload;
    },
  },
});

export const {
  fetchPostcodesRequest,
  fetchPostcodesSuccess,
  fetchPostcodesFailure,
  selectPostcode,
} = postcodesSlice.actions;

export default postcodesSlice.reducer;
