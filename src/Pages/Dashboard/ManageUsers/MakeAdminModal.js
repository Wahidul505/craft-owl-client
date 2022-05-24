import { signOut } from 'firebase/auth';
import React from 'react';
import auth from '../../../firebase.init';

const MakeAdminModal = ({ userEmail, refetch }) => {
    const handleMakeAdmin = email => {
        fetch(`http://localhost:5000/admin/user/${email}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            method: 'PATCH'
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
            }
            else {
                return res.json();
            }
        }).then(data => {
            refetch();
        });
    }
    return (
        <div>
            <input type="checkbox" id="make-admin-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Do You want to make <span className='text-secondary'>{userEmail}</span> an Admin?</h3>
                    <div class="modal-action">
                        <label
                            onClick={()=>handleMakeAdmin(userEmail)}
                            for="make-admin-modal" class="btn hover:btn-success hover:text-white">Yes</label>
                        <label for="make-admin-modal" class="btn hover:btn-error">No</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default MakeAdminModal;