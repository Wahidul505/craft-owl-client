import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';

const Payment = () => {
    const { id } = useParams();
    const { data: payingOrder, isLoading, refetch } = useQuery(['payingOrder', id], () => fetch(`http://localhost:5000/order?id=${id}`, {
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => {
        if (res.status === 401 || res.status === 403) {
            signOut(auth);
        }
        else {
            return res.json();
        }
    }));
    if (isLoading) {
        return <LoadingSpinner />
    };
    const { person, toolName, quantity, totalPrice, phone, address } = payingOrder;
    return (
        <div class="hero min-h-screen bg-base-200 mt-36 rounded">
            <div class="hero-content flex-col lg:flex-row">
                <div class="text-center lg:text-left">
                    <h1 class="text-4xl font-bold"><span className='text-accent'>{person},</span> Please Pay <span className="text-primary">${totalPrice}</span></h1>
                    <p className='text-xl'>For Your Order On <span className="text-accent font-semibold">{toolName}</span></p>
                    <div className='bg-base-300 mt-6 rounded p-4'>
                        <h3 className='font-semibold text-xl'>Order Information</h3>
                        <hr className='mb-3'/>
                        <p className='text-lg'>Total Quantity: <span className='text-primary'>{quantity}</span></p>
                        <p className='text-lg'>Phone: <span className='text-primary'>{phone}</span></p>
                        <p className='text-lg'>Address: <span className='text-primary'>{address}</span></p>
                    </div>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" class="input input-bordered" />
                        </div>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" class="input input-bordered" />
                        </div>
                        <div class="form-control mt-6">
                            <button class="btn btn-primary">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;