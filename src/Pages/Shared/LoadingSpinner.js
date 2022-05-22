import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className='h-96 flex justify-center items-center'>
            <div className='animate-spin w-32 h-32 rounded-full border-t-4 border-primary'></div>
        </div>
    );
};

export default LoadingSpinner;