import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom'
import auth from '../../firebase.init';

const MyAppointment = () => {
    const [appoientments, setAppointments] = useState([])

    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/booking?patient=${ user.email }`,{
            method:'GET',
            headers:{
                'authorization' : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res =>{ 
                if(res.status === 401 || res.status ===403){
                    signOut(auth);
                    localStorage.removeItem('accessToken')
                    navigate('/')
                }
               return res.json()
            })
            .then(data => {
                // console.log(data)
                setAppointments(data)
            })
    }, [user,navigate])
    return (
        <div>
            <h2>My appointment: {appoientments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appoientments.map((a, index) =>
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>{a.patientName}</td>
                                    <td>{a.date}</td>
                                    <td>{a.slot}</td>
                                    <td>{a.treatment}</td>
                                </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default MyAppointment;