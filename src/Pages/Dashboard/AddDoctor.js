import React from 'react';
import { useForm } from "react-hook-form";
import { useQuery } from 'react-query'
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit,reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/service').then(res => res.json()))

    const imageStorageKey='8c0a9913c88db4043222ef9e72b3c378'

   

    const onSubmit = async (data) => {
        const image = data.image[0]
        // console.log('data', data)
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${ imageStorageKey }`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res=> res.json())
            .then(result => {
                if(result.success){
                    const img = result.data.url
                    const doctor = {
                        name : data.name,
                        email : data.email,
                        specialty : data.specialty,
                        img : img
                    }
                    // send to your DB-- series call
                    fetch('http://localhost:5000/doctor',{
                        method:'POST',
                        headers:{
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                    .then(res => res.json())
                    .then(inserted => {
                        console.log('dr inserted',inserted);
                        if(inserted.insertedId){
                            toast.success('Doctor added successfully')
                            reset()
                        }
                        else{
                            toast.error('Failed To Post')
                        }
                    })

                }
                console.log('imgbb', result);
            })

    };

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <h2 className='text-2xl'>Add a New doctor</h2>
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Name</span>

                    </label>

                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: 'name is required'
                            }
                        })}
                        type="text"
                        placeholder="Your Name"
                        className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}

                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>

                    </label>
                    <input
                        {...register("email", {
                            required: {
                                value: true,
                                message: 'email is required'
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: 'provide a valid email'
                            }
                        })}
                        type="email"
                        placeholder="Your Email"
                        className="input input-bordered w-full max-w-xs" />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>

                    <select {...register("specialty")} className='select input-bordered w-full max-w-xs'>
                        {
                            services.map(service =>
                                <option key={service._id} value={service.name}>{service.name}</option>
                            )
                        }

                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Photo</span>

                    </label>

                    <input
                        type="file"
                        className="input input-bordered w-full max-w-xs"
                        {...register("image", {
                            required: {
                                value: true,
                                message: 'image is required'
                            }
                        })}
                    />
                    <label className="label">
                        {errors.image?.type === 'required' && <span className="label-text-alt text-red-500">{errors.image.message}</span>}

                    </label>

                </div>


                <input className='btn w-full max-w-xs text-white' value='Add' type="submit" />
            </form>
        </div>
    );
};

export default AddDoctor;