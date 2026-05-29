import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='mt-50 bg-gray-200 py-10 text-center'>
      <p className="text-center font-medium"><span className='font-bold'>©{new Date().getFullYear()}</span> Taskin. All rights reserved.</p>
    </div>
    </>
  )
}

export default Footer
