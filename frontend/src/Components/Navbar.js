//import headlogo from '../assets/nav/car.png';
//import { elements } from './elements';
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import Login from "../pages/login";

const Navbar = () => {

  return (
    <header className='padding-x flex items-center justify-center gap-10 z-10 h-[60px] px-4'>
      <div className='flex items-center gap-2'>
        <h1 className='text-lg font-Anton'>Leave Manager</h1>
      </div>
      <Link to={"/login"}>
      <button className='flex items-center justify-center rounded-full bg-red-500 text-white px-4 py-1 text-sm'>
        Login
      </button>
      </Link>
    </header>
  );
}
export default Navbar;