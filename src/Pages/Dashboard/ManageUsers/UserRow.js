import React from 'react';

const UserRow = ({ user, index, refetch, setUserEmail }) => {
    const { email, role } = user;
    
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{email}</td>
            <td>
                {role === 'admin' ? <p className='bg-secondary rounded-3xl w-28 py-1 text-center'>Admin</p>
                    : <label
                        onClick={() => setUserEmail(email)}
                        for="make-admin-modal" className="btn btn-sm btn-accent">Make Admin</label>}
            </td>
        </tr>
    );
};

export default UserRow;