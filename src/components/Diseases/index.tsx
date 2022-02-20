import React from 'react';

function Diseases() {
    return (
        <div>
            <div
                className="container mb-2 flex mx-auto w-full items-center justify-center"
            >
                <ul className="flex flex-col p-4">
                    <li className="border-gray-400 flex flex-row">
                        <div
                            className="select-none flex flex-1 items-center p-4 transition duration-500 ease-in-out transform hover:-translate-y-2 rounded-2xl border-2 hover:shadow-2xl border-indigo-400"
                        >
                            <div className="flex-1 pl-1 mr-16">
                                <div className="font-medium">
                                    Product-Based Service Based or Hybrid?
                                </div>
                            </div>
                            <div
                                className="w-1/4 text-wrap text-center flex text-white text-bold flex-col rounded-md bg-indigo-500 justify-center items-center mr-10 p-2"
                            >
                                Details
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Diseases;