import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div
            className='bg-no-repeat bg-cover -mx-10'
            style={{ backgroundImage: "url('https://i.ibb.co/Mh5HcVf/hand-painted-watercolor-backgrou.jpg')" }}
        >
            <div className="hero">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img src="https://i.ibb.co/XCx5GdD/laura-adai-s6-U7-Gq93-UU8-unsplash-1-removebg-preview.png" alt='' />
                    <div className='text-gray-800'>
                        <h1
                            data-aos="flip-down"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="500"
                            className="text-5xl font-bold">Be a Craft Owl Buyer</h1>
                        <p
                            data-aos="flip-down"
                            data-aos-offset="300"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000"
                            className="py-6 text-xl">Welcome to Our Manufacturing website. We encourage you to visit our site and be a part of our Company. We supply Art, Paint and Craft Tools.</p>
                        <button
                            onClick={() => navigate('/tools')}
                            className="btn btn-primary">Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;