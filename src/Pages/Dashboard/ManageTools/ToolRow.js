import React from 'react';

const ToolRow = ({ tool, setDeletingTool }) => {
    const { name, image, description, availableQuantity, minimumOrderQuantity, price } = tool;
    return (
        <tr>
            <td>
                <div class="flex items-center space-x-3">
                    <div class="avatar">
                        <div class="mask mask-squircle w-12 h-12">
                            <img src={image} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div class="font-bold">{name}</div>
                        <div title={description} class="text-sm opacity-50">{description.slice(0, 20)}</div>
                    </div>
                </div>
            </td>
            <td className='text-sm'>
                <p class="">Available In Stock: <br /> {availableQuantity}</p>
                <br />
                <p class="">Minimum Order Quantity: <br /> {minimumOrderQuantity}</p>
            </td>
            <td className='text-xl'>${price}</td>
            <th>
                <label
                    onClick={() => setDeletingTool(tool)}
                    for="delete-tool-modal" class="btn btn-xs btn-error">Delete</label>
            </th>
        </tr>
    );
};

export default ToolRow;