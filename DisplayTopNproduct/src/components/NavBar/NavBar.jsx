import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className=' '>
            <nav className='bg-red-800 h-20 p-10 text-white flex justify-between items-center'>
                <h1 className='text-3xl font-bold'>my Ecommerce app</h1>
                <ul className='flex justify-between'>
                    <li className='p-2'>
                        <NavLink to='/' activeClassName='text-red-500' className='hover:text-red-500 text-2xl' >Home</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
