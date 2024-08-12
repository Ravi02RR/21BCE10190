import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className=' '>
            <nav className='bg-gray-800 h-20 p-10 text-white flex justify-between items-center '>
                <h1>my Ecommerce app</h1>
                <ul className='flex justify-between '>
                    <li className='p-2'>
                        <NavLink to='/' activeclassname='text-red-500' className='hover:text-red-500'>Home</NavLink>
                    </li>
                    <li className='p-2'>
                        <NavLink to='/custompage' activeclassname='text-red-500' className='hover:text-red-500'>Custompage</NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar
