import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getHospital } from 'features/slices/hospitalSlice';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formatToDate } from 'utils/helpers';
import { LocationMarkerIcon } from '@heroicons/react/outline';

function Hospital() {
    const dispatch = useAppDispatch();
    const doctors = useAppSelector((state) => state.doctors?.doctors);
    const hospital = useAppSelector((state) => state.hospitals?.hospital);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getHospital(id));
    }, [])

    return (
        <div>
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-indigo-400">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src={hospital?.imageUrl ? hospital?.imageUrl[0] : "https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"}
                                    alt="" />
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">Bệnh viện {hospital?.hospitalName}</h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6"><LocationMarkerIcon className='w-4 h-4' />
                                <p>
                                    {hospital?.address}
                                </p></h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                consectetur adipisicing elit.
                                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Trạng thái</span>
                                    <span className="ml-auto"><span
                                        className="bg-indigo-500 py-1 px-2 rounded text-white text-sm">Đang hoạt động</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Được khánh thành từ</span>
                                    <span className="ml-auto">{formatToDate(hospital?.since)}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-indigo-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">Giới thiệu</span>
                            </div>
                            <ul className="bg-indigo-50 text-base py-5 px-12 font-light m-5 list-disc">
                                {hospital?.description?.split(".").filter(d => d !== "")?.map((des, index) => {
                                    return (
                                        <li key={index}>{des}.</li>
                                    )
                                })}
                            </ul>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Tên bệnh viện</div>
                                        <div className="px-4 py-2">{hospital?.hospitalName}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Địa chỉ</div>
                                        <div className="px-4 py-2">{hospital?.address}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Số điện thoại</div>
                                        <div className="px-4 py-2">{hospital?.contactPhoneNumber}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800" href={`mailto:example@healthgift.com`}>example@healthgift.com</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Được khánh thành từ</div>
                                        <div className="px-4 py-2">{hospital?.since}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <button
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                                    Đội ngũ nhân viên</button>
                            </div>
                        </div>
                        <div className="my-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hospital;

function getAllDoctors(id: any): any {
    throw new Error('Function not implemented.');
}
