import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ tool }) => {
    const { _id, name, image, description, minimumOrderQuantity, availableQuantity, price } = tool;
    const navigate = useNavigate();
    return (
        <div className="card lg:card-side bg-base-100 shadow-md mb-10 p-4">
            <figure><img className='h-48 rounded-lg lg:rounded-l-lg lg:rounded-r-none lg:h-full w-52' src={image} alt="Album" /></figure>
            <div className="card-body">
                <h2 className="card-title text-2xl">{name}</h2>
                <p className='text-gray-600' title={description}>{description.length > 60 ? description.slice(0, 60) + '...' : description}</p>
                <p className='text-2xl'>$ <span className='text-secondary font-semibold'>{price}</span></p>
                <p>Minimum Order Quantity: <span className="text-secondary font-semibold">{minimumOrderQuantity}</span></p>
                <p>Available Quantity: <span className="text-secondary font-semibold">{availableQuantity}</span></p>
                <div className="card-actions justify-end">
                    <button onClick={() => navigate(`/purchase/${_id}`)} className="btn btn-primary">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default ToolCard;