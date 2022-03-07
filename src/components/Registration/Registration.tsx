import { useState } from 'react'
import { RegistrationContext } from './RegistrationContext';
import Login from './Login';
import Register from './Register';
import { useAppSelector } from 'app/hooks';
import { selectIsLogged } from 'features/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    const isLogged = useAppSelector(selectIsLogged);
    const isAdmin = useAppSelector((state) => state.auth.isAdmin);
    const color = "purple";
    const [status, setStatus] = useState<string>("register");
    const navigate = useNavigate();

    const switchToRegister = () => {
        setStatus("register");
    }

    const switchToLogin = () => {
        setStatus("login");
    }

    setTimeout(() => {
        if (isLogged) {
            isAdmin ? navigate("/admin") : navigate("/")
        }
    }, 400)


    const contextValue = { switchToLogin, switchToRegister };

    return (
        <RegistrationContext.Provider value={contextValue} >
            <div className="flex w-full h-screen items-center align-middle">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/hospital-and-medical-assistants-and-ambulance-2681143-2233471.png" className="md:w-1/2 lg:w-2/3 object-cover h-full" alt="loginimage" />
                <div className="lg:w-2/3 md:w-1/2 h-2/3 m-auto bg-white overflow-hidden transform transition-all sm:my-8 sm:max-w-xl">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-lg shadow-xl">
                        <div className="p-10">
                            <div className="h-full w-full pb-5">
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
                    </div>
                </div>
            </div>
        </RegistrationContext.Provider >
    )
}
