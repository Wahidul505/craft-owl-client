import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';
import LoadingSpinner from '../Shared/LoadingSpinner';

const RequireAdmin = () => {
    const [user, isLoading] = useAuthState(auth);
    const [admin, adminLoading] = useAdmin(user);
    if (isLoading || adminLoading) {
        return <LoadingSpinner />
    }
    if (!admin) {
        return <Outlet />
    }
    else {
        return <Navigate to='/' />;
    }
};

export default RequireAdmin;