import { Dialog } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ApiState from 'components/Global/ApiState';
import { authRegister, emptyError, selectApiState } from 'features/slices/authSlice';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"
import { Role } from 'utils/types';

function Register() {
    const apiState = useAppSelector(selectApiState);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        appRole: Role[Role.USER]
    })
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Health Gift | Đăng ký`
        emptyError(dispatch);
    }, []);

    useEffect(() => {
        apiState.isSuccess && navigate('/');
    }, [apiState.isSuccess, navigate])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Trying to register", user);
        dispatch(authRegister(user));
    }

    return (
        <div className="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full mx-5">
                    <Dialog.Title as="h3" className="text-center text-lg leading-6 font-medium text-gray-900">
                        Tạo tài khoản
                    </Dialog.Title>
                    <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left md:mb-0 pr-4" htmlFor="email">
                                        Email
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="email" placeholder="Email" required
                                        value={user.email}
                                        onChange={
                                            (e) => setUser({
                                                ...user, email: e.target.value
                                            })
                                        } />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left md:mb-0 pr-4" htmlFor="password">
                                        Mật khẩu
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="password" placeholder="Mật khẩu" required value={user.password}
                                        onChange={
                                            (e) => setUser({
                                                ...user, password: e.target.value
                                            })
                                        } />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left md:mb-0 pr-4" htmlFor="firstName">
                                        Họ
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Họ" required
                                        value={user.firstName}
                                        onChange={
                                            (e) => setUser({
                                                ...user, firstName: e.target.value
                                            })
                                        } />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left md:mb-0 pr-4" htmlFor="lastName">
                                        Tên
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text" placeholder="Tên" required
                                        value={user.lastName}
                                        onChange={
                                            (e) => setUser({
                                                ...user, lastName: e.target.value
                                            })
                                        } />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left md:mb-0 pr-4" htmlFor="role">
                                        Bạn là?
                                    </label>
                                </div>
                                <div className="md:w-2/3 relative inline-flex self-center">
                                    <svg className="text-white bg-purple-700 absolute top-0 right-0 m-2 pointer-events-none p-2 rounded" xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 38 22" version="1.1">
                                        <title>F09B337F-81F6-41AC-8924-EC55BA135736</title>
                                        <g id="ZahnhelferDE—Design" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <g id="ZahnhelferDE–Icon&amp;Asset-Download" transform="translate(-539.000000, -199.000000)" fill="#ffffff" fillRule="nonzero">
                                                <g id="Icon-/-ArrowRight-Copy-2" transform="translate(538.000000, 183.521208)">
                                                    <polygon id="Path-Copy" transform="translate(20.000000, 18.384776) rotate(135.000000) translate(-20.000000, -18.384776) " points="33 5.38477631 33 31.3847763 29 31.3847763 28.999 9.38379168 7 9.38477631 7 5.38477631" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    <select className="text-md font-bold rounded border-2 border-indigo-700 text-gray-600 h-14 w-60 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none"
                                        value={user.appRole}
                                        onChange={
                                            (e) => setUser({
                                                ...user, appRole: e.target.value
                                            })
                                        }>
                                        <option value={Role[Role.USER]}>Bệnh nhân</option>
                                        <option value={Role[Role.DOCTOR]}>Bác sĩ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <ApiState {...apiState} />
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                </span>
                                Đăng ký
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;