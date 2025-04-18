import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div className='flex justify-between items-center px-20 py-5 bg-slate-200'>
        <Link to="/">Techlib</Link>
        <ul className='flex gap-5 '>
            
            <li><Link to="/explore">Explore</Link></li>
            <li><Link to="/collection">Collection</Link></li>            
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/upload">Upload</Link></li>
        </ul>

    </div>
  )
}

export default Navbar