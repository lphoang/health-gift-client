import React from 'react';
import { formatDay } from 'utils/helpers';

function Overview({ doctor, certificates }: any) {
    return (
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
                <div className="text-gray-700">
                    <div className="grid md:grid-cols-2 text-sm">
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Họ</div>
                            <div className="px-4 py-2">{doctor?.appUser?.firstName}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Tên</div>
                            <div className="px-4 py-2">{doctor?.appUser?.lastName}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Giới tính</div>
                            <div className="px-4 py-2">{doctor?.appUser?.enabled ? "Nam" : "Nữ"}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Số điện thoại</div>
                            <div className="px-4 py-2">{doctor?.appUser?.phoneNumber}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Địa chỉ làm việc</div>
                            <div className="px-4 py-2">{doctor?.hospital?.address}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Địa chỉ nhà</div>
                            <div className="px-4 py-2">{doctor?.appUser?.address}</div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Email.</div>
                            <div className="px-4 py-2">
                                <a className="text-blue-800" href={`mailto:${doctor?.appUser?.email}`}>{doctor?.appUser?.email}</a>
                            </div>
                        </div>
                        <div className="grid grid-cols-2">
                            <div className="px-4 py-2 font-semibold">Ngày sinh</div>
                            <div className="px-4 py-2">{formatDay(doctor?.appUser?.birthDate)}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-4"></div>

            <div className="bg-white p-3 shadow-sm rounded-sm">

                <div className="grid grid-cols-2">
                    <div>
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span className="text-indigo-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </span>
                            <span className="tracking-wide">Kinh nghiệm</span>
                        </div>
                        <ul className="list-inside space-y-2">
                            <li>
                                <div className="text-teal-600">Lorem, ipsum dolor.</div>
                                <div className="text-gray-500 text-xs">March 2020 - Now</div>
                            </li>
                            <li>
                                <div className="text-teal-600">Lorem, ipsum dolor.</div>
                                <div className="text-gray-500 text-xs">March 2020 - Now</div>
                            </li>
                            <li>
                                <div className="text-teal-600">Lorem, ipsum dolor.</div>
                                <div className="text-gray-500 text-xs">March 2020 - Now</div>
                            </li>
                            <li>
                                <div className="text-teal-600">Lorem, ipsum dolor.</div>
                                <div className="text-gray-500 text-xs">March 2020 - Now</div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                            <span className="text-indigo-500">
                                <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path fill="#fff"
                                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </span>
                            <span className="tracking-wide">Học vấn</span>
                        </div>
                        <ul className="list-inside space-y-2">
                            {certificates?.map((certificate: any, index: number) => {
                                return (
                                    <li key={index}>
                                        <div className="text-teal-600">{certificate.name}</div>
                                        <div className="text-gray-500 text-xs">{certificate.issuedOn ? formatDay(certificate.issuedOn) : formatDay([2012, 10, 10])} - Now</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Overview;