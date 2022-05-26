import React from 'react';
import Banner from './Banner';
import BusinessSummary from './BusinessSummary';
import Categories from './Categories';
import CheapestTool from './CheapestTool';
import Reviews from './Reviews';
import Tools from './Tools';

const Landing = () => {
    return (
        <div className='flex flex-col gap-28'>
            <Banner />
            <Tools />
            <Categories />
            <BusinessSummary />
            <Reviews />
            <CheapestTool />
        </div>
    );
};

export default Landing;