import React, { useEffect, useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { signOut } from 'firebase/auth';
import auth from '../../firebase.init';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Shared/LoadingSpinner';
import { Link } from 'react-router-dom';

const CheckoutForm = ({ refetch, payingOrder }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [displayError, setDisplayError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [paymentLoading, setPaymentLoading] = useState(false);
    const { _id, toolName, totalPrice, person, email, status, transactionId } = payingOrder;

    useEffect(() => {
        fetch('https://craft-owl.herokuapp.com/create-payment-intent', {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            method: 'POST',
            body: JSON.stringify({ price: totalPrice })
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth)
            }
            else {
                return res.json()
            }
        }).then(data => {
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
            }
        });
    }, [totalPrice]);

    const handlePaymentSubmit = async e => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        setDisplayError(error?.message || '');

        // to complete the payment 
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: person,
                        email: email,
                    },
                },
            },
        );
        if (intentError) {
            setDisplayError(intentError?.message);
        }
        else {
            setPaymentLoading(true);
            fetch(`https://craft-owl.herokuapp.com/order/${_id}`, {
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                method: 'PATCH',
                body: JSON.stringify({ transactionId: paymentIntent.id })
            }).then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    setPaymentLoading(false);
                }
                else {
                    return res.json();
                }
            }).then(data => {
                setPaymentLoading(false);
                toast.success('Congrats! Your Payment is Completed', { id: 'paymentSuccess' });
                setDisplayError('');
                refetch();
            })
        }
    };

    if (paymentLoading) {
        return <LoadingSpinner />
    }
    return (
        <div>
            <form onSubmit={handlePaymentSubmit}
                className='h-full'
            >
                <CardElement
                    className='border-2 border-gray-400 rounded p-2'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {displayError && <p className='text-error'>{displayError}</p>}
                <button
                    className='btn btn-sm btn-primary mt-4'
                    type="submit" disabled={!stripe || !clientSecret || status === 'pending'}>
                    Pay
                </button>
                {
                    status === 'pending' && <div>
                        <p className='text-xl text-gray-700'>You Complete Your Payment with <span className='text-secondary'>${totalPrice}</span> for <span className='text-secondary'>{toolName}</span></p>
                        <p className='text-xl text-gray-700'>Your Transaction Id: <span className='text-secondary'>{transactionId}</span></p>
                        <Link to='/dashboard/my-orders' className='underline text-blue-600 absolute bottom-5'>Back to My Orders</Link>
                    </div>
                }
            </form>
        </div>
    );
};

export default CheckoutForm;