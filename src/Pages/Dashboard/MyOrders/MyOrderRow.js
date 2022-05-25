import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrderRow = ({ order, index, setCancelingOrder }) => {
    const { _id, toolName, quantity, totalPrice, status } = order;
    const navigate = useNavigate();
    return (
        <tr>
            <td>{index + 1}</td>
            <td className='text-primary'>{toolName}</td>
            <td>{quantity}</td>
            <td>$ <span className='text-primary'>{totalPrice}</span></td>
            <td>
                {status === 'unpaid' ?
                    <>
                        <button
                            onClick={() => navigate(`/payment/${_id}`)}
                            className='btn btn-sm btn-accent mr-2'>Pay</button>
                        <label
                            onClick={() => setCancelingOrder(order)}
                            for="canceling-order-modal" class="btn btn-sm btn-error lowercase">Cancel</label>
                    </>
                    :
                    <p className='text-secondary'>Paid</p>
                }
            </td>
        </tr>
    );
};

export default MyOrderRow;