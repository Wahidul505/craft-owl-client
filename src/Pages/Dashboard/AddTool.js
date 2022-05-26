import { signOut } from 'firebase/auth';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import auth from '../../firebase.init';

const clientApiKey = "bc069d2d932f220983e28cf3794a6fcd";

const AddTool = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${clientApiKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(result => {
            if (result.success) {
                const toolInfo = {
                    name: data.name,
                    description: data.description,
                    image: result.data.url,
                    availableQuantity: parseInt(data.availableQuantity),
                    minimumOrderQuantity: parseInt(data.minimumOrderQuantity),
                    price: parseFloat(data.price),
                }
                fetch('https://craft-owl.herokuapp.com/tool', {
                    headers: {
                        'content-type': 'application/json',
                        'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    method: 'POST',
                    body: JSON.stringify(toolInfo)
                }).then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                    }
                    else {
                        return res.json();
                    }
                }).then(data => {
                    toast.success('Product Added', { id: 'addSuccess' });
                    reset();
                })
            }
        })

    };
    return (
        <div className='card flex-shrink-0 shadow-2xl bg-base-100'>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-2xl text-primary mb-6'>Add A New Tool</h1>
                    {/* tool name field  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Tool Name</span>
                        </label>
                        <input
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Tool Name is Required"
                                }
                            })}
                            type="text" placeholder="Tool Name" name='name' className="input input-bordered text-lg" autoComplete='off' />

                        {errors.name?.type === 'required' && <small className='text-red-500'>{errors.name.message}</small>}
                    </div>
                    {/* description field  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Description</span>
                        </label>
                        <input
                            {...register("description", {
                                required: {
                                    value: true,
                                    message: "Description is Required"
                                }
                            })}
                            type="text" placeholder="Tool Description" name='description' className="input input-bordered text-lg" />

                        {errors.description?.type === 'required' && <small className='text-red-500'>{errors.description.message}</small>}
                    </div>
                    {/* Available Quantity field  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Available Quantity</span>
                        </label>
                        <input
                            {...register("availableQuantity", {
                                required: {
                                    value: true,
                                    message: 'Available Quantity is required'
                                },
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Please Give a Valid Number'
                                }
                            })}
                            type="text" placeholder="Available Quantity" name='availableQuantity' className="input input-bordered text-lg" />

                        {errors.availableQuantity?.type === 'required' && <small className='text-red-500'>{errors.availableQuantity.message}</small>}
                        {errors.availableQuantity?.type === 'pattern' && <small className='text-red-500'>{errors.availableQuantity.message}</small>}
                    </div>
                    {/* new form control  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Minimum Order Quantity</span>
                        </label>
                        <input
                            {...register("minimumOrderQuantity", {
                                required: {
                                    value: true,
                                    message: 'Minimum Order Quantity is required'
                                },
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Please Give a Valid Number'
                                }
                            })}
                            type="text" placeholder="Minimum Order Quantity" name='minimumOrderQuantity' className="input input-bordered text-lg" />

                        {errors.minimumOrderQuantity?.type === 'required' && <small className='text-red-500'>{errors.minimumOrderQuantity.message}</small>}
                        {errors.minimumOrderQuantity?.type === 'pattern' && <small className='text-red-500'>{errors.minimumOrderQuantity.message}</small>}
                    </div>
                    {/* new form control  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Price</span>
                        </label>
                        <input
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: 'Price is required'
                                },
                                pattern: {
                                    value: /^[0-9]*$/,
                                    message: 'Please Give a Valid Number'
                                }
                            })}
                            type="text" placeholder="Price in Dollar" name='price' className="input input-bordered text-lg" />

                        {errors.price?.type === 'required' && <small className='text-red-500'>{errors.price.message}</small>}
                        {errors.price?.type === 'pattern' && <small className='text-red-500'>{errors.price.message}</small>}
                    </div>
                    {/* Image field  */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Tool Image</span>
                        </label>
                        <input
                            {...register("image", {
                                required: {
                                    value: true,
                                    message: 'Image is required'
                                }
                            })}
                            type="file" name='image' className="input input-bordered text-lg p-1" />

                        {errors.image?.type === 'required' && <small className='text-red-500'>{errors.image.message}</small>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className='btn btn-primary'>Add Tool</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTool;