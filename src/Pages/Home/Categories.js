import React from 'react';
import CategoryCard from './CategoryCard';

const Categories = () => {
    const categories = [
        { id: 1, name: 'Art Tools', image: 'https://i.ibb.co/Nxyj63h/olia-gozha-h2-QUa-Iqh-K64-unsplash-1.jpg' },
        { id: 2, name: 'Paint Tools', image: 'https://i.ibb.co/f0rv6kw/rhondak-native-florida-folk-arti.jpg' },
        { id: 3, name: 'Craft Tools', image: 'https://i.ibb.co/3pgrFGx/jo-szczepanska-9-OKGEVJi-TKk-unspl.jpg' },
    ]
    return (
        <div>
            <h1 className='text-center text-primary text-4xl mb-6'>Categories</h1>
            <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
                {
                    categories.map(category => <CategoryCard
                        key={category.id}
                        category={category}
                    />)
                }
            </div>
        </div>
    );
};

export default Categories;