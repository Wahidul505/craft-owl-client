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
    const { data: userInfo, isLoading, refetch } = useQuery(['userInfo', user], () => fetch(`https://craft-owl.herokuapp.com/user/${user?.email}`, {
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
    const { education, location, phone, linkedin, updateStatus, role } = userInfo;

    return (
        <div className='flex flex-col gap-8'>
            <div className="card bg-primary text-primary-content -mx-8 md:mx-0">
                <div className="card-body -mx-4 md:mx-0">
                    <div className="avatar indicator">
                        {role === 'admin' && <span className="indicator-item badge badge-accent">Admin</span>}
                        <h2 className="card-title text-3xl mt-2 mr-8">{user?.displayName || ''}</h2>
                    </div>
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
                    <div className="card-actions justify-end">
                        {
                            user && <button
                                onClick={() => setShowEdit(!showEdit)}
                                className="btn">{showEdit ? "Close" : "Edit"}</button>
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