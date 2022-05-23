import React from 'react';
import { Outlet } from 'react-router-dom';

const RequireAdmin = () => {
    return (
        <div>
            <h1>Hello from Require Admin</h1>
            <Outlet />
        </div>
    );
};

export default RequireAdmin;