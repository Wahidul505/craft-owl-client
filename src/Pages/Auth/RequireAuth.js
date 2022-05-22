import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const RequireAuth = () => {
    const [user, loading] = useAuthState(auth);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />
    }

    if (user) {
        return <Outlet />;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace />
    }
};

export default RequireAuth;