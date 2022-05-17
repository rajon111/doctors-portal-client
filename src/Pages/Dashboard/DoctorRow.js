import React from 'react';
import { toast } from 'react-toastify';

const DoctorRow = ({doctor,index , refetch ,setDeletingDoctor}) => {
    const {name,img,specialty, email} =doctor
    
    

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

                
            </td>
        </tr>
    );
};

export default DoctorRow;