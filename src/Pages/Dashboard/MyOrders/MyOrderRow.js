import React from 'react';
import { useNavigate } from 'react-router-dom';

const MyOrderRow = ({ order, index, setCancelingOrder }) => {
    const { _id, toolName, quantity, totalPrice, status, transactionId } = order;
    const navigate = useNavigate();
    return (
        <tr>
            <td>{index + 1}</td>
            <td className='text-primary'>{toolName}</td>
            <td>{quantity}</td>
            <td>$ <span className='text-primary'>{totalPrice}</span></td>
            <td>
                {status === 'unpaid' &&
                    <>
                        <button
                            onClick={() => navigate(`/payment/${_id}`)}
                            className='btn btn-sm btn-accent mr-2'>Pay</button>
                        <label
                            onClick={() => setCancelingOrder(order)}
                            for="canceling-order-modal" className="btn btn-sm btn-error lowercase">Cancel</label>
                    </>
                }
                {status === 'pending' &&
                    <>
                        <p className='text-primary badge text-base'>Paid</p>
                        <p>Transaction Id:</p>
                        <p className='text-secondary'>{transactionId}</p>
                    </>
                }
                {status === 'shipped' &&
                    <>
                        <p className='text-primary badge text-base'>Shipped</p>
                        <p>Transaction Id:</p>
                        <p className='text-secondary'>{transactionId}</p>
                    </>
                }
            </td>
        </tr >
    );
};

export default MyOrderRow;