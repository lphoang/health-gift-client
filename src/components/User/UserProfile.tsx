import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectIsLogged } from 'features/slices/authSlice';
import { getPatientInfo } from 'features/slices/patientSlice';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { formatToDate } from 'utils/helpers';

function UserProfile() {
    const user = useAppSelector(state => state.auth?.user);
    const isLogged = useAppSelector(selectIsLogged);
    const role = useAppSelector(state => state.auth?.user?.role);
    const token = useAppSelector(state => state.auth?.accessToken);
    const patient = useAppSelector(state => state.patients?.patient);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPatientInfo(user?.id, token));
        document.title = "Trang cá nhân";
        (!isLogged || role !== "PATIENT") && navigate("/")
    }, [])

    return (
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">
                <div className="w-full md:w-3/12 md:mx-2">
                    <div className="bg-white p-3 border-t-4 border-indigo-400">
                        <div className="image overflow-hidden">
                            <img className="h-auto w-full mx-auto"
                                src={patient.appUser.avatar ? patient.appUser.avatar : "https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"}
                                alt="avatar" />
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{patient.appUser?.firstName}{" "}{patient.appUser?.lastName}</h1>
                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                            consectetur adipisicing elit.
                            Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Trạng thái</span>
                                <span className="ml-auto"><span
                                    className="bg-indigo-500 py-1 px-2 rounded text-white text-sm">Đang hoạt động</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Tạo tài khoản từ</span>
                                <span className="ml-auto">{formatToDate(patient.appUser?.createdAt)}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="my-4"></div>
                </div>
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
                                    <div className="px-4 py-2">{patient.appUser?.firstName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Tên</div>
                                    <div className="px-4 py-2">{patient.appUser?.lastName}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Giới tính</div>
                                    <div className="px-4 py-2">{patient.appUser?.enabled ? "Nam" : "Nữ"}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Số điện thoại</div>
                                    <div className="px-4 py-2">{patient.appUser?.phoneNumber}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Địa chỉ hiện tại</div>
                                    <div className="px-4 py-2">{patient.appUser?.address}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Thành phố</div>
                                    <div className="px-4 py-2">{patient.appUser?.city}</div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Email.</div>
                                    <div className="px-4 py-2">
                                        <a className="text-blue-800" href={`mailto:${patient.appUser?.email}`}>{patient.appUser?.email}</a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-4 py-2 font-semibold">Ngày sinh</div>
                                    <div className="px-4 py-2">{formatToDate(patient.appUser?.birthDate)}</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex">
                            <Link to="/user/calendar">
                                <button
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Lịch hẹn</button>
                            </Link>
                            <Link to="/user/update">
                                <button
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Cập nhật thông tin cá nhân</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;