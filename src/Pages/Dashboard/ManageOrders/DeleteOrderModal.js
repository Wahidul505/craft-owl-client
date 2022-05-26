import { signOut } from 'firebase/auth';
import React from 'react';
import toast from 'react-hot-toast';
import auth from '../../../firebase.init';

const DeleteOrderModal = ({ deletingOrder, setDeletingOrder, refetch }) => {
    const { _id, person, email, phone, address, toolName, quantity, totalPrice, status } = deletingOrder;
    const handleDeleteOrder = id => {
        fetch(`https://craft-owl.herokuapp.com/admin/order/${id}`, {
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            method: 'DELETE'
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                signOut(auth);
            }
            else {
                return res.json();
            }
        }).then(data => {
            if (data.deletedCount) {
                toast('Order Deleted',
                    {
                        icon: '💨',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        id: 'orderDeleted'
                    }
                );
            }
            refetch();
            setDeletingOrder(null);
        })
    }
    return (
        <div>
            <input type="checkbox" id="delete-order-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <div className='bg-base-300 mt-6 rounded py-2 p-0 md:px-4 md:py-4 -mx-4 md:mx-0'>
                        <h3 className='font-semibold text-2xl'>Do you Want to Delete the order?</h3>
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
                    <div className="modal-action">
                        <button
                            onClick={() => handleDeleteOrder(_id)}
                            className='btn btn-sm btn-error'>Delete</button>
                        <label for="delete-order-modal" className="btn btn-sm">Cancel</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteOrderModal;