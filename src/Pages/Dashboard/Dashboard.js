import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div class="drawer drawer-end">
            <input id="my-drawer" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content">
                {/* <!-- Page content here --> */}
                <div className='flex justify-end'>
                    <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label>
                </div>
                <Outlet />
            </div>
            <div class="drawer-side">
                <label for="my-drawer" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>My Profile</Link></li>
                    <>
                        <li><NavLink to='/dashboard/my-orders'>My Orders</NavLink></li>
                        <li><NavLink to='/dashboard/add-review'>Add a Review</NavLink></li>
                    </>
                    <>
                        <li><NavLink to='/dashboard/manage-orders'>Manage All Orders</NavLink></li>
                        <li><NavLink to='/dashboard/manage-users'>Manage Users</NavLink></li>
                        <li><NavLink to='/dashboard/manage-tools'>Manage Tools</NavLink></li>
                        <li><NavLink to='/dashboard/add-tool'>Add a Tool</NavLink></li>
                    </>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;