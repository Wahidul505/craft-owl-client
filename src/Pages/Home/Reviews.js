import React from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../Shared/LoadingSpinner';
import ReviewCard from './ReviewCard';

const Reviews = () => {
    const { data: reviews, isLoading } = useQuery('reviews', () => fetch('https://craft-owl.onrender.com/review')
        .then(res => res.json()));

    if (isLoading) {
        return <LoadingSpinner />
    };

    return (
        <div>
            <div className='divider text-xl text-primary'>Scroll Down</div>
            <div className='divider mb-8 text-primary text-3xl'>To See Reviews</div>
            <div className="h-[500px] carousel carousel-vertical rounded-box p-6 bg-base-200">
                {
                    reviews.map(review => <ReviewCard
                        key={review._id}
                        review={review}
                    />)
                }
            </div>
        </div>
    );
};

export default Reviews;