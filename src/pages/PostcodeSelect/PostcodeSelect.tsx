import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Title, Select } from './PostcodeSelect.styled';
import { fetchPostcodesRequest, selectPostcode } from '@/features/postcodes/postcodesSlice';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Atoms/PrimaryButton';
import { fetchRestaurantsRequest } from '@/features/restaurants/restaurantsSlice';

const PostcodeSelectPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: postcodes, selected, loading } = useSelector((state: any) => state.postcodes);

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

  return (
    <Container>
      <Title>Select Your Area</Title>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <label htmlFor="postcode-select" style={{ marginBottom: 8, fontWeight: 500 }}>
            Choose a postcode:
          </label>
          <Select
            id="postcode-select"
            value={localPostcode}
            aria-label="Postcode Select"
            onChange={e => setLocalPostcode(e.target.value)}
          >
            <option value="">Choose a postcode</option>
            {postcodes.map(p => (
              <option key={p.code} value={p.code}>
                {p.label}
              </option>
            ))}
          </Select>
          <PrimaryButton
            onClick={handleSubmit}
            disabled={!localPostcode || loading}
            data-testid="view-restaurants-btn"
          >
            View Restaurants
          </PrimaryButton>
        </>
      )}
    </Container>
  );
};

export default PostcodeSelectPage;
