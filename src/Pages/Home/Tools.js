import React from 'react';
import { useQuery } from 'react-query';
import ToolCard from './ToolCard';

const Tools = () => {
    const { data: tools, isLoading } = useQuery('display-tools', () => fetch('http://localhost:5000/tool')
        .then(res => res.json()));
    if (isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            {
                tools.map(tool => <ToolCard
                    tool={tool}
                />)
            }
        </div>
    );
};

export default Tools;