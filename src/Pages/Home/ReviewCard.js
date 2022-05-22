import React from 'react';

const ReviewCard = () => {
    return (
        <div class="card bg-accent shadow-xl">
            <div class="card-body">
                <h2 class="card-title">Wahidul Alam</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat alias aperiam id aut quam voluptatem placeat quibusdam, pariatur laborum perferendis, nemo obcaecati, sapiente dolor provident! Laudantium libero eos est distinctio.</p>
                <div class=" justify-end">
                    <div class="rating rating-sm">
                        <input type="radio" name="rating-7" class="mask mask-star-2 bg-secondary" disabled />
                        <input type="radio" name="rating-7" class="mask mask-star-2 bg-secondary" disabled />
                        <input type="radio" name="rating-7" class="mask mask-star-2 bg-secondary" disabled />
                        <input type="radio" name="rating-7" class="mask mask-star-2 bg-secondary" disabled />
                        <input type="radio" name="rating-7" class="mask mask-star-2 bg-secondary" disabled />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;