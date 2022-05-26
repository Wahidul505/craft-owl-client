import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import LoadingSpinner from '../Shared/LoadingSpinner';
import GoogleSignIn from './GoogleSignIn';
import useToken from '../../hooks/useToken';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [token] = useToken(user);

    useEffect(() => {
        if (token) {
            toast.success('Logged In', { id: 'loginSuccess' });
            reset();
            navigate(from, { replace: true });
        }
        if (error) {
            toast.error(error?.code?.slice(5, error.code.length), { id: 'loginError' });
        }
    }, [token, reset, error, navigate, from]);

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    };
    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div className='mt-48 w-5/6 md:w-1/2 lg:w-2/5 mx-auto card flex-shrink-0 shadow-2xl bg-base-100'>
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-center text-2xl text-primary mb-6'>Login to Your Account</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Email</span>
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
                            type="email" placeholder="email" name='email' className="input input-bordered text-lg" />

                        {errors.email?.type === 'required' && <small className='text-red-500'>{errors.email.message}</small>}
                        {errors.email?.type === 'pattern' && <small className='text-red-500'>{errors.email.message}</small>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-xl">Password</span>
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
                            type="password" placeholder="password" name='password' className="input input-bordered text-lg" />

                        {errors.password?.type === 'required' && <small className='text-red-500'>{errors.password.message}</small>}
                        {errors.password?.type === 'pattern' && <small className='text-red-500'>{errors.password.message}</small>}
                        <label className="label">
                            <p>New to Craft Owl? <Link to='/register' className='underline text-secondary'>Create an Account</Link></p>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className='btn btn-primary'>Login</button>
                    </div>
                </form>
                <GoogleSignIn />
            </div>
        </div>
    );
};

export default Login;
