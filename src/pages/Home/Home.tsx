import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Page,Title,Grid,ErrorMsg,Card, Name,Body,Button } from './Home.styled'
import {
  fetchRestaurantsRequest,
  selectRestaurant,
} from '@/features/restaurants/restaurantsSlice'
import { RootState, AppDispatch } from '@/app/store'
import Pagination from '@/components/Organisims/Pagination/Pagination'

const RESTAURANTS_PER_PAGE = 30



const RestaurantsListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const selectedPostcode = useSelector(
    (state: RootState) => state.postcodes.selected?.code
  )
  const { data, loading, error } = useSelector(
    (state: RootState) => state.restaurants
  )

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1)

  // Reset page when postcode changes
  useEffect(() => {
    setCurrentPage(1)
    if (selectedPostcode) {
      dispatch(fetchRestaurantsRequest(selectedPostcode))
    }
  }, [dispatch, selectedPostcode])

  // Pagination logic
  const restaurants = data?.restaurants ?? []
 const totalPages = Math.ceil(restaurants.length / RESTAURANTS_PER_PAGE)
const startIdx = (currentPage - 1) * RESTAURANTS_PER_PAGE
const currentRestaurants = restaurants.slice(startIdx, startIdx + RESTAURANTS_PER_PAGE)

  const handleDetails = (id: string) => {
    dispatch(selectRestaurant(id))
    navigate(`/restaurants/${id}`)
  }

  return (
    <Page>
      <Title>Available Restaurants</Title>
      {loading && <p>Loading restaurants…</p>}
      {error && <ErrorMsg>{error}</ErrorMsg>}
      {!loading && !error && restaurants.length === 0 && (
        <p>No restaurants found for this area.</p>
      )}

      <Grid>
        {currentRestaurants.map((r) => (
          <Card key={r.id}>
            <Name>{r.name}</Name>
            <Body>
              {/* <Address>{r?.address}</Address> */}
              <p>{r.description?.slice(0, 100)}…</p>
            </Body>
            <Button onClick={() => handleDetails(r.id)}>View Details</Button>
          </Card>
        ))}
      </Grid>

    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
    />

    </Page>
  )
}

export default RestaurantsListPage