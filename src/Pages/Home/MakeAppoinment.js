import React from 'react';
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section style={{ background: `url(${ appointment })` }} className='flex justify-center items-center'>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-200px]' src={doctor} alt="" />
            </div>
            <div className='flex-1 px-5'>
                <h3 className='text-xl text-primary font-bold'>Appointment</h3>
                <h2 className='text-3xl text-white py-2'>Make an Appointment Today</h2>
                <p className=' text-white py-4'>
                    For patients travelling or wanting to travel to Bangkok, Thailand to visit Bumrungrad International Hospital for Medical Treatment or a checkup. For patients in need of emergency medical treatment at the Hospital and requires assistance to get to Bumrungrad from outside Bangkok (from most places in the world), we can help quickly.
                </p>
                <PrimaryButton>Get Started</PrimaryButton>
            </div>

        </section>
    );
};

export default MakeAppointment;