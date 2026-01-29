import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PiShoppingCart } from "react-icons/pi";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const user = true;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='custom-shadow sticky top-0 flex h-[60px] bg-white justify-between items-center px-5 md:px-10 w-full z-20 '>
      
      {/* Logo */}
      <div className="overflow-hidden">
        <img src="/Ekart.png" alt="Ekart Logo" className='w-[130px]' />
      </div>

      {/* Desktop Nav */}
      <nav className='hidden md:flex items-center gap-5'>
        <ul className='flex gap-7 items-center text-lg md:text-xl'>
          <Link to={"/"} className='font-semibold text-gray-600 hover:text-pink-500 duration-300'>Home</Link>
          <Link to={"/products"} className='font-semibold text-gray-600 hover:text-pink-500 duration-300'>Products</Link>
          {user && <div className='font-semibold text-gray-600 cursor-pointer hover:text-pink-500 duration-300'>Hello User</div>}
        </ul>

        <Link to={"/cart"} className='relative ml-5'>
          <PiShoppingCart className='text-2xl text-gray-700'/>
          <span className='bg-pink-500 rounded-full absolute -top-2 -right-2 text-white px-2 text-xs'>0</span>
        </Link>

        {user ? (
          <button className='bg-pink-600 text-white cursor-pointer px-4 py-1 rounded-md font-semibold ml-4'>Logout</button>
        ) : (
          <button className='text-white bg-gradient-to-tl from-blue-600 to-purple-600 cursor-pointer px-4 rounded-md py-1 ml-4'>Login</button>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <div className='md:hidden flex items-center'>
        <Link to={"/cart"} className='relative mr-3'>
          <PiShoppingCart className='text-2xl text-gray-700'/>
          <span className='bg-pink-500 rounded-full absolute -top-2 -right-2 text-white px-2 text-xs'>0</span>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiOutlineX className='text-3xl text-gray-700'/> : <HiOutlineMenu className='text-3xl text-gray-700'/>}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className='absolute top-[60px] left-0 w-full bg-white flex flex-col gap-4 px-5 py-5 md:hidden shadow-lg z-10'>
          <Link to={"/"} className='font-semibold text-gray-600 hover:text-pink-500 duration-300'>Home</Link>
          <Link to={"/products"} className='font-semibold text-gray-600 hover:text-pink-500 duration-300'>Products</Link>
          {user && <div className='font-semibold text-gray-600 cursor-pointer hover:text-pink-500 duration-300'>Hello User</div>}
          {user ? (
            <button className='bg-pink-600 text-white px-4 py-1 rounded-md font-semibold'>Logout</button>
          ) : (
            <button className='text-white bg-gradient-to-tl from-blue-600 to-purple-600 px-4 rounded-md py-1'>Login</button>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
