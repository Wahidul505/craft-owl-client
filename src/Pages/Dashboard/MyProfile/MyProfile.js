import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import EditProfile from './EditProfile';

const MyProfile = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const { data: userInfo, isLoading, refetch } = useQuery(['userInfo', user], () => fetch(`http://localhost:5000/user/${user?.email}`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            navigate('/');
            signOut(auth);
        }
        else {
            return res.json();
        }
    }));

    if (isLoading) {
        return <LoadingSpinner />
    };
    const { education, location, phone, linkedin, updateStatus } = userInfo;

    return (
        <div className='flex flex-col gap-8'>
            <div class="card bg-primary text-primary-content">
                <div class="card-body">
                    <h2 class="card-title text-3xl">{user?.displayName || ''}</h2>
                    <p>{user?.email || ''}</p>
                    {
                        updateStatus &&
                        <div>
                            <p>Education: <span className='text-white font-semibold'>{education || ''}</span></p>
                            <p>Address: <span className='text-white font-semibold'>{location || ''}</span></p>
                            <p>Phone: <span className="text-white font-semibold">{phone || ''}</span></p>
                            <p>LinkedIn Profile: <br /> <a className="text-white font-semibold" href={linkedin}>{linkedin || ''}</a></p>
                        </div>
                    }
                    <div class="card-actions justify-end">
                        {
                            user && <button
                                onClick={() => setShowEdit(!showEdit)}
                                class="btn">{showEdit? "Close": "Edit"}</button>
                        }
                    </div>
                </div>
            </div>
            {showEdit && <EditProfile
                user={user}
                refetch={refetch}
                userInfo={userInfo}
                setShowEdit={setShowEdit}
            />}
        </div>
    );
};

export default MyProfile;