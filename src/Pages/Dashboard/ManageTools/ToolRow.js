import React from 'react';

const ToolRow = ({ tool, setDeletingTool }) => {
    const { name, image, description, availableQuantity, minimumOrderQuantity, price } = tool;
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div title={description} className="text-sm opacity-50">{description.slice(0, 20)}</div>
                    </div>
                </div>
            </td>
            <td className='text-sm'>
                <p className="">Available In Stock: <br /> {availableQuantity}</p>
                <br />
                <p className="">Minimum Order Quantity: <br /> {minimumOrderQuantity}</p>
            </td>
            <td className='text-xl'>${price}</td>
            <th>
                <label
                    onClick={() => setDeletingTool(tool)}
                    for="delete-tool-modal" className="btn btn-xs btn-error">Delete</label>
            </th>
        </tr>
    );
};

export default ToolRow;