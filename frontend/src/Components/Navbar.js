import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className='flex items-center justify-between bg-white shadow-md h-[70px] px-8 z-10'>
      {/* Logo or Title */}
      <div className='flex items-center gap-3'>
        <h1 className='text-4xl protest-guerrilla-regular tracking-wide text-gray-800'>
          Leave<span className='text-red-600'>Manager</span>
        </h1>
      </div>

      {/* Navigation Links */}
      <nav className='flex items-center gap-8'>
        <a 
          href="#why-us" 
          className='text-gray-700 hover:text-red-600 font-medium text-lg transition-colors duration-300 relative'
        >
          Why Us
          <span className="block h-[2px] bg-red-600 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left absolute left-0 bottom-[-2px] w-full"></span>
        </a>

        <a 
          href="#features" 
          className='text-gray-700 hover:text-red-600 font-medium text-lg transition-colors duration-300 relative'
        >
          Features
          <span className="block h-[2px] bg-red-600 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left absolute left-0 bottom-[-2px] w-full"></span>
        </a>

        <a 
          href="#testimonials" 
          className='text-gray-700 hover:text-red-600 font-medium text-lg transition-colors duration-300 relative'
        >
          Testimonials
          <span className="block h-[2px] bg-red-600 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left absolute left-0 bottom-[-2px] w-full"></span>
        </a>

        {/* Login Button */}
        <Link to="/login">
          <button className='flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-lg font-semibold shadow-lg transition-all duration-300'>
            Login
          </button>
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
