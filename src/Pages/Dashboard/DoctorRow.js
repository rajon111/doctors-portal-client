import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({doctor,index , refetch ,setDeletingDoctor}) => {
    const {name,img,specialty, email} =doctor
    
    const handleDelete = email =>{
        fetch(`http://localhost:5000/doctor/${email}`,{
            method:'DELETE',
            headers:{
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => res.json())
        .then(data =>{
            console.log(data);
            if(data.deletedCount){
                toast.success(`Doctor ${name} is deleted .`)
                refetch()
            }
        })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td><div className='avatar'>
                <div className='w-20 rounded'>
                   <img src={img} alt="" /> 
                </div>
                </div></td>
            <td> {name}</td>
            <td> {specialty}</td>

            <td>
                {/* modal */}
                <label onClick={ ()=>setDeletingDoctor(doctor)} for="delete-confirm-modal" class="btn btn-xs btn-error">DELETE</label>

                <button onClick={()=> handleDelete(email)} className='btn btn-xs btn-error'>Delete</button>
            </td>
        </tr>
    );
};

export default DoctorRow;