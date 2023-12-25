import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import '../Categories/Categories.css'

export default function Categories() {


  const { data, isError, isFetched, isLoading } = useQuery(['Categories'], () => { return axios.get('https://ecommerce.routemisr.com/api/v1/Categories') })
  // let finalData
  // if (data) {
  //   finalData = data.data
  // }
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="category pb-5">
        <div className="container">
          <h1 className='fw-bolder fs-3 my-4'>Our Categories</h1>
          <div className="row gy-4">
            {isLoading ? <h1 className='text-center my-2'>loading</h1> : data?.data.data.map((ele) =>
              <div className="col-lg-3">
                <div className='box box-shadow borderRadius  overflow-hidden'>
                  <img src={ele.image} alt=""  className='borderRadius' style={{ borderRadius:'10px 10px 0 0' }} />
                  <div className='bg-black d-flex align-items-center text-center justify-content-center ' style={{ height: '70px '}}>
                    <p className='text-center text-white mt-2'>{ele.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
