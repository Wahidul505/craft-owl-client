import React from 'react';

const ReviewCard = ({ review }) => {
    const { name, description, rating } = review;
    return (
        <div className="card bg-base-100 shadow-xl carousel-item mb-4">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className=" justify-end">
                    <div className="rating rating-sm">
                        {[...Array(rating).keys()].map((rating, index) => <span key={index} className="mask mask-star-2 bg-secondary h-4 w-4">
                        </span>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;