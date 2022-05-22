import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Reviews from './Reviews';
import Tools from './Tools';

const Landing = () => {
    return (
        <div className='flex flex-col gap-24'>
            <Banner />
            <Tools />
            <BusinessSummary />
            <Reviews />
        </div>
    );
};

export default Landing;