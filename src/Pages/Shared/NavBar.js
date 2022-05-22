import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const NavBar = () => {
    const [user] = useAuthState(auth);
    const handleSignOut = () => {
        signOut(auth);
    }
    const menuItems = [
        <li><Link to='/'>Home</Link></li>,
        <li><Link to='/dashboard'>Dashboard</Link></li>,
        <li><Link to='/blogs'>Blogs</Link></li>,
        <li>
            {
                user ? <button
                    onClick={handleSignOut}
                    className='border-2 border-primary rounded-lg h-10'>LogOut</button>
                    : <Link to='/login' className='border-2 border-primary rounded-lg h-10'>Login</Link>
            }
        </li>
    ]
    return (
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <button className='btn btn-ghost normal-case text-xl'><Link to="/">Craft Owl</Link></button>
            </div>
            <div class="navbar-end hidden lg:flex">
                <ul class="menu menu-horizontal p-0 flex items-center gap-3">
                    {menuItems}
                </ul>
            </div>
        </div>
    );
};

export default NavBar;