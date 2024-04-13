import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full border py-2'>
        <Link to="/" className="font-bold text-[28px] px-5 hover:text-gray-600" >Home</Link>
    </div>
  )
}

export default Navbar