import React, { useEffect, useState } from 'react';
import ToolCard from '../Home/ToolCard';

const AllTools = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('https://craft-owl.onrender.com/all-tools').then(res => res.json()).then(data => setTools(data));
    }, [])

    return (
        <div className='mt-44'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
                {
                    tools.map(tool => <ToolCard
                        key={tool._id}
                        tool={tool}
                    />)
                }
            </div>
        </div>
    );
};

export default AllTools;