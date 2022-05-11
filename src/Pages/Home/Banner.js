import React from 'react';
import chair from '../../assets/images/chair.png'
import PrimaryButton from '../Shared/PrimaryButton/PrimaryButton';
import banner from '../../assets/images/bg.png'

const Banner = () => {
    return (
        <div style={{background:`url(${banner})`}} className="hero min-h-screen bg-left-bottom">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src={chair} className="max-w-xl rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">Your New Smile Starts Here!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>GET STARTED</PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default Banner;