import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/app/store';
import { Container, Title, Select } from './PostcodeSelect.styled';
import { fetchPostcodesRequest, selectPostcode } from '@/features/postcodes/postcodesSlice';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Atoms/PrimaryButton';
import { fetchRestaurantsRequest } from '@/features/restaurants/restaurantsSlice';

const PostcodeSelectPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: postcodes, selected, loading } = useSelector((state: RootState) => state.postcodes);

  const [localPostcode, setLocalPostcode] = useState(selected?.code || '');

  useEffect(() => {
    dispatch(fetchPostcodesRequest());
  }, [dispatch]);

  const handleSubmit = () => {
    const selectedPostcode = postcodes.find(p => p.code === localPostcode);
    if (selectedPostcode) {
      dispatch(selectPostcode(selectedPostcode));
      dispatch(fetchRestaurantsRequest(selectedPostcode.code));
      navigate('/restaurants');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && localPostcode && !loading) {
      handleSubmit();
    }
  };

  return (
    <Container>
      <Title id="postcode-page-title">Select Your Area</Title>
      {loading ? (
        <p aria-live="polite" role="status">Loading...</p>
      ) : (
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
          aria-labelledby="postcode-page-title"
        >
          <label htmlFor="postcode-select" style={{ marginBottom: 8, fontWeight: 500 }}>
            Choose a postcode:
          </label>
          <Select
            id="postcode-select"
            value={localPostcode}
            aria-label="Postcode Select"
            aria-describedby="postcode-help"
            onChange={e => setLocalPostcode(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          >
            <option value="">Choose a postcode</option>
            {postcodes.map(p => (
              <option key={p.code} value={p.code}>
                {p.label}
              </option>
            ))}
          </Select>
          <div id="postcode-help" className="sr-only">
            Select a postcode from the dropdown to view restaurants in that area
          </div>
          <PrimaryButton
            type="submit"
            disabled={!localPostcode || loading}
            data-testid="view-restaurants-btn"
            aria-describedby={!localPostcode ? "submit-help" : undefined}
          >
            View Restaurants
          </PrimaryButton>
          {!localPostcode && (
            <div id="submit-help" className="sr-only">
              Please select a postcode to continue
            </div>
          )}
        </form>
      )}
    </Container>
  );
};

export default PostcodeSelectPage;
