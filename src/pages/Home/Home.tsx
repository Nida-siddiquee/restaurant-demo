// src/features/restaurants/RestaurantsList.tsx

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import {
  fetchRestaurantsRequest,
  selectRestaurant,
} from '@/features/restaurants/restaurantsSlice'
import { RootState, AppDispatch } from '@/app/store'

const Page = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
`

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
`

const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
`

const Card = styled.div`
  background: var(--color-card-bg);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Name = styled.h3`
  margin: 0;
  padding: 1rem;
  font-size: 1.25rem;
  background: var(--color-primary);
  color: white;
`

const Body = styled.div`
  padding: 1rem;
  flex: 1;
`

const Address = styled.p`
  margin: 0.5rem 0;
  color: #555;
  font-size: 0.9rem;
`

const Rating = styled.span`
  font-weight: bold;
  color: #f5a623;
`

const Button = styled.button`
  margin: 1rem;
  background: var(--color-primary);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-dark);
  }
`

const ErrorMsg = styled.p`
  color: red;
  text-align: center;
`

const RestaurantsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // Grab both the selected postcode and the restaurants slice
  const selectedPostcode = useSelector(
    (state: RootState) => state.postcodes.selected?.code
  )
  const { data , loading, error } = useSelector(
    (state: RootState) => state.restaurants
  )

  useEffect(() => {
    if (selectedPostcode) {
      dispatch(fetchRestaurantsRequest(selectedPostcode ))
    }
        console.log(data?.restaurants)

  }, [dispatch, selectedPostcode])

  const handleDetails = (id: string) => {
    dispatch(selectRestaurant(id))
    navigate(`/restaurants/${id}`)
  }

  return (
    <Page>
      <Title>Available Restaurants</Title>

      {loading && <p>Loading restaurants…</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}

      {!loading && !error && data?.restaurants?.length === 0 && (
        <p>No restaurants found for this area.</p>
      )}

      <Grid>
        {data?.restaurants.map((r) => (
          <Card key={r.id}>
            <Name>{r.name}</Name>
            <Body>
              {/* <Address>{r?.address}</Address> */}
              <p>{r.description?.slice(0, 100)}…</p>
            </Body>
            <Body>
              {/* Rating: <Rating>{r.rating ?? 'N/A'}</Rating> */}
            </Body>
            <Button onClick={() => handleDetails(r.id)}>
              View Details
            </Button>
          </Card>
        ))}
      </Grid>
    </Page>
  )
}

export default RestaurantsListPage
