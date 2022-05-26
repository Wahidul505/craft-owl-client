import React from 'react';
import { signOut } from 'firebase/auth';
import auth from '../../../firebase.init';
import toast from 'react-hot-toast';

const DeleteToolModal = ({ deletingTool, setDeletingTool, refetch }) => {
    const { _id, name, image, price, availableQuantity } = deletingTool;
    // delete tool handler 
    const handleDeleteTool = (id) => {
        fetch(`https://craft-owl.herokuapp.com/tool/${id}`, {
            method: 'DELETE',
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
        }).then(data => {
            if (data.deletedCount) {
                toast('Tool has been Deleted',
                    {
                        icon: '💨',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                        id: 'toolDeleted'
                    }
                );
            }
            setDeletingTool(null);
            refetch();
        });
    }
    return (
        <div>
            <input type="checkbox" id="delete-tool-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Confirm the Deletion of:</h3>
                    <div className='flex gap-3 my-6'>
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={image} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>
                        <div>
                            <div className="text-2xl text-error">{name}</div>
                        </div>
                    </div>
                    <p>With Quantity of: <span className='text-error'>{availableQuantity}</span></p>
                    <p>And Price: <span className='text-error'>${price}</span></p>
                    <div className="modal-action">
                        <button
                            onClick={() => handleDeleteTool(_id)}
                            className='btn btn-error'>Delete</button>
                        <label for="delete-tool-modal" className="btn">Cancel</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default DeleteToolModal;