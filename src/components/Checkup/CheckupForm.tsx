import React from 'react';
import { Dialog } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'

function CheckupForm() {
    return (
        <div className="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full mx-5">
                    <Dialog.Title as="h2" className="text-center text-xl uppercase leading-6 font-medium text-gray-900">
                        Đăng ký khám và tư vấn tại Health Gift
                    </Dialog.Title>
                    <Dialog.Description as="p" className="text-center text-sm leading-6 font-medium text-gray-500">
                        Vui lòng để lại thông tin và nhu cầu của quý khách. Chúng tôi sẽ liên hệ trong thời gian sớm nhất
                    </Dialog.Description>
                    <form className="mt-8 space-y-6 w-full">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="fullName">
                                        Họ và tên
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Điền đầy đủ họ và tên" required />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="birthDay">
                                        Ngày sinh
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="date" placeholder="Ngày sinh" required />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="phoneNumber">
                                        Điện thoại
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Điện thoại" required />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="email">
                                        Email
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" placeholder="Email (Không bắt buộc)" />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="checkUpDate">
                                        Ngày khám bệnh
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="date" placeholder="Ngày khám bệnh" required />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="address">
                                        Nhu cầu khám bệnh
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="textarea" placeholder="Nhu cầu khám bệnh (Không bắt buộc)" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Gửi đơn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckupForm;