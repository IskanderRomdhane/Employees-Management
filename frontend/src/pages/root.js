import React from 'react'
import appstore from '../assests/root/appstore.png'
import googleplay from '../assests/root/googleplay.png'
import Navbar from '../Components/Navbar'

const Root = () => {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      <div className="flex flex-wrap justify-center items-center bg-gradient-to-r from-blue-500 via-blue-300 to-blue-100 py-16 px-10">
        <div className="max-w-md text-center">
          <h1 className="font-extrabold text-4xl text-gray-800 mb-4">
            NUMBER <span className="text-red-600">ONE</span>
          </h1>
          <h2 className="text-3xl font-semibold text-orange-500 mb-6">
            ENTERPRISES CHOICE
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            At <span className="text-red-600 font-bold">Leave Management</span>, we're committed to bringing your enterprise the best leave request app.
          </p>
          <div className="flex justify-center gap-6">
            <img
              src={appstore}
              alt="App Store"
              className="w-32 h-auto hover:scale-105 transition-transform duration-300"
            />
            <img
              src={googleplay}
              alt="Google Play"
              className="w-32 h-auto hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Root;
