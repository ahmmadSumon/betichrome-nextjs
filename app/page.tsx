import Herosection from '@/components/Herosection'
import React from 'react'
import AllCategories from './components/AllCategories'
import AllProducts from './allproducts/page'
import Women from './womens/page'
import Men from './mens/page'
import Jewelery from './jewelery/page'
import Electronics from './electronics/page'

const page = () => {
  return (
    
    <div className='flex flex-col overflow-x-hidden'>
  <Herosection/>
  <div className='max-w-100'>
  <h1 className='text-center text-3xl py-7'> ALL categories </h1>
  <AllCategories/>
  </div>
  <div>
    <Women/>
  </div>
  <div className='mt-5'>
    <Men/>
  </div>
  <Herosection/>
  <div className='mt-5'>
   <Electronics/>
  </div>
  <div className='mt-5'>
    <Jewelery/>
  </div>
  <Herosection/>
  <div className='mt-5'>
    <AllProducts/>
  </div>
 
    </div>
  )
}

export default page
