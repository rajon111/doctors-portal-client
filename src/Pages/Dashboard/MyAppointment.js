import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointment = () => {
    const [appoientments, setAppointments] = useState([])

    const [user] = useAuthState(auth)

    useEffect(() => {
        fetch(`http://localhost:5000/booking?patient=${ user.email }`)
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setAppointments(data)
            })
    }, [user])
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