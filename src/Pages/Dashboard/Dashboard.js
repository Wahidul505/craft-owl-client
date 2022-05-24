import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const menuItems = [
        <li><Link to='/dashboard'>My Profile</Link></li>,
        <>
            <li><NavLink to='/dashboard/my-orders'>My Orders</NavLink></li>
            <li><NavLink to='/dashboard/add-review'>Add a Review</NavLink></li>
        </>,
        <>
            <li><NavLink to='/dashboard/manage-orders'>Manage All Orders</NavLink></li>
            <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
            <li><NavLink to='/dashboard/manage-tools'>Manage Tools</NavLink></li>
            <li><NavLink to='/dashboard/add-tool'>Add a Tool</NavLink></li>
        </>
    ]
    return (
        <div className='justify-between mt-16 lg:flex gap-8'>
            <div class="dropdown dropdown-hover fixed top-16 left-0 lg:hidden z-20">
                <label tabindex="0" class="btn m-1">Hover</label>
                <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                    {/* <!-- Sidebar content here --> */}
                    {menuItems}
                </ul>
            </div>
            <aside class="hidden lg:block -ml-10" aria-label="Sidebar">
                <div class="py-4 px-3 bg-base-100 rounded">
                    <ul class="menu p-4 overflow-y-auto w-64 bg-base-200 rounded-lg text-base-content">
                        {/* <!-- Sidebar content here --> */}
                        {menuItems}
                    </ul>
                </div>
            </aside>
            <div className='text-left bg-slate-500 w-full'>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;

{/* <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
</ul> */}

                    // {/* <!-- Sidebar content here --> */}
                    // <li><Link to='/dashboard'>My Profile</Link></li>
                    // <>
                    //     <li><NavLink to='/dashboard/my-orders'>My Orders</NavLink></li>
                    //     <li><NavLink to='/dashboard/add-review'>Add a Review</NavLink></li>
                    // </>
                    // <>
                    //     <li><NavLink to='/dashboard/manage-orders'>Manage All Orders</NavLink></li>
                    //     <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
                    //     <li><NavLink to='/dashboard/manage-tools'>Manage Tools</NavLink></li>
                    //     <li><NavLink to='/dashboard/add-tool'>Add a Tool</NavLink></li>
                    // </>