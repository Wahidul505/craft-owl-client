import React from 'react';

const CategoryCard = ({category}) => {
    const {name, image} = category;
    return (
        <div class="card bg-base-100 h-52 shadow-xl image-full">
            <figure><img src={image} alt="Shoes" /></figure>
            <div class="card-body items-center">
                <h2 class="card-title text-3xl text-primary">{name}</h2>
            </div>
        </div>
    );
};

export default CategoryCard;