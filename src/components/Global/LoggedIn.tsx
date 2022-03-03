import React, { Fragment } from 'react';
import { LogoutIcon, CalendarIcon, UserIcon } from '@heroicons/react/outline';
import { Menu, Transition } from '@headlessui/react'
import { Link } from "react-router-dom"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

function LoggedIn({ user }: any) {
    return (
        <Menu as="div" className="relative inline-block text-left z-50">
            <div>
                <Menu.Button className="inline-flex justify-center rounded-full border border-gray-300 shadow-sm p-2 bg-white text-sm font-medium text-gray-700 border-transparent focus:bg-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
                    <UserIcon className="w-4 h-4" />
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={`/${user?.role === "PATIENT" ? "user" : "doc"}`}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex p-2 text-sm'
                                    )}
                                >
                                    <img
                                        src={user?.avatar ? user.avatar : "https://source.unsplash.com/random"}
                                        alt="avatar"
                                        className="w-12 h-12 object-cover rounded-full mr-2" />
                                    <p className="font-semibold p-2">
                                        {user?.firstName}
                                        <br />
                                        <span className="font-normal">
                                            Trang cá nhân
                                        </span>
                                    </p>
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to={`/${user?.role === "PATIENT" ? "user" : "doc"}/calendar`}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm'
                                    )}
                                >
                                    <CalendarIcon
                                        className="mr-3 w-4 h-4"
                                    />
                                    Lịch khám
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/logout"
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'flex px-4 py-2 text-sm'
                                    )}
                                >
                                    <LogoutIcon className="mr-3 w-4 h-4" />
                                    Đăng xuất
                                </Link>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default LoggedIn;