import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between  py-4 px-20 bg-slate-300'>
        <h2 className='text-2xl font-bold'>Techlib-Admin</h2>
        <div className='flex gap-4 text-md font-semibold cursor-pointer'>
            <Link className='hover:underline transition-duration-600 ' to="/">Home</Link>
            <Link className='hover:underline transition-duration-600' to="/users">Users</Link>
            <Link className='hover:underline transition-duration-600' to="/documents">Documents</Link>
            
        </div>
    </div>
  )
}

export default Navbar