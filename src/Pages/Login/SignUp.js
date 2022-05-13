import React from 'react';
import { useSignInWithGoogle,useCreateUserWithEmailAndPassword,useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading/Loading';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [signInWithGoogle, guser, gloading, gerror] = useSignInWithGoogle(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const { register, formState: { errors }, handleSubmit } = useForm();

    if( gloading || loading || updating){
        return <Loading></Loading>
    }

    let signInError;

    if (user || guser) {
        console.log(user);
    }

    if(gerror || error || updateError){
        signInError = <p className='text-red-500'> <small>{gerror?.message || updateError.message || error?.message}</small></p>
    }

    const onSubmit = data => {
        console.log(data)
        createUserWithEmailAndPassword(data.email, data.password)
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center font-bold text-xl">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div class="form-control w-full max-w-xs">
                            <label class="label">
                                <span class="label-text">Name</span>
                                
                            </label>

                            <input
                                {...register("name", {
                                    required:{
                                        value:true,
                                        message: 'name is required'
                                    }
                                  } )}
                                type="text" 
                                placeholder="Your Name" 
                                class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                            {errors.name?.type === 'required' && <span class="label-text-alt text-red-500">{errors.name.message}</span>}
                            
                            </label>
                        </div>

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
                                type="password" 
                                placeholder="password" 
                                class="input input-bordered w-full max-w-xs" />
                            <label class="label">
                            {errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>


                       
                        {signInError}
                        <input className='btn w-full max-w-xs text-white' value='Sign Up' type="submit" />
                        <p><small>Already have an account ? <Link to='/login' className='text-primary'>Login</Link> </small></p>
                    </form>
                    <div className="divider">OR</div>
                    <button onClick={() => signInWithGoogle()} className='btn btn-outline'>Continue With Google</button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;