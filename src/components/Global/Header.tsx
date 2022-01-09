/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import {
    ChartBarIcon,
    MenuIcon,
    ShieldCheckIcon,
    ViewGridIcon,
    XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Modal from '../Registration/Modal'
import CheckUpModal from '../Checkup/Modal'

const research = [
    {
        name: 'Thống kê',
        description: 'Khai báo tình trạng sức khỏe của bạn và chúng tôi sẽ đánh giá nó qua thời gian.',
        href: '/analystics',
        icon: ChartBarIcon,
    },
    {
        name: 'Phát triển tốt', description: "Cùng nhau cải thiện cách sống nào.", href: '/enhancement',
        icon: ShieldCheckIcon
    },
    {
        name: 'Sổ tay sức khỏe',
        description: "Phát hiện sớm các bệnh lý qua biểu hiện.",
        href: '/diseases',

        icon: ViewGridIcon,
    },
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [onShowModal, setOnShowModal] = useState<boolean>(false);
    const [onCheckUpModal, setOnCheckUpModal] = useState<boolean>(false);
    const modalProps = {
        open: onShowModal,
    }
    const checkUpModalProps = {
        open: onCheckUpModal,
    }
    const handleShowModal = () => {
        setOnShowModal(prevOnShowModal => !prevOnShowModal);
    }
    const handleShowCheckUpModal = () => {
        setOnCheckUpModal(prevOnShowModal => !prevOnShowModal);
    }

    return (
        <Popover className="relative bg-white">
            <Modal {...modalProps} />
            <CheckUpModal {...checkUpModalProps} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <Link to="/">
                            <span className="sr-only">Medic</span>
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
                        <Popover className="relative">
                            {({ open } : {open: any}) => (
                                <>
                                    <Popover.Button
                                        className={classNames(
                                            open ? 'text-gray-900' : 'text-gray-500',
                                            'group bg-white rounded-sm inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-8 focus:ring-indigo-500'
                                        )}
                                    >
                                        <span>Tra cứu</span>
                                        <ChevronDownIcon
                                            className={classNames(
                                                open ? 'text-gray-600' : 'text-gray-400',
                                                'ml-2 h-5 w-5 group-hover:text-gray-500'
                                            )}
                                            aria-hidden="true"
                                        />
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0 translate-y-1"
                                        enterTo="opacity-100 translate-y-0"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100 translate-y-0"
                                        leaveTo="opacity-0 translate-y-1"
                                    >
                                        <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                                    {research.map((item) => (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                                        >
                                                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                                            <div className="ml-4">
                                                                <p className="text-base font-medium text-gray-900">{item.name}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                            )}
                        </Popover>

                        <Link to="/calendar" className="text-base font-medium text-gray-500 hover:text-gray-900">
                            Lịch hẹn
                        </Link>
                        <button 
                            onClick={handleShowCheckUpModal}
                            className={classNames(
                                onCheckUpModal ? 'text-gray-900' : 'text-gray-500',
                                'group bg-white rounded-sm inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-8 focus:ring-indigo-500'
                            )}>
                            Đăng ký khám
                        </button>
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
                            <div className="mt-6">
                                <nav className="grid gap-y-8">
                                    {research.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50"
                                        >
                                            <item.icon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                                            <span className="ml-3 text-base font-medium text-gray-900">{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </div>
                        <div className="py-6 px-5 space-y-6">
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                                <Link to="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Hỏi đáp bác sĩ
                                </Link>

                                <Link to="#" className="text-base font-medium text-gray-900 hover:text-gray-700">
                                    Đăng ký khám
                                </Link>
                                {research.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div>
                                <button
                                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                                    onClick={handleShowModal}
                                >
                                    Sign up
                                </button>
                                <p className="mt-6 text-center text-base font-medium text-gray-500">
                                    Existing customer?{' '}
                                    <button className="text-indigo-600 hover:text-indigo-500" onClick={handleShowModal}>
                                        Sign in
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