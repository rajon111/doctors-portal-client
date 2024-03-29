import { format } from 'date-fns';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { toast } from 'react-toastify';

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
    const { _id,name, slots } = treatment;
    const [user,loading] = useAuthState(auth)
    const formattedDate = format(date, 'PP')

    const handleBooking = event => {
        event.preventDefault();
        const slot = event.target.slot.value
        console.log(slot);

        const booking = {
            treatmentId:_id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: user.displayName,
            phone: event.target.phone.value

        }
        fetch('http://localhost:5000/booking',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                toast(`Appointment is set ${formattedDate} at ${slot}`)
            }
            else{
                toast.error(`Alreay have an appointment on ${data.booking?.date} at ${data.booking?.slot}`)
            }
            refetch()
            setTreatment(null)
        })
        
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal-6" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary text-center mb-2">Booking for: {name}</h3>

                    <form onSubmit={handleBooking} className='grid justify-items-center gap-3 grid-cols-1 mt-2'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot,index) => <option value={slot} key={index}>{slot}</option>)
                            }

                        </select>
                        <input type="text" name='name' disabled value={user?.displayName || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' disabled value={user?.email || ''} className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="phone Number" className="input input-bordered w-full max-w-xs" />
                        <input type="submit" value="submit" className="btn btn-secondary w-full max-w-xs" />
                    </form>

                </div>
            </div>
        </div>
    );
};

export default BookingModal; 