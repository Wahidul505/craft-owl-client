import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../hooks/useToken';

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const [token] = useToken(user);

    useEffect(() => {
        if (token) {
            toast.success('Logged In', { id: 'googleSignInSuccess' });
            navigate(from, { replace: true });
        }
        if (error) {
            toast.error(error.code.slice(5, error.code.length), { id: 'googleSignInError' });
        }
    }, [token, error, navigate, from]);

    if (loading) {
        return <div className='animate-spin w-20 h-20 border-t-2 border-primary rounded-full mx-auto'></div>
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
    }
    return (
        <div>
            <div className='divider'>Or</div>
            <button onClick={handleGoogleSignIn} className='btn w-full btn-outline btn-ghost'><FcGoogle className='mr-4 text-3xl' /> <span>Google SignIn</span></button>
        </div>
    );
};

export default GoogleSignIn;