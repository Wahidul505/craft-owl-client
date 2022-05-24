import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';

const EditProfile = () => {
    const [user] = useAuthState(auth);
    const handleUpdateUser = e => {
        e.preventDefault();
        const education = e.target.education.value;
        const location = e.target.location.value;
        const phone = e.target.phone.value;
        const linkedin = e.target.linkedin.value;
        console.log(education, location, phone, linkedin);
    }
    return (
        <div>
            <form
                className='w-full flex flex-col gap-4'
                onSubmit={handleUpdateUser}>
                <div class="form-control">
                    <label class="input-group">
                        <span className='w-24'>Email</span>
                        <input type="email" value={user?.email || ''} disabled class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="form-control">
                    <label class="input-group">
                        <span className='w-24'>Name</span>
                        <input type="text" value={user?.displayName || ''} disabled class="input input-bordered w-full" />
                    </label>
                </div>
                <div class="form-control">
                    <label class="input-group">
                        <span className='w-24'>Education</span>
                        <input type="text" name='education' placeholder='Institute/year/lastDegree' class="input input-bordered w-full" required />
                    </label>
                </div>
                <div class="form-control">
                    <label class="input-group">
                        <span className='w-24'>Location</span>
                        <input type="text" name='location' placeholder='city/district/country' class="input input-bordered w-full" required />
                    </label>
                </div>
                <div class="form-control">
                    <label class="input-group">
                        <span className='w-24'>Phone</span>
                        <input type="text" name='phone' placeholder='Phone Number' class="input input-bordered w-full" required />
                    </label>
                </div>
                <div class="form-control">
                    <label class="input-group">
                        <span className='w-24'>LinkedIn</span>
                        <input type="text" name='linkedin' placeholder='LinkedIn Link' class="input input-bordered w-full" required />
                    </label>
                </div>
                <div class="form-control mt-6">
                    <input type="submit" value="Submit" className='btn btn-primary' />
                </div>
            </form>
        </div >
    );
};

export default EditProfile;