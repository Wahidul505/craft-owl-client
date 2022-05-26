import { signOut } from 'firebase/auth';
import React from 'react';
import auth from '../../../firebase.init';

const Order = ({ order, refetch, setDeletingOrder }) => {
    const { _id, person, email, phone, address, toolName, quantity, totalPrice, status } = order;
    const handleShipOrder = (id) => {
        fetch(`https://craft-owl.herokuapp.com/admin/order/${id}`, {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            method: 'PATCH',
            body: JSON.stringify({ status: 'shipped' })
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
            }
            else {
                return res.json();
            }
        }).then(data => {
            console.log(data);
            refetch();
        });
    }
    return (
        <div className="card w-full lg:card-side bg-base-100 shadow-xl">

            <div className="card-body">
                <div className='bg-base-300 mt-6 rounded  py-2 p-0 md:px-4 md:py-4 -mx-8 md:mx-0'>
                    <h3 className='font-semibold text-xl'>Order Information</h3>
                    <hr className='mb-3' />
                    <p className='text-lg'>Name: <span className='text-primary'>{person}</span></p>
                    <p className='text-lg'>Email: <span className='text-primary'>{email}</span></p>
                    <p className='text-lg'>Phone: <span className='text-primary'>{phone}</span></p>
                    <p className='text-lg'>Address: <span className='text-primary'>{address}</span></p>
                    <p className='text-lg'>Ordered Tool: <span className='text-primary'>{toolName}</span></p>
                    <p className='text-lg'>Total Quantity: <span className='text-primary'>{quantity}</span></p>
                    <p className='text-lg'>Total Price: <span className='text-primary'>{totalPrice}</span></p>
                    <p className='text-lg'>Status: <span className='text-primary font-semibold text-3xl'>{status}</span></p>
                </div>
                <div className="card-actions justify-end">
                    {status === 'pending' && <button
                        onClick={() => handleShipOrder(_id)}
                        className="btn btn-primary btn-sm">Ship Order</button>}
                    {status === 'unpaid' && <label
                        onClick={() => setDeletingOrder(order)}
                        for="delete-order-modal" className="btn btn-error btn-sm">Delete Order</label>}
                </div>
            </div>
        </div>
    );
};

export default Order;