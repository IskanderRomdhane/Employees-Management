import { Link } from 'react-router-dom';
import Login from "../pages/login";

const Navbar = () => {
  return (
    <header className='flex items-center justify-between bg-white shadow-md h-[60px] px-6 z-10'>
      <div className='flex items-center gap-3'>
        {/* Logo or Title */}
        <h1 className='text-4xl protest-guerrilla-regular text-gray-800'>
          Leave<span className='text-red-600'>Manager</span>
        </h1>
      </div>

      {/* Login Button */}
      <Link to="/login">
        <button className='flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white px-5 py-2 text-sm font-medium shadow-lg transition-all duration-300'>
          Login
        </button>
      </Link>
    </header>
  );
}

export default Navbar;
