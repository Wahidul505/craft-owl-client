import React from 'react';

const MyPortfolio = () => {
    return (
        <div className='mt-36 text-lg'>
            <div className='bg-base-200 rounded-lg p-6'>
                <h1 className='text-primary text-5xl'>Wahidul Alam</h1>
                <p className='text-xl mt-2 ml-1'>wahidul505@gmail.com</p>
                <div className='mt-12'>
                    <div>
                        <p className='text-2xl font-semibold'>Education: </p>
                        <hr className='border-t-2 border-black' />
                        <p><span className='font-semibold'>Subject:</span> BSc in Computer and Communication Engineering</p>
                        <p><span className='font-semibold'>Duration:</span> 3 Years (running)</p>
                        <p><span className='font-semibold'>Institute:</span> International Islamic University Chittagong</p>
                    </div>
                    <div className='mt-8'>
                        <p className='text-2xl font-semibold'>Skills:</p>
                        <hr className='border-t-2 border-black' />
                        <p><span className='font-semibold'>Hard skills:</span> Html, CSS, JavaScript, ES6, REST API, React Js, React Router, Firebase Auth, Bootstrap, Tailwind</p>
                        <p><span className='font-semibold'>Soft skills:</span> Express Js, MongoDB, Github, React hook form, React Query, Axios, Netlify, Heroku</p>
                        <p><span className='font-semibold'>Tools:</span> VS code, Node js, Figma, Browser Dev tool, Postman</p>
                    </div>
                    <div className='mt-8'>
                        <p className='text-2xl font-semibold'>Projects:</p>
                        <hr className='border-t-2 border-black' />
                        <div className='flex flex-col md:flex-row gap-4 items-center py-6'>
                            {/* agronomy  */}
                            <p>
                                <a target="_blank" href="https://agronomy-abb73.web.app/" rel="noreferrer">
                                    <img className='w-36' src="https://i.ibb.co/W59qgww/agronomy-01-2-1.png" alt="" />
                                </a>
                            </p>
                            <div className="divider lg:divider-horizontal"></div> 
                            {/* wild wanderer  */}
                            <p className='text-3xl font-serif'>
                                <a target="_blank" href="https://wild-wanderer-b161c.web.app/" rel="noreferrer">
                                    Wild Wanderer
                                </a>
                            </p>
                            <div className="divider lg:divider-horizontal"></div> 
                            {/* something  */}
                            <p className='text-3xl font-mono'>
                                <a target="_blank" href="https://something-b5b77.firebaseapp.com/" rel="noreferrer">
                                    Something
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyPortfolio;