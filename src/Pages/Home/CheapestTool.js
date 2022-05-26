import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheapestTool = () => {
    const [cheapTool, setCheapTool] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/cheapest-tool').then(res => res.json()).then(data => setCheapTool(data[0]));
    }, []);
    return (
        <div>
            <h1 className='text-center text-primary text-4xl mb-6'>Cheapest Product On Store</h1>
            <div class="hero min-h-screen"
                style={{ backgroundImage: `url(${cheapTool?.image})` }}
            >
                <div class="hero-overlay bg-opacity-40"></div>
                <div class="hero-content text-center text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-5xl font-bold">{cheapTool?.name}</h1>
                        <p class="mb-5 text-3xl">Only For ${cheapTool.price}</p>
                        <button
                            onClick={() => navigate(`/purchase/${cheapTool?._id}`)}
                            class="btn btn-primary">Purchase Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheapestTool;