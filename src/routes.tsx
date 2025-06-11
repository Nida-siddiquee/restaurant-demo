import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('@/pages/Home'));
const ErrorPage = lazy(() => import('@/pages/ErrorPage/ErrorPage'));
const Layout = lazy(() => import('@/components/Organisims/Layout'));
const ScrollToTop = lazy(() => import('@/components/utils/ScrollToTop'));
const PostcodeSelectorPage = lazy(() => import('@/pages/PostcodeSelect'));
const RestaurantDetailsPage = lazy(() => import('@/pages/RestaurantDetails'));
const LoadingScreen = lazy(() => import('@/components/Molecules/LoadingScreen'));

export const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<LoadingScreen />}>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<PostcodeSelectorPage />} />
          <Route path="/restaurants" element={<Home />} />
          <Route path="/restaurants/:id" element={<RestaurantDetailsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Layout>
    </Suspense>
  </BrowserRouter>
);
