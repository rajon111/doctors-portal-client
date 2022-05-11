import React from 'react';
import Footer from '../Shared/Footer';
import Banner from './Banner';
import DentalCare from './DentalCare';
import Info from './Info';
import MakeAppointment from './MakeAppoinment';
import Services from './Services';
import Testimonials from './Testimonials';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Info></Info>
            <Services></Services>
            <DentalCare></DentalCare>
            <MakeAppointment></MakeAppointment>
            <Testimonials></Testimonials>
            <Footer></Footer>
        </div>
    );
};

export default Home;