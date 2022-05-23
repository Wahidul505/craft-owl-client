import React, { useEffect, useState } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Purchase = () => {
    const [quantity, setQuantity] = useState(0);
    const [displayError, setDisplayError] = useState('');
    const [skipSteps, setSkipSteps] = useState(1);
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { data: tool, isLoading } = useQuery('purchasingTool', () => fetch(`http://localhost:5000/tool/${id}`)
        .then(res => res.json()));

    useEffect(() => {
        setQuantity(parseInt(tool?.minimumOrderQuantity));
    }, [tool]);

    useEffect(() => {
        if (quantity < tool?.minimumOrderQuantity) {
            setDisplayError('You have to Order more than Minimum Order Quantity');
        }
        else if (quantity > tool?.availableQuantity) {
            setDisplayError('You have to Order below Available Stock');
        }
        else {
            setDisplayError('');
        }
    }, [quantity, tool]);

    if (isLoading) {
        return <LoadingSpinner />
    };
    const { name, image, description, minimumOrderQuantity, availableQuantity, price } = tool;

    const onSubmit = data => {
        const person = user?.displayName;
        const email = user?.email;
        console.log(person, email, data);
    };

    const handleSkipQuantitySteps = e => {
        setSkipSteps(parseInt(e.target.value));
    }

    const handleIncreaseQuantity = () => {
        setQuantity((previousQuantity) => previousQuantity + skipSteps);
    };

    const handleDecreaseQuantity = () => {
        setQuantity((previousQuantity) => previousQuantity - skipSteps);
    };



    return (
        <div className='mt-24 grid grid-cols-1 lg:grid-cols-3'>
            <div class="card md:card-side bg-base-100 shadow-xl lg:col-span-2">
                <figure><img className='h-48 rounded-lg md:rounded-l-lg md:rounded-r-none md:h-full w-60' src={image} alt="Album" /></figure>
                <div class="card-body">
                    <h2 class="card-title text-3xl">{name}</h2>
                    <p className='text-gray-600' title={description}>{description.length > 60 ? description.slice(0, 60) + '...' : description}</p>
                    <p className='text-2xl'>Tk <span className='text-secondary font-semibold'>{price}</span></p>
                    <p>Minimum Order Quantity: <span className="text-secondary font-semibold">{minimumOrderQuantity}</span></p>
                    <p>Available in Stock: <span className="text-secondary font-semibold">{availableQuantity}</span></p>
                    {/* Quantity Handler  */}
                    <div>
                        <span className='mr-4'>Quantity:</span>
                        <button
                            onClick={handleDecreaseQuantity}
                            disabled={quantity <= minimumOrderQuantity}
                            className='btn btn-sm btn-secondary mr-2 font-bold'><FaMinus /></button>
                        <input
                            type="number" name="quantity"
                            className='border border-primary rounded w-24 p-1'
                            value={quantity || ''}
                            disabled
                        />
                        <button
                            onClick={handleIncreaseQuantity}
                            disabled={quantity >= availableQuantity}
                            className='btn btn-sm btn-secondary mx-2 font-bold'><BsPlusLg /></button>
                        <select
                            onChange={handleSkipQuantitySteps}
                        >
                            <option disabled selected>Skip</option>
                            <option value='1'>1</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                            <option value='200'>200</option>
                        </select>
                    </div>
                    <p className='text-error h-10'>
                        {displayError ? displayError : ''}
                    </p>
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
                        <button type='submit' class="btn btn-primary" disabled={displayError}>Buy Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Purchase;