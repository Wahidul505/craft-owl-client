import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, NavLink } from 'react-router-dom';
import auth from '../../firebase.init';

const NavBar = () => {
    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
    }
    const menuItems = [
        <li><NavLink to='/'>Home</NavLink></li>,
        <li><NavLink to='/blogs'>Blogs</NavLink></li>,
        <>{user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}</>,
        <div>
            {
                user ? <div className='flex flex-col lg:flex-row gap-3 lg:gap-0 lg:items-center'>
                    <span className='bg-secondary bg-opacity-50 mr-3 p-1 text-white rounded-lg w-full'>{user.displayName}</span>
                    <button
                        onClick={handleSignOut}
                        className='border-2 border-primary rounded-lg h-10'
                    >LogOut</button>
                </div>
                    : <li><NavLink to='/login' className='border-2 border-primary rounded-lg h-10'>Login</NavLink></li>
            }
        </div>
    ]
    return (
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <Link to='/' className='btn btn-ghost normal-case text-xl'>Craft Owl</Link>
            </div>
            <div class="navbar-end">
                <ul class="menu menu-horizontal p-0 hidden lg:flex gap-3 items-center">
                    {menuItems}
                </ul>
                <div class="dropdown dropdown-end lg:hidden">
                    <label tabindex="0" class="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-3">
                        {menuItems}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;