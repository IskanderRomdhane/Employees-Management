import React from 'react';
import appstore from '../../assests/root/appstore.png';
import googleplay from '../../assests/root/googleplay.png';
import Navbar from '../../Components/Navbar';
import { ReviewCard } from './Reviews';
import { reviews } from './elements';
import background from '../../assests/root/background.jpg'; // Corrected background image import
import { FaCheckCircle, FaDollarSign, FaRocket, FaLock, FaCalendarCheck, FaChartLine } from 'react-icons/fa'; // Example icons

const Root = () => {
  return (
    <div>
      {/* Navbar */}
      <nav>
        <Navbar />
      </nav>

      <div
        className="relative flex flex-wrap justify-center items-center py-10 px-6 lg:px-10"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '80vh',
        }}
      >
        <div className="flex items-center py-5 px-4 lg:px-10 bg-opacity-60">
          <div className="text-center max-w-md">
            <h1 className="font-extrabold text-3xl sm:text-4xl text-white mb-4">
              NUMBER <span className="text-red-600">ONE</span>
            </h1>
            <h2 className="text-2xl sm:text-3xl font-semibold text-orange-500 mb-6">
              ENTERPRISES CHOICE
            </h2>
            <p className="text-base sm:text-lg text-white leading-relaxed mb-6">
              At <span className="text-red-600 font-bold">Leave Management</span>, we're committed to bringing your enterprise the best leave request app.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <img
                src={appstore}
                alt="App Store"
                className="w-24 h-auto hover:scale-105 transition-transform duration-300"
              />
              <img
                src={googleplay}
                alt="Google Play"
                className="w-24 h-auto hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className='hidden lg:flex py-10 items-center justify-center rounded-full ml-0 lg:ml-[100px]'>
            <img
              src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
              width={300}
              height={300}
              className='rounded-full'
              alt='Delivery'
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 320"
            className="w-full h-[100px] lg:h-[150px]"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill="white"
              d="M0,224L48,224C96,224,192,224,288,213.3C384,203,480,181,576,165.3C672,149,768,139,864,160C960,181,1056,235,1152,240C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </div>

      <section className="py-12 lg:py-20 bg-white" id='features'>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">
          Key <span className="text-coral-red">Features</span>
        </h3>
        <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10 max-w-12xl mx-auto px-4">
          <div className="flex flex-col items-center text-center w-full sm:w-80 lg:w-72 p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaCheckCircle className="text-3xl sm:text-4xl text-blue-500 mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold mb-4">User-Friendly Interface</h4>
            <p className="text-sm sm:text-base text-gray-600">
              Our app offers an intuitive and easy-to-navigate interface, ensuring a smooth experience for all users.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center w-full sm:w-80 lg:w-72 p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaDollarSign className="text-3xl sm:text-4xl text-green-500 mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Seamless Integration</h4>
            <p className="text-sm sm:text-base text-gray-600">
              Integrates effortlessly with your existing systems, providing a unified solution for leave management.
            </p>
          </div>

          <div className="flex justify-center items-center w-full sm:w-80 lg:w-72 mt-10">
            <img 
              src='https://media.istockphoto.com/id/888619612/vector/target-keyword-icon.jpg?s=612x612&w=0&k=20&c=PxSkuGWEai9nWy44rIOkYVMXpoYIyVnvRTNSpYZX7Sc='
              width={250}
              className=""
              alt="Key Features"
            />
          </div>

          <div className="flex flex-col items-center text-center w-full sm:w-80 lg:w-72 p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaRocket className="text-3xl sm:text-4xl text-red-500 mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Advanced Reporting</h4>
            <p className="text-sm sm:text-base text-gray-600">
              Generate comprehensive reports to gain insights and make data-driven decisions for better management.
            </p>
          </div>

          <div className="flex flex-col items-center text-center w-full sm:w-80 lg:w-72 p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <FaLock className="text-3xl sm:text-4xl text-purple-500 mb-4" />
            <h4 className="text-lg sm:text-xl font-semibold mb-4">Customizable Notifications</h4>
            <p className="text-sm sm:text-base text-gray-600">
              Set up personalized notifications and alerts to stay informed about important updates and deadlines.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-white" id='why-us'>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">
          Why <span className="text-coral-red">Us?</span>
        </h3>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10 max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4">
            <FaChartLine className="text-2xl sm:text-3xl lg:text-4xl text-blue-500" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Increased productivity</p>
          </div>

          <div className="flex items-center gap-4">
            <FaDollarSign className="text-2xl sm:text-3xl lg:text-4xl text-green-500" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Low cost investment</p>
          </div>

          <div className="flex items-center gap-4">
            <FaRocket className="text-2xl sm:text-3xl lg:text-4xl text-red-500" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Quick and easy to implement</p>
          </div>

          <div className="flex items-center gap-4">
            <FaLock className="text-2xl sm:text-3xl lg:text-4xl text-purple-500" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Secure web-based 24/7 accessibility</p>
          </div>

          <div className="flex items-center gap-4">
            <FaCalendarCheck className="text-2xl sm:text-3xl lg:text-4xl text-orange-500" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Tracks all types of leave</p>
          </div>

          <div className="flex items-center gap-4">
            <FaChartLine className="text-2xl sm:text-3xl lg:text-4xl text-teal-500" />
            <p className="text-sm sm:text-base lg:text-lg text-gray-700">Full reporting functionality</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-12 lg:py-20" id='testimonials'>
        <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6">
          What Our
          <span className="text-coral-red"> Customers </span>
          Say?
        </h3>
        <p className="m-auto mt-4 max-w-lg text-center text-gray-700">
          Hear genuine stories from our satisfied customers about their exceptional experiences with us.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-6 lg:gap-10">
          {reviews.map((review, index) => (
            <ReviewCard
              key={index}
              imgURL={review.imgURL}
              customerName={review.customerName}
              rating={review.rating}
              feedback={review.feedback}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Root;
