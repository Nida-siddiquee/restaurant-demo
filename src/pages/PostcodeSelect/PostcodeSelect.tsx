import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Title,
  Select,
 
} from './PostcodeSelect.styled';
import {
  fetchPostcodesRequest,
  selectPostcode,
} from '@/features/postcodes/postcodesSlice';
import { RootState } from '@/app/store';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '@/components/Atoms/PrimaryButton';

const PostcodeSelectPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: postcodes, selected, loading } = useSelector(
    (state: RootState) => state.postcodes
  );

  const [localPostcode, setLocalPostcode] = useState(selected?.code || '');

  useEffect(() => {
    dispatch(fetchPostcodesRequest());
  }, [dispatch]);

  const handleSubmit = () => {
    const selectedPostcode = postcodes.find((p) => p.code === localPostcode);
    if (selectedPostcode) {
      dispatch(selectPostcode(selectedPostcode));
      navigate('/restaurants'); // Route to your restaurants listing page
    }
  };

  return (
    <Container>
      <Title>Select Your Area</Title>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Select
            value={localPostcode}
            onChange={(e) => setLocalPostcode(e.target.value)}
          >
            <option value="">Choose a postcode</option>
            {postcodes.map((p) => (
              <option key={p.code} value={p.code}>
                {p.label}
              </option>
            ))}
          </Select>
          <PrimaryButton onClick={handleSubmit} disabled={!localPostcode}>
            View Restaurants
          </PrimaryButton>
        </>
      )}
    </Container>
  );
};

export default PostcodeSelectPage;
