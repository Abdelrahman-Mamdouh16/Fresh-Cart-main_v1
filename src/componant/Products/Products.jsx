import React from 'react'
import { Helmet } from 'react-helmet'
import Brands from '../Brands/Brands'
import FeaturedProducts from './../FeaturedProducts/FeaturedProducts';
import { Outlet } from 'react-router-dom';

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
    <Outlet/>
    </>
  )
}
