import React from 'react';

const ReviewCard = ({ review }) => {
    const { name, description, rating } = review;
    return (
        <div class="card bg-base-100 shadow-xl carousel-item mb-4">
            <div class="card-body">
                <h2 class="card-title">{name}</h2>
                <p>{description}</p>
                <div class=" justify-end">
                    <div class="rating rating-sm">
                        {[...Array(rating).keys()].map(rating => <span class="mask mask-star-2 bg-secondary h-4 w-4">
                        </span>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;