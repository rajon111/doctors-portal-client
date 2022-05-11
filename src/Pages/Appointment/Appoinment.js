import React, { useState } from 'react';
import Footer from '../Shared/Footer';
import AppointmentBanner from './AppointmentBanner';
import AvailableApointments from './AvailableApointments';

const Appointment = () => {
    const [date, setDate] = useState(new Date())

    return (
        <div>
            <AppointmentBanner date={date} setDate={setDate}></AppointmentBanner>
            <AvailableApointments date={date} setDate={setDate}></AvailableApointments>
            <Footer></Footer>
        </div>
    );
};

export default Appointment;