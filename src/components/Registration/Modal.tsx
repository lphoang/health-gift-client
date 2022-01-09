import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { RegistrationContext } from './RegistrationContext';
import Login from './Login';
import Register from './Register';

export default function Modal(props: any) {

    const color = "purple";
    const [status, setStatus] = useState<string>("register");

    const [openModal, setOpenModal] = useState<boolean>(props?.open);
    const cancelButtonRef = useRef(null);

    const switchToRegister = () => {
        setStatus("register");
    }

    const switchToLogin = () => {
        setStatus("login");
    }

    useEffect(() => {
        setOpenModal(props?.open);
    }, [props?.open]);

    const contextValue = { switchToLogin, switchToRegister };

    return (
        <RegistrationContext.Provider value={contextValue} >
            <Transition.Root show={openModal} as={Fragment}>
                <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpenModal}>
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg shadow-xl">
                                    <div className="flex flex-wrap">
                                        <div className="w-full">
                                            <ul
                                                className="flex mx-5 mb-1 list-none flex-wrap pt-3 pb-4 flex-row"
                                            >
                                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                                    <span
                                                        className={
                                                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer " +
                                                            (status === "register"
                                                                ? "text-white bg-" + color + "-600"
                                                                : "text-" + color + "-600 bg-white")
                                                        }
                                                        onClick={switchToRegister}
                                                    >
                                                        Đăng ký
                                                    </span>
                                                </li>
                                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                                    <span
                                                        className={
                                                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal cursor-pointer " +
                                                            (status === "login"
                                                                ? "text-white bg-" + color + "-600"
                                                                : "text-" + color + "-600 bg-white")
                                                        }
                                                        onClick={switchToLogin}
                                                    >
                                                        Đăng nhập
                                                    </span>
                                                </li>
                                            </ul>
                                            {status === "register" && <Register />}
                                            {status === "login" && <Login />}
                                        </div>
                                    </div>
                                    <div className="inline-block align-bottom rounded-lg text-left overflow-hidden transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                        <div className="px-4 py-1 sm:px-6 sm:flex sm:flex-row-reverse">
                                            <button
                                                type="button"
                                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                onClick={() => setOpenModal(false)}
                                                ref={cancelButtonRef}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>
        </RegistrationContext.Provider >
    )
}
