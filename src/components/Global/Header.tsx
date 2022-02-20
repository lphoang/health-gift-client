/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import {
    MenuIcon,
    XIcon,
} from '@heroicons/react/outline'
import Modal from '../Registration/Modal'

export default function Header() {
    const [onShowModal, setOnShowModal] = useState<boolean>(false);
    const modalProps = {
        open: onShowModal,
    }
    const handleShowModal = () => {
        setOnShowModal(prevOnShowModal => !prevOnShowModal);
    }

    return (
        <Popover className="relative bg-white">
            <Modal {...modalProps} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/">
                            <span className="sr-only">Health Gift</span>
                            <img
                                className="h-20 w-auto sm:h-20"
                                src="https://cdn-icons-png.flaticon.com/512/4497/4497919.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                            <span className="sr-only">Open menu</span>
                            <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                    </div>
                    <Link to="/" className="text-base font-medium text-gray-500 hover:text-gray-900">
                        Bài viết
                    </Link>
                    <Popover.Group as="nav" className="hidden md:flex space-x-10">
                        <Link to="/calendar" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Lịch hẹn
                        </Link>
                        <Link to="/diseases" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Sổ tay sức khỏe
                        </Link>
                        <Link to="/doctors" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Đội ngũ bác sĩ
                        </Link>
                    </Popover.Group>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <button
                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                            onClick={handleShowModal}
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>

            <Transition
                as={Fragment}
                enter="duration-200 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Popover.Panel focus className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                        <div className="pt-5 pb-6 px-5">
                            <div className="flex items-center justify-between">
                                <div>
                                    <img
                                        className="h-12 w-auto"
                                        src="https://cdn-icons-png.flaticon.com/512/4497/4497919.png"
                                        alt="logo"
                                    />
                                </div>
                                <div className="-mr-2">
                                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                        <span className="sr-only">Close menu</span>
                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                    </Popover.Button>
                                </div>
                            </div>
                        </div>
                        <div className="py-6 px-5 space-y-6">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <Link to="/calendar" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Lịch hẹn
                                </Link>
                                <Link to="/diseases" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Sổ tay sức khỏe
                                </Link>
                                <Link to="/doctors" className="text-base font-medium text-gray-500 hover:text-gray-900">
                                    Đội ngũ bác sĩ
                                </Link>
                            </div>
                            <div>
                                <button
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    onClick={handleShowModal}
                                >
                                    Đăng ký
                                </button>
                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                    Đã có tài khoản?{' '}
                                    <button className="text-indigo-600 hover:text-indigo-500" onClick={handleShowModal}>
                                        Đăng nhập
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </Popover.Panel>
            </Transition>
        </Popover>
    )
}