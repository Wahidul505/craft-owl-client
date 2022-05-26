import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import useAdmin from '../../hooks/useAdmin';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    const menuItems = [
        <li><Link to='/dashboard'>My Profile</Link></li>,
        <>
            {!admin &&
                <>
                    <li><NavLink to='/dashboard/my-orders'>My Orders</NavLink></li>
                    <li><NavLink to='/dashboard/add-review'>Add a Review</NavLink></li>
                </>
            }
        </>,
        <>
            {admin &&
                <>
                    <li><NavLink to='/dashboard/manage-orders'>Manage Orders</NavLink></li>
                    <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
                    <li><NavLink to='/dashboard/manage-tools'>Manage Tools</NavLink></li>
                    <li><NavLink to='/dashboard/add-tool'>Add a Tool</NavLink></li>
                </>
            }
        </>
    ]
    return (
        <div className='justify-between mt-24 lg:flex gap-8'>
            <div className="dropdown dropdown-hover fixed top-16 left-0 lg:hidden z-20">
                <label tabIndex="0" className="btn"><FaChevronDown /></label>
                <ul tabIndex="0" className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 gap-2">
                    {/* <!-- Sidebar content here --> */}
                    {menuItems}
                </ul>
            </div>
            <aside className="hidden lg:block fixed -ml-10" aria-label="Sidebar">
                <div className="py-4 px-3 bg-base-100 rounded">
                    <ul className="menu p-4 overflow-y-auto w-64 bg-base-200 rounded-lg text-base-content gap-2">
                        {/* <!-- Sidebar content here --> */}
                        {menuItems}
                    </ul>
                </div>
            </aside>
            <div className='w-full pt-8 lg:ml-64'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;