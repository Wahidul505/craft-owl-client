import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Purchase = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { data: tool, isLoading } = useQuery('purchasingTool', () => fetch(`http://localhost:5000/tool/${id}`)
        .then(res => res.json()));
    if (isLoading) {
        return <LoadingSpinner />
    };
    const { name, image, description, minimumOrderQuantity, availableQuantity, price } = tool;

    const onSubmit = data => {
        const person = user?.displayName;
        const email = user?.email;
        console.log(person, email, data);
    }
    return (
        <div className='mt-24 grid grid-cols-1 lg:grid-cols-3'>
            <div class="card md:card-side bg-base-100 shadow-xl lg:col-span-2">
                <figure><img className='h-48 rounded-lg md:rounded-l-lg md:rounded-r-none md:h-full w-60' src={image} alt="Album" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-2xl">{name}</h2>
                    <p className='text-gray-600' title={description}>{description.length > 60 ? description.slice(0, 60) + '...' : description}</p>
                    <p className='text-2xl'>Tk <span className='text-secondary font-semibold'>{price}</span></p>
                    <div class="card-actions justify-start">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            {/* form starts from here  */}
            <div class="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Name</span>
                        </label>
                        <input type="text" value={user?.displayName || ''} disabled class="input input-bordered" />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Email</span>
                        </label>
                        <input type="text" value={user?.email || ''} disabled class="input input-bordered" />
                    </div>
                    {/* field for phone number  */}
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text text-xl">Phone</span>
                        </label>
                        <input
                            {...register("phone", {
                                required: {
                                    value: true,
                                    message: "Phone Number is Required"
                                }
                            })}
                            type="number" placeholder="phone" name='phone' class="input input-bordered text-lg" />

                        {errors.phone?.type === 'required' && <small className='text-red-500'>{errors.phone.message}</small>}
                    </div>
                    {/* field for address  */}
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text text-xl">Address</span>
                        </label>
                        <input
                            {...register("address", {
                                required: {
                                    value: true,
                                    message: "Phone Number is Required"
                                }
                            })}
                            type="text" placeholder="address" name='address' class="input input-bordered text-lg" />

                        {errors.address?.type === 'required' && <small className='text-red-500'>{errors.address.message}</small>}
                    </div>
                    {/* submit button  */}
                    <div class="form-control mt-6">
                        <button type='submit' class="btn btn-primary">Buy Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Purchase;