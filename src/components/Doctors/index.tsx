import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getAllDoctors } from 'features/slices/doctorSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Doctors() {
    const dispatch = useAppDispatch();
    const doctors = useAppSelector((state) => state.doctors.doctors);


    useEffect(() => {
        dispatch(getAllDoctors());
    }, [])

    return (
        <div className=" flex flex-col items-start justify-start w-full" >
            <div className="">
                <h5 className="text-sm text-gray-400 font-semibold mb-3">
                    Trang chủ / Đội ngũ bác sĩ
                </h5>
                <h2 className="text-2xl text-gray-800 font-bold">
                    Danh sách các y bác sĩ chúng tôi hiện có
                </h2>
            </div>
            <div className="mt-4 mb-6">
                <hr />
            </div>
            <div className="grid grid-cols-2 gap-4 px-10">
                {doctors?.map((doctor, index) => {
                    return (
                        <div className="focus:outline-none w-full lg:mr-4 lg:mb-0 mb-7 bg-white p-6 shadow rounded mt-4" key={index}>
                            <div className="flex items-center border-b border-gray-200 pb-6">
                                <img src={doctor?.appUser.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
                                <div className="flex items-start justify-between w-full">
                                    <div className="pl-3 w-full">
                                        <p className="focus:outline-none text-xl font-medium leading-5 text-gray-800">Bác sĩ {doctor?.appUser.firstName}{" "}{doctor?.appUser.lastName}</p>
                                        <p className="focus:outline-none text-sm leading-normal pt-2 text-gray-500">Bệnh viện {doctor?.hospital?.hospitalName}</p>
                                    </div>
                                    <div role="img" aria-label="bookmark">
                                        <svg className="focus:outline-none" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="#2C3E50" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2">
                                <p className="focus:outline-none text-sm leading-5 py-4 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda iste perferendis molestiae explicabo temporibus molestias fugiat nobis. Totam in inventore sed illo quae.</p>
                                <div className="flex justify-between items-center">
                                    <div className="flex flex-col items-start py-3">
                                        <div>
                                            {doctor?.specialities?.map((speciality, index) => {
                                                return (
                                                    <div className="py-2 px-4 text-xs m-2 leading-3 text-indigo-700 rounded-full inline-block text-center bg-indigo-100" key={index}>{speciality.name}</div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="focus:outline-none flex">
                                        <Link to={`/doctors/${doctor?.id}`} className="py-2 px-4 text-xs leading-3 block text-center text-white rounded-full bg-indigo-700">Xem thêm</Link>
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

export default Doctors;