import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllDiseases } from 'features/slices/diseaseSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getFirstLetters } from 'utils/helpers';

function Diseases() {

    const dispatch = useAppDispatch();
    const diseases = useAppSelector(state => state.diseases.diseases);

    useEffect(() => {
        dispatch(getAllDiseases());
    }, [])

    const firstLetterOfDiseases = getFirstLetters(diseases);
    const alphabets = [];

    return (
        <div className="my-5">
            <div className="mx-auto">
                <h5 className="text-sm text-gray-400 font-semibold mb-3">
                    Trang chủ / Sổ tay sức khỏe / Danh sách bệnh
                </h5>
                <h2 className="text-2xl text-gray-800 font-bold">
                    Danh sách bệnh
                </h2>
            </div>
            <div className="mt-20 mb-6">
                <hr />
                <h3 className="ml-5 mt-5 text-xl text-indigo-700 font-bold">
                    Tra cứu theo chữ cái
                </h3>
            </div>
            <div className="flex flex-row justify-start items-center mx-auto w-2/3 mb-10">
                {firstLetterOfDiseases?.map((letter: string, index: number) => {
                    return (
                        <button className="group mr-5 relative w-12 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer" key={index}>
                            {letter}
                        </button>
                    )
                })}
            </div>
            <div
                className="container mb-5 flex flex-col ml-3 w-full items-start justify-center"
            >
                {firstLetterOfDiseases?.map((letter: string, index: number) => {
                    return (
                        <ul key={index} className="flex flex-col justify-between items-start mt-10 list-disc">
                            <span className="text-2xl text-indigo-900 font-bold">{letter}</span>
                            {diseases?.filter((d: any) => d.name[0] === letter)?.map((disease: any, index: number) => {
                                return (
                                    <li key={index} className="mt-2 ml-5 text-gray-600 text-md font-semibold hover:text-gray-900">
                                        <Link to={`/diseases/${disease.id}`} >
                                            {disease?.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    )
                })}
            </div>
        </div>
    );
}

export default Diseases;