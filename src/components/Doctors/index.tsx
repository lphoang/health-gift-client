import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllDoctors } from 'features/slices/doctorSlice';
import React, { useEffect } from 'react';

function Doctors() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);

    useEffect(() => {
        dispatch(getAllDoctors);
    }, [])

    const DUMMY_VALUES = [{
        id: "1",
        doctorId: "1",
        email: "doctor1@email.com",
        avatar: "",
        firstName: "Alex",
        lastName: "Sandler",
        reviewRating: 5,
        appointments: [],
        certificates: [],
        specialists: [
            {
                specialistId: "1",
                specialistName: "Nội khoa"
            },
            {
                specialistId: "2",
                specialistName: "Nhi khoa"
            },
            {
                specialistId: "3",
                specialistName: "Phụ khoa"
            }
        ],
        reviews: []
    }]

    return (
        <div className=" lg:flex items-center justify-center w-full" >
            {
                DUMMY_VALUES?.map(doctor => {
                    return (
                        <div className="focus:outline-none lg:w-4/12 lg:mr-7 lg:mb-0 mb-7 bg-white p-6 shadow rounded" >
                            <div className="flex items-center border-b border-gray-200 pb-6">
                                <img src={doctor.avatar} alt="coin avatar" className="w-12 h-12 rounded-full" />
                                <div className="flex items-start justify-between w-full">
                                    <div className="pl-3 w-full">
                                        <p className="focus:outline-none text-xl font-medium leading-5 text-gray-800">Dogecoin nerds</p>
                                        <p className="focus:outline-none text-sm leading-normal pt-2 text-gray-500">36 members</p>
                                    </div>
                                    <div role="img" aria-label="bookmark">
                                        <svg className="focus:outline-none" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="#2C3E50" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2">
                                <p className="focus:outline-none text-sm leading-5 py-4 text-gray-600">A group of people interested in dogecoin, the currency and a bit of side for the meme and dof that we all know and love. These cases are perfectly simple and easy to distinguish.</p>
                                <div className="focus:outline-none flex">
                                    <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#dogecoin</div>
                                    <div className="py-2 px-4 ml-3 text-xs leading-3 text-indigo-700 rounded-full bg-indigo-100">#crypto</div>
                                </div>
                            </div>
                        </div >
                    )
                })
            }
        </div >
    );
}

export default Doctors;