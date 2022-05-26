import React, { useState } from 'react';
import { useQuery } from 'react-query';
import LoadingSpinner from '../../Shared/LoadingSpinner';
import DeleteToolModal from './DeleteToolModal';
import ToolRow from './ToolRow';

const ManageTools = () => {
    const [deletingTool, setDeletingTool] = useState(null);
    const { data: allTools, isLoading, refetch } = useQuery('all-tools', () => fetch('http://localhost:5000/all-tools')
        .then(res => res.json()));
    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div class="overflow-x-auto w-full">
            <table class="table w-full">
                <thead>
                    <tr>
                        <td></td>
                        <th>Name</th>
                        <th>Information</th>
                        <th>Price(pp)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allTools.map((tool, index) => <ToolRow
                            key={tool._id}
                            tool={tool}
                            index={index}
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