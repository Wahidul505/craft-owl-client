import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const AddReview = () => {
    const [user] = useAuthState(auth);
    const name = user?.displayName;
    const email = user?.email;
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data, e) => {
        e.preventDefault();
        const description = data.description;
        const rating = parseInt(e.target.rating.value) || 5;
        const review = {
            email,
            name,
            description,
            rating
        }
        fetch('http://localhost:5000/review', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(review)
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/');
                signOut(auth);
                localStorage.removeItem('accessToken');
            }
            else {
                return res.json();
            }
        }).then(data => {
            toast.success('We Accepted Your Review', { id: 'reviewAccept' });
        });
    }
    return (
        <div>
            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="description" className='text-xl'>Your Review Description</label>
                <textarea
                    {...register("description", {
                        required: {
                            value: true,
                            message: "Please Add a Review Description"
                        },
                        minLength: {
                            value: 50,
                            message: "Review Description Should be more than 50 words"
                        },
                        maxLength: {
                            value: 200,
                            message: "Review Description should not be more than 200 words"
                        }
                    })}
                    type="text" id='description' placeholder='Write Your Thoughts'
                    className='border-2 border-gray-600 rounded p-2 text-lg h-32 whitespace-pre-wrap'
                    required
                />
                {errors.description?.type === 'required' && <small className='text-red-500'>{errors.description.message}</small>}
                {errors.description?.type === 'minLength' && <small className='text-red-500'>{errors.description.message}</small>}
                {errors.description?.type === 'maxLength' && <small className='text-red-500'>{errors.description.message}</small>}
                <label htmlFor="ratings" className='text-xl mt-6'>Your Ratings</label>
                <div class="rating rating-lg">
                    <input type="radio" name="rating" value={1} class="mask mask-star-2 bg-secondary" />
                    <input type="radio" name="rating" value={2} class="mask mask-star-2 bg-secondary" />
                    <input type="radio" name="rating" value={3} class="mask mask-star-2 bg-secondary" />
                    <input type="radio" name="rating" value={4} class="mask mask-star-2 bg-secondary" />
                    <input type="radio" name="rating" value={5} class="mask mask-star-2 bg-secondary" />
                </div>
                <input type="submit" value="Add Review" className='btn btn-primary mt-8 w-40' />
            </form>
        </div>
    );
};

export default AddReview;