import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Organisims/Layout'
import ScrollToTop from './components/utils/ScrollToTop'

const PostcodeSelectorPage = lazy(() => import('@/pages/PostcodeSelect'))
const Home  = lazy(() => import('@/pages/Home'))
const RestaurantDetailsPage = lazy(() => import('@/pages/RestaurantDetails'))

export const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading…</div>}>
    <ScrollToTop/>
    <Layout>
      <Routes>
        {/* Redirect root to postcode picker */}
        <Route path="/" element={<PostcodeSelectorPage/>} />

        <Route path="/restaurants" element={<Home />} />
        <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />

        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>

    </Layout>
    </Suspense>
  </BrowserRouter>
)
