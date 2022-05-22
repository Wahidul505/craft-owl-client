import React from 'react';
import ReviewCard from './ReviewCard';

const Reviews = () => {
    return (
        <div>
            <h1 className='divider mb-10 text-3xl text-primary'>Buyer Reviews</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
            </div>
        </div>
    );
};

export default Reviews;