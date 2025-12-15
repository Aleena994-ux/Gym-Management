import React from 'react'
import Header from '../../common/components/Header'
import Footer from '../../common/components/Footer'
import { Link } from 'react-router-dom'

function PaymentError() {
  return (
    <>
     <Header/>
     <div className='grid grid-cols-2 py-20 px-40 justify-center items-center'>
        <div>
            <h1 className='text-6xl text-red-700'>Your Payment is unsuccessfull...</h1>
            <p className='mt-5 mb-10'>Sorry for the inconvenience, and thank you for choosing our gym.</p>
            <Link className='px-4 py-3 bg-blue-600 text-white hover:border hover:border-blue-600 hover:bg-white hover:text-blue-600' to={"/"}>Explore More</Link>
        </div>
        <div>
            <img src="https://png.pngtree.com/png-clipart/20250516/original/pngtree-payment-error-icon-png-image_20994702.png" className='w-3/4 ms-20' alt="" />
        </div>
     </div>
     <Footer/> 
    </>
  )
}

export default PaymentError
