import { Dialog } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ApiState from 'components/Global/ApiState';
import { authRegister, selectApiState } from 'features/slices/authSlice';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"

function Register() {
    const apiState = useAppSelector(selectApiState);
    const dispatch = useAppDispatch();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Health Gift | Đăng ký`
    });

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