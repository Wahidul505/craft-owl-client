import React, { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import DeleteToolModal from './DeleteToolModal';
import ToolRow from './ToolRow';

const ManageTools = () => {
    const [deletingTool, setDeletingTool] = useState(null);
    const { data: allTools, isLoading, refetch } = useQuery('all-tools', () => fetch('https://craft-owl.onrender.com/all-tools')
        .then(res => res.json()));
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className="overflow-x-auto w-full">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Information</th>
                        <th>Price(pp)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTools.map(tool => <ToolRow
                            key={tool._id}
                            tool={tool}
                            setDeletingTool={setDeletingTool}
                        />)
                    }
                </tbody>
            </table>
            {deletingTool && <DeleteToolModal
                deletingTool={deletingTool}
                setDeletingTool={setDeletingTool}
                refetch={refetch}
            />}
        </div>
    );
};

export default ManageTools;