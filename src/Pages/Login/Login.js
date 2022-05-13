import React from 'react';
import { useSignInWithGoogle,useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router-dom';

const Login = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data)
        signInWithEmailAndPassword(data.email, data.password)
    };

    if( gloading || loading){
        return <Loading></Loading>
    }

    let signInError;

    if (user || guser) {
        console.log(user);
    }

    if(gerror || error){
        signInError = <p className='text-red-500'> <small>{gerror?.message || error?.message}</small></p>
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center font-bold text-xl">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Email</span>
                                
                            </label>
                            <input
                                {...register("email", {
                                    required:{
                                        value:true,
                                        message: 'email is required'
                                    },
                                    pattern: {
                                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                      message: 'provide a valid email'
                                    }
                                  } )}
                                type="email" 
                                placeholder="Your Email" 
                                class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                            {errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Password</span>
                                
                            </label>
                            <input
                                {...register("password", {
                                    required:{
                                        value:true,
                                        message: 'password is required'
                                    },
                                    minLength: {
                                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                      message: 'Must be 6 charecters or longer'
                                    }
                                  } )}
                                type="passord" 
                                placeholder="password" 
                                class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                            {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>


                       
                        {signInError}
                        <input className='btn w-full max-w-xs text-white' value='login' type="submit" />
                        <p><small>New to Doctors Portal ? <Link to='/signup' className='text-primary'>Create New Account</Link> </small></p>
                    </form>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className='btn btn-outline'>Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default Login;