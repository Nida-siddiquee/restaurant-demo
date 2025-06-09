import { RootState } from '@/app/store';

export const selectPostcodes = (state: RootState) => state.postcodes.data;

export const selectPostcodesLoading = (state: RootState) => state.postcodes.loading;

export const selectPostcodesError = (state: RootState) => state.postcodes.error;
