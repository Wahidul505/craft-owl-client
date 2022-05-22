import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Shared/LoadingSpinner';
import GoogleSignIn from './GoogleSignIn';
import useToken from '../../hooks/useToken';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const [token] = useToken(user);

    useEffect(() => {
        if (token) {
            toast.success('Account Created', { id: 'registerSuccess' });
            reset();
            navigate('/');
        }
        if (error) {
            toast.error(error.code.slice(5, error.code.length), { id: 'registerError' });
        }
        if (updateError) {
            toast.error(updateError.code.slice(5, error.code.length), { id: 'profileUpdateError' });
        }
    }, [token, reset, error, updateError, navigate]);

    const onSubmit = async data => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };
    if (loading || updating) {
        return <LoadingSpinner />
    };

    return (
        <div className='mt-24 w-5/6 md:w-1/2 lg:w-2/5 mx-auto card flex-shrink-0 shadow-2xl bg-base-100'>
            <div class="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-2xl text-primary mb-6'>Create An Account</h1>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text text-xl">Name</span>
                        </label>
                        <input
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is Required"
                                }
                            })}
                            type="text" placeholder="name" name='name' class="input input-bordered text-lg" />

                        {errors.name?.type === 'required' && <small className='text-red-500'>{errors.name.message}</small>}
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text text-xl">Email</span>
                        </label>
                        <input
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is Required"
                                },
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "Invalid Email Address"
                                }
                            })}
                            type="email" placeholder="email" name='email' class="input input-bordered text-lg" />

                        {errors.email?.type === 'required' && <small className='text-red-500'>{errors.email.message}</small>}
                        {errors.email?.type === 'pattern' && <small className='text-red-500'>{errors.email.message}</small>}
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text text-xl">Password</span>
                        </label>
                        <input
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                    message: 'Minimum eight characters, at least one letter, one number and no Special Character'
                                }
                            })}
                            type="password" placeholder="password" name='password' class="input input-bordered text-lg" />

                        {errors.password?.type === 'required' && <small className='text-red-500'>{errors.password.message}</small>}
                        {errors.password?.type === 'pattern' && <small className='text-red-500'>{errors.password.message}</small>}
                        <label class="label">
                            <p>Already Registered? <Link to='/login' className='underline text-secondary'>Login</Link></p>
                        </label>
                    </div>
                    <div class="form-control mt-6">
                        <button type="submit" className='btn btn-primary'>Register</button>
                    </div>
                </form>
                <GoogleSignIn />
            </div>
        </div>
    );
};

export default Register;
