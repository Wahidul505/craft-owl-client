import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../../firebase.init';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import CancelingOrderModal from './CancelingOrderModal';
import MyOrderRow from './MyOrderRow';

const MyOrders = () => {
    const [cancelingOrder, setCancelingOrder] = useState(null);
    const [user] = useAuthState(auth);
    const email = user?.email;
    const navigate = useNavigate();
    const { data: myOrders, isLoading, refetch } = useQuery(['myOrders', email], () => fetch(`http://localhost:5000/order/${email}`, {
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
    }));

    if (isLoading) {
        return <LoadingSpinner />
    };

    return (
        <div class="overflow-x-auto">
            <table class="table w-full">
                <thead>
                    <tr>
                        <td></td>
                        <th>Ordered for</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myOrders && myOrders.map((order, index) => <MyOrderRow
                            key={order._id}
                            order={order}
                            index={index}
                            setCancelingOrder={setCancelingOrder}
                        />)
                    }
                </tbody>
            </table>
            {cancelingOrder && <CancelingOrderModal
                cancelingOrder={cancelingOrder}
                setCancelingOrder={setCancelingOrder}
                refetch={refetch}
            />}
        </div>
    );
};

export default MyOrders;