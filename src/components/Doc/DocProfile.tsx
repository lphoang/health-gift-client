import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectIsLogged } from 'features/slices/authSlice';
import { getAllCertificates, getDoctor } from 'features/slices/doctorSlice';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { formatToDate } from 'utils/helpers';
import { DoctorContext } from '../Doctors/DoctorContext';
import Overview from '../Doctors/Overview';
import Review from '../Doctors/Review';
import CreateCertificate from './CreateCertificate';

function DocProfile() {
    const dispatch = useAppDispatch();
    const isLogged = useAppSelector(selectIsLogged);
    const role = useAppSelector(state => state.auth?.user?.role);
    const user = useAppSelector((state) => state.auth.user);
    const doctor = useAppSelector((state) => state.doctors?.doctor);
    const id = useAppSelector(state => state.auth.user?.id);
    const certificates = useAppSelector((state) => state.doctors.certificates);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getDoctor(id));
        dispatch(getAllCertificates(id));
        document.title = `Bác sĩ ${user?.firstName}`;
        (!isLogged || role !== "DOCTOR") && navigate("/")
    }, [])

    const [status, setStatus] = useState<string>("overview");

    const switchToOverview = () => {
        setStatus("overview");
    }

    const switchToReview = () => {
        setStatus("review");
    }

    const switchToCreateCertificate = () => {
        setStatus("certificate");
    }

    const contextValue = { switchToOverview, switchToReview, switchToCreateCertificate };


    return (
        <DoctorContext.Provider value={contextValue}>
            <div className="container mx-auto my-5 p-5">
                <div className="flex justify-end items-center border-b-4 border-indigo-400 p-3">
                    <button
                        className={"block mx-2 text-sm font-semibold rounded-lg hover:bg-indigo-200 focus:outline-none focus:shadow-outline focus:bg-indigo-200 hover:shadow-xs p-3 my-4" + (status === "overview"
                            ? "text-white bg-indigo-400"
                            : "text-indigo-600 bg-white")}
                        onClick={switchToOverview}>
                        Thông tin cơ bản</button>
                    <button
                        className={"block mx-2 text-sm font-semibold rounded-lg hover:bg-indigo-200 focus:outline-none focus:shadow-outline focus:bg-indigo-200 hover:shadow-xs p-3 my-4" + (status === "review"
                            ? "text-white bg-indigo-400"
                            : "text-indigo-600 bg-white")}
                        onClick={switchToReview}>
                        Nhận xét</button>
                    <button
                        className={"block mx-2 text-sm font-semibold rounded-lg hover:bg-indigo-200 focus:outline-none focus:shadow-outline focus:bg-indigo-200 hover:shadow-xs p-3 my-4" + (status === "review"
                            ? "text-white bg-indigo-400"
                            : "text-indigo-600 bg-white")}
                        onClick={switchToCreateCertificate}>
                        Tạo chứng chỉ</button>
                    <Link to="/doc/update">
                        <button
                            className={"block mx-2 text-sm font-semibold rounded-lg hover:bg-indigo-200 focus:outline-none focus:shadow-outline focus:bg-indigo-200 hover:shadow-xs p-3 my-4" + (status === "checkup"
                                ? "text-white bg-indigo-400"
                                : "text-indigo-600 bg-white")}>
                            Cập nhật thông tin</button>
                    </Link>
                </div>
                <div className="md:flex no-wrap md:-mx-2 px-2">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3">
                            <div className="image overflow-hidden">
                                <img className="h-auto w-full mx-auto"
                                    src={doctor?.appUser.avatar ? doctor?.appUser.avatar : "https://lavinephotography.com.au/wp-content/uploads/2017/01/PROFILE-Photography-112.jpg"}
                                    alt="" />
                            </div>
                            <h1 className="text-indigo-900 font-bold text-xl leading-8 my-1">{doctor?.appUser.firstName} {" "} {doctor?.appUser.lastName}</h1>
                            <h3 className="text-indigo-600 font-lg text-semibold leading-6">{doctor?.hospital?.hospitalName}</h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">Lorem ipsum dolor sit amet
                                consectetur adipisicing elit.
                                Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                            <ul
                                className="bg-indigo-50 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Trạng thái</span>
                                    <span className="ml-auto"><span
                                        className="bg-indigo-500 py-1 px-2 rounded text-white text-sm">{doctor?.appUser.enabled ? "Đã xác nhận" : "Chưa xác nhận"}</span></span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Là nhân viên từ</span>
                                    <span className="ml-auto">{formatToDate(doctor?.workFrom)}</span>
                                </li>
                                <li className="flex flex-col items-start py-3">
                                    <span>Chuyên khoa</span>
                                    <div>
                                        {doctor?.specialities?.map((speciality, index) => {
                                            return (
                                                <div className="py-2 px-4 text-xs m-2 leading-3 text-indigo-700 rounded-full inline-block text-center bg-indigo-100" key={index}>{speciality.name}</div>
                                            )
                                        })}
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {status === "overview" && <Overview doctor={doctor} certificates={certificates}/>}
                    {status === "review" && <Review doctor={doctor} />}
                    {status === "certificate" && <CreateCertificate doctor={doctor} />}
                </div>
            </div>
        </DoctorContext.Provider>
    );
}

export default DocProfile;