import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllHospitals } from 'features/slices/hospitalSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LocationMarkerIcon } from "@heroicons/react/outline"

function Hospitals() {
    const dispatch = useAppDispatch();
    const hospitals = useAppSelector((state) => state.hospitals.hospitals);


    useEffect(() => {
        dispatch(getAllHospitals());
    }, [])

    return (
        <div className=" flex flex-col items-start justify-start w-full" >
            <div className="">
                <h5 className="text-sm text-gray-400 font-semibold mb-3">
                    Trang chủ / Hệ thống bệnh viện, phòng khám
                </h5>
                <h2 className="text-2xl text-gray-800 font-bold">
                    Danh sách các hệ thống bệnh viện, phòng khám mà chúng tôi cung cấp
                </h2>
            </div>
            <div className="mt-4 mb-6">
                <hr />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {hospitals?.map((hospital, index) => {
                    return (
                        <div className="focus:outline-none w-full lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded mt-4" key={index}>
                            <div className="flex items-center border-b border-gray-200 pb-6">
                                <img src={hospital?.imageUrl && hospital.imageUrl[0]} alt="imageUrl" className="w-40 h-40 rounded-sm" />
                                <div className="flex items-start justify-between w-full">
                                    <div className="pl-3 w-full text-indigo-500 mx-4">
                                        <p className="focus:outline-none text-xl font-medium leading-5">Bệnh viện {hospital?.hospitalName}</p>
                                        <div className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 flex">
                                            <LocationMarkerIcon className='w-4 h-4' />
                                            <p>
                                                {hospital?.address}
                                            </p>
                                        </div>
                                    </div>
                                    <div role="img" aria-label="bookmark">
                                        <svg className="focus:outline-none" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="#2C3E50" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2">
                                <p className="focus:outline-none text-sm leading-5 py-4 text-gray-600">{hospital?.description?.slice(0, 200)}...</p>
                                <div className="flex justify-between items-center">
                                    <div className="focus:outline-none flex">
                                        {hospital?.specialities?.map((speciality, index) => {
                                            return (
                                                <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100" key={index}>{speciality}</div>
                                            )
                                        })}
                                    </div>
                                    <div className="focus:outline-none flex">
                                        <Link to={`/hospitals/${hospital?.id}`} className="py-2 px-4 text-xs ml-10 leading-3 text-white rounded-full bg-indigo-700">Xem thêm</Link>
                                    </div>
                                </div>
                            </div>
                        </div >
                    )
                })
                }
            </div>
        </div >
    );
}

export default Hospitals;