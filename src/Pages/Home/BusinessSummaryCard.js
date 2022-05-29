import React from 'react';

const BusinessSummaryCard = ({ children }) => {
    return (
        <div className='text-primary text-3xl flex flex-col items-center p-6 shadow-xl rounded-xl bg-base-200
         cursor-crosshair hover:scale-110 transition-transform'>
            {children}
        </div>
    );
};

export default BusinessSummaryCard;