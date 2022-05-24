import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';

const CancelingOrderModal = ({ cancelingOrder, setCancelingOrder, refetch }) => {
    const { _id, toolName, totalPrice, quantity } = cancelingOrder;
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const email = user?.email;
    const handleCancelOrder = () => {
        fetch(`http://localhost:5000/order?id=${_id}&email=${email}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => {
            if (res.status === 401 || res.status === 403) {
                navigate('/');
                signOut(auth);
            }
            else {
                return res.json();
            }
        }).then(data => {
            if (data.acknowledged) {
                refetch();
                setCancelingOrder(null);
                toast.success("Order Canceled", { icon: '🗑', id: 'canceledOrder' });
            }
        });
    };


    return (
        <div>
            <input type="checkbox" id="canceling-order-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="font-bold text-lg">Are You sure to Cancel your Order for</h3>
                    <p class="py-4 text-lg font-semibold">{toolName} ?</p>
                    <p>Total Quantity Of: {quantity}</p>
                    <p>Total Price of: ${totalPrice}</p>
                    <div class="modal-action">
                        <label
                            onClick={handleCancelOrder}
                            for="canceling-order-modal" class="btn btn-error">Yes, Cancel Order</label>
                        <label for="canceling-order-modal" class="btn btn-accent">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CancelingOrderModal;