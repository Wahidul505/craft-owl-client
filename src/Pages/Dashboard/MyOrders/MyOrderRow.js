import React from 'react';

const MyOrderRow = ({ order, index, setCancelingOrder }) => {
    const { toolName, quantity, totalPrice, status } = order;
    return (
        <tr>
            <th>{index + 1}</th>
            <td className='text-primary'>{toolName}</td>
            <td>{quantity}</td>
            <td>$ <span className='text-primary'>{totalPrice}</span></td>
            <td>
                {status === 'pending' ?
                    <>
                        <button className='btn btn-sm btn-accent mr-2'>Pay</button>
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