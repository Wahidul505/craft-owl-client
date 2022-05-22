import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => {
    return (
        <div>
            <div className='divider'>Or</div>
            <button className='btn w-full btn-outline btn-ghost'><FcGoogle /> <span>Google SignIn</span></button>
        </div>
    );
};

export default GoogleSignIn;