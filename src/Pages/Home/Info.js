import React from 'react';
import Infocard from './Infocard';
import clock from '../../assets/icons/clock.svg'
import marker from '../../assets/icons/marker.svg'
import phone from '../../assets/icons/phone.svg'

const Info = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <Infocard cardTitle="Opening Hours" img={clock} bgClass='bg-gradient-to-r from-secondary to-primary'></Infocard>
            <Infocard cardTitle="Visit Our Location" img={marker} bgClass='bg-[#3A4256]'></Infocard>
            <Infocard cardTitle="Contact Us Now" img={phone} bgClass='bg-gradient-to-r from-secondary to-primary'></Infocard>
        </div>
    );
};

export default Info;