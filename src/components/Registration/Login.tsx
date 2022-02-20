import { Dialog } from '@headlessui/react'
import { LockClosedIcon } from '@heroicons/react/solid'
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import ApiState from 'components/Global/ApiState';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { authLogin, selectApiState, selectIsLogged } from 'features/slices/authSlice';

function Login() {
    const apiState = useAppSelector(selectApiState);
    const isLogged = useAppSelector(selectIsLogged);
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Health Gift | Đăng nhập`
    });

    useEffect(() => {
        isLogged && navigate('/')
    }, [navigate, isLogged])

    function handleSubmit(e: any) {
        e.preventDefault();
        console.log("Trying to login", { email, password });
        dispatch(authLogin({ email, password }));
    }

    return (
        <div className="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full mx-5">
                    <Dialog.Title as="h3" className="text-center text-lg leading-6 font-medium text-gray-900">
                        Đăng nhập
                    </Dialog.Title>
                    <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left md:mb-0 pr-4" htmlFor="email">
                                        Email
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="email" type="email" placeholder="Email" required
                                        value={email}
                                        onChange={
                                            (e) => setEmail(e.target.value)
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
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="password" type="password" placeholder="Mật khẩu" required
                                        value={password}
                                        onChange={
                                            (e) => setPassword(e.target.value)
                                        } />
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Ghi nhớ
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Quên mật khẩu?
                                </Link>
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
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
}

export default Login;