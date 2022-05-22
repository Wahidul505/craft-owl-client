import React from 'react';
import { GiPaintRoller } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { MdReviews } from 'react-icons/md';


const BusinessSummary = () => {
    return (
        <div>
            <div className='divider text-3xl text-primary'>What's Good About</div>
            <div className='divider mb-8 text-primary text-3xl'>Craft Owl</div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div className='text-primary text-3xl flex flex-col items-center p-6 shadow-xl rounded-xl bg-base-200
                    '>
                    <GiPaintRoller className='text-8xl' />
                    <p className='text-accent font-semibold'>334+</p>
                    <p>Different Products</p>
                </div>
                <div className='text-primary text-3xl flex flex-col items-center p-6 shadow-xl rounded-xl bg-base-200
                    '>
                    <IoIosPeople className='text-8xl' />
                    <p className='text-accent font-semibold'>780+</p>
                    <p>Satisfied Buyer</p>
                </div>
                <div className='text-primary text-3xl flex flex-col items-center p-6 shadow-xl rounded-xl bg-base-200
                    '>
                    <MdReviews className='text-8xl' />
                    <p className='text-accent font-semibold'>500+</p>
                    <p>Good Review</p>
                </div>
            </div>
        </div>
    );
};

export default BusinessSummary;