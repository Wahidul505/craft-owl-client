import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, stripe } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useAuthState } from 'react-firebase-hooks/auth';

const stripePromise = loadStripe('pk_test_51L0f8BK96S4Dx2sqbNrb8CtiStAD5MvRtuaitvoIxKHkgpfokbzhX3YpcAYd1dbbGAqk5v0cqrXzzSL581c6mJHw00LKqElvb1');

const Payment = () => {
    const [user] = useAuthState(auth);
    const { id } = useParams();
    const { data: payingOrder, isLoading, refetch } = useQuery(['payingOrder', id], () => fetch(`http://localhost:5000/order?id=${id}&email=${user?.email}`, {
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
    const { person, toolName, quantity, totalPrice, phone, address, transactionId } = payingOrder;
    return (
        <div class="hero min-h-screen bg-base-200 mt-20 rounded ">
            <div class="hero-content flex-col lg:flex-row gap-12">
                <div class="text-center lg:text-left">
                    <div className='bg-base-300 mt-6 rounded p-4'>
                        <h3 className='font-semibold text-xl'>Order Information</h3>
                        <hr className='mb-3' />
                        <p className='text-lg'>Name: <span className='text-primary'>{person}</span></p>
                        <p className='text-lg'>Phone: <span className='text-primary'>{phone}</span></p>
                        <p className='text-lg'>Address: <span className='text-primary'>{address}</span></p>
                        <p className='text-lg'>Ordered Tool: <span className='text-primary'>{toolName}</span></p>
                        <p className='text-lg'>Total Quantity: <span className='text-primary'>{quantity}</span></p>
                        <p className='text-lg'>Total Price: <span className='text-primary'>{totalPrice}</span></p>
                    </div>
                </div>
                <div class="card w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body h-80">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm
                                refetch={refetch}
                                payingOrder={payingOrder}
                            />
                        </Elements>
                        {!transactionId && <div>
                            <h1 class="text-4xl font-bold">Please Pay <span className="text-primary">${totalPrice}</span></h1>
                            <p className='text-xl'>For Your Order On <span className="text-accent font-semibold">{toolName}</span></p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;