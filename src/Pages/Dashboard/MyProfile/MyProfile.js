import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import EditProfile from './EditProfile';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [showEdit, setShowEdit] = useState(false);
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div class="card h-44 bg-primary text-primary-content">
                <div class="card-body">
                    <h2 class="card-title">{user?.displayName || ''}</h2>
                    <p>{user?.email || ''}</p>
                    <div class="card-actions justify-end">
                        {
                            user && <button
                                onClick={() => setShowEdit(!showEdit)}
                                class="btn">Edit</button>
                        }
                    </div>
                </div>
            </div>
            {showEdit && <EditProfile />}
        </div>
    );
};

export default MyProfile;