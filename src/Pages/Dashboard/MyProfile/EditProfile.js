import { signOut } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const EditProfile = ({ user, userInfo, refetch, setShowEdit }) => {
    const navigate = useNavigate();
    const handleUpdateUser = e => {
        e.preventDefault();
        const name = user?.displayName;
        const education = e.target.education.value;
        const location = e.target.location.value;
        const phone = e.target.phone.value;
        const linkedin = e.target.linkedin.value;
        const userUpdatedInfo = { name, education, location, phone, linkedin, updateStatus: true }
        fetch(`https://craft-owl.herokuapp.com/update-user/${user?.email}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(userUpdatedInfo)
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/');
                signOut(auth);
            }
            else {
                return res.json();
            }
        }).then(data => {
            toast.success('Your Information has been Received', { id: 'updatedUserInfo' });
            refetch();
            setShowEdit(false);
        });
    }
    return (
        <div>
            <form
                className='w-full flex flex-col gap-4'
                onSubmit={handleUpdateUser}>
                <div className="form-control">
                    <label className="input-group">
                        <span className='w-24'>Email</span>
                        <input type="email" value={user?.email || ''} disabled className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="input-group">
                        <span className='w-24'>Name</span>
                        <input type="text" value={user?.displayName || ''} disabled className="input input-bordered w-full" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="input-group">
                        <span className='w-24'>Education</span>
                        <input type="text" name='education' placeholder='Institute/ year/ lastDegree' className="input input-bordered w-full" required defaultValue={userInfo?.education} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="input-group">
                        <span className='w-24'>Location</span>
                        <input type="text" name='location' placeholder='city/district/country' className="input input-bordered w-full" required defaultValue={userInfo?.location} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="input-group">
                        <span className='w-24'>Phone</span>
                        <input type="text" name='phone' placeholder='Phone Number' className="input input-bordered w-full" required defaultValue={userInfo?.phone} />
                    </label>
                </div>
                <div className="form-control">
                    <label className="input-group">
                        <span className='w-24'>LinkedIn</span>
                        <input type="text" name='linkedin' placeholder='LinkedIn Link' className="input input-bordered w-full" required defaultValue={userInfo?.linkedin} />
                    </label>
                </div>
                <div className="form-control mt-6">
                    <input type="submit" value="Submit" className='btn btn-primary' />
                </div>
            </form>
        </div >
    );
};

export default EditProfile;