import React from 'react';

const Blogs = () => {
    return (
        <div className='flex flex-col gap-8 mt-36'>
            {/* blog  */}
            <div className='p-4 rounded-lg bg-base-200'>
                <h1 className='text-2xl mb-3 text-primary'>How will you improve the performance of a React Application?</h1>
                <p className='text-lg'>
                    • With ensuring not to unnecessarily re-rendering a component <br />
                    • Not to send unnecessary props to a child component from a parent component <br />
                    • Memorizing a props value that will not change by using useMemo() <br />
                    • By avoid adding extra html tags as nodes to the browser dom instead of React fragment.
                    • By giving every similar in look and different in data component a key props and implementing immutable data structure.
                </p>
            </div>
            {/* blog  */}
            <div className='p-4 rounded-lg bg-base-200'>
                <h1 className='text-2xl mb-3 text-primary'>What are the different ways to manage a state in a React application?</h1>
                <p className='text-lg'>
                    There are 4 major ways to manage a state in a React application: <br />
                    • We can manage our local state variables by using useState() and it is mostly used method.<br />
                    • Also by using useReducer() we can manage both local and global stage.<br />
                    • useContext() is the best way to manage global state.<br />
                    • By using both useState() and useEffect() we can manage the server states data. <br />
                    • By using useLocation(), useHistory() and most importantly useParams() we can manage the URL states data.
                </p>
            </div>
            {/* blog  */}
            <div className='p-4 rounded-lg bg-base-200'>
                <h1 className='text-2xl mb-3 text-primary'>How does prototypical inheritance work?</h1>
                <p className='text-lg'>
                    In JavaScript, the way properties are being shared from one object to another through chain connection, is called Prototypical Inheritance. By Prototypical Inheritance new Object can be created based on a previous object.
                </p>
            </div>
            {/* blog  */}
            <div className='p-4 rounded-lg bg-base-200'>
                <h1 className='text-2xl mb-3 text-primary'>Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts?</h1>
                <p className='text-lg'>
                    To prevent a component from re-rendering unless the variables value have changed.
                    React useState() hooks gives us two parameters. One is variable where data will be stored and another is a callback function to set the variables data. To set the variables value we have to use the callback function.
                </p>
            </div>
            {/* blog  */}
            <div className='p-4 rounded-lg bg-base-200'>
                <h1 className='text-2xl mb-3 text-primary'>You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</h1>
                <p className='text-lg'>
                    <p className='mb-2'>To implement a search function to find products by name: </p>
                    <code>
                    const function(productsArray, searchedName)&#123; <br />
                    const searchedProduct = productsArray.filter(product &#8658; product.name.toLowerCase().includes(searchedName.toLowerCase())); <br />
                    return searchedProduct; <br />
                    &#125;
                    </code>
                </p>
            </div>
        </div>
    );
};

export default Blogs;