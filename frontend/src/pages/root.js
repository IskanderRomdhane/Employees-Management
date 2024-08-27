import React from 'react'
import appstore from '../assests/root/appstore.png'
import googleplay from '../assests/root/googleplay.png'
import island from '../assests/root/island.jpg'
import Navbar from '../Components/Navbar'
const Root = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
    <div className="flex flex-nowrap justify-center padding-x bg-blue-100 gap-80 py-20">
      <div className=''>
        <h1 className="font-bold text-2xl">
          <h1>NUMBER <span className='text-red-500'>ONE</span></h1>
          <h1 className="text-orange-500">ENTREPRISES CHOICE</h1>
        </h1>
        <p className="text-sm">
          At <span className="text-red-600 font-bold">Leave Management</span>, we're committed to bringing your entreprise<br /> the best leave requests app
        </p>

        <div className='flex flex-wrap gap-10 py-3'>
          <img 
            src={appstore}
            width={100}
            height={40}
          />
          <img 
            src={googleplay}
            width={100}
            height={40}
          />
        </div>
      </div>
      <div className='hidden lg:flex py-10 items-center justify-center rounded-full'>
      <img
        src={island}
        width={175}
        height={40}
        className='rounded-full'
        alt='Delivery'
  />
      
      </div>
      

    </div>
    </div>
  );
}
export default Root;