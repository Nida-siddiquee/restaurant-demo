import reducer, {
  fetchPostcodesRequest,
  fetchPostcodesSuccess,
  fetchPostcodesFailure,
  selectPostcode,
  Postcode,
} from './postcodesSlice';

describe('postcodesSlice', () => {
  const initialState = {
    data: [],
    selected: null,
    loading: false,
    error: null,
  };

  it('handles fetchPostcodesRequest', () => {
    const nextState = reducer(initialState, fetchPostcodesRequest());
    expect(nextState.loading).toBe(true);
    expect(nextState.error).toBeUndefined();
  });

  it('handles fetchPostcodesSuccess', () => {
    const postcodes: Postcode[] = [
      { code: 'CF11', label: 'Cardiff' },
      { code: 'E1', label: 'London' },
    ];
    const nextState = reducer({ ...initialState, loading: true }, fetchPostcodesSuccess(postcodes));
    expect(nextState.data).toEqual(postcodes);
    expect(nextState.loading).toBe(false);
  });

  it('handles fetchPostcodesFailure', () => {
    const errorMsg = 'Failed to fetch';
    const nextState = reducer({ ...initialState, loading: true }, fetchPostcodesFailure(errorMsg));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(errorMsg);
  });

  it('handles selectPostcode', () => {
    const postcode: Postcode = { code: 'CF11', label: 'Cardiff' };
    const nextState = reducer(initialState, selectPostcode(postcode));
    expect(nextState.selected).toEqual(postcode);
  });
});
