import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheapestTool = () => {
    const [cheapTool, setCheapTool] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://craft-owl.onrender.com/cheapest-tool').then(res => res.json()).then(data => setCheapTool(data[0]));
    }, []);
    return (
        <div>
            <h1 className='text-center text-primary text-4xl mb-6'>Cheapest Product On Store</h1>
            <div className="hero h-72 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${cheapTool?.image})` }}
            >
                <div className="hero-overlay bg-opacity-40"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{cheapTool?.name}</h1>
                        <p className="mb-5 text-3xl">Only For ${cheapTool.price}</p>
                        <button
                            onClick={() => navigate(`/purchase/${cheapTool?._id}`)}
                            className="btn btn-primary">Purchase Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheapestTool;