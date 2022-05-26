import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import MakeAdminModal from './MakeAdminModal';
import UserRow from './UserRow';

const ManageUsers = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null);
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/')
            }
            else {
                return res.json();
            }
        }));
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <td></td>
                        <th>Email</th>
                        <th>Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => <UserRow
                            key={user._id}
                            user={user}
                            index={index}
                            setUserEmail={setUserEmail}
                        />)
                    }
                </tbody>
            </table>
            {userEmail && <MakeAdminModal
                userEmail={userEmail}
                refetch={refetch}
            />}
        </div>
    );
};

export default ManageUsers;