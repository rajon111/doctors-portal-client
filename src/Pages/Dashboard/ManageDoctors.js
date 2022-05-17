import React, { useState } from 'react';
import {useQuery} from 'react-query'
import Loading from  '../Shared/Loading/Loading'
import DeleteConfirmationModal from './DeleteConfirmationModal';
import DoctorRow from './DoctorRow';


const ManageDoctors =() =>{
    //modal
    const [deletingDoctor, setDeletingDoctor] = useState(null)

    const {data: doctors, isLoading, refetch} = useQuery('doctors', ()=> fetch('http://localhost:5000/doctor',{
        headers: {
           authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()))

    if(isLoading){
        return <Loading></Loading>
    }

    return(
        <div>
            <h2 className='text-2xl'>Manage Doctors: {doctors.length}</h2>

            <div class="overflow-x-auto">
                <table class="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>NO.</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor,index) =><DoctorRow key={index} doctor={doctor} index={index} refetch={refetch} 
                            setDeletingDoctor = {setDeletingDoctor}> </DoctorRow>)
                        }
                        
                    </tbody>
                </table>
            </div>
            {deletingDoctor && <DeleteConfirmationModal deletingDoctor={deletingDoctor} refetch = {refetch}
             setDeletingDoctor = {setDeletingDoctor}></DeleteConfirmationModal>}
        </div>
    )
}

export default ManageDoctors;