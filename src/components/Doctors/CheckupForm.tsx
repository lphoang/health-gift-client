import { useAppSelector, useAppDispatch } from 'app/hooks';
import { selectIsLogged } from 'features/slices/authSlice';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppointmentType } from 'utils/types';
import { create, emptyError } from "features/slices/appointmentSlice";
import ApiState from 'components/Global/ApiState';
// import { PUBLISHER_URL } from 'utils/helpers/env';
// import { createMeeting, getUserInfo } from 'features/slices/zoomSlice';
// import { getStartTimeById } from 'utils/helpers';
import { getAllTimeslots } from 'features/slices/timeslotSlice';

function CheckupForm({ doctor, patient }: any) {
    const dispatch = useAppDispatch();
    const isLogged = useAppSelector(selectIsLogged);
    const token = useAppSelector((state) => state.auth.accessToken)
    const apiState = useAppSelector(state => state.appointments.apiState);
    // const accessToken = useAppSelector(state => state.zoom.oauthToken.accessToken)
    // const zoomId = useAppSelector(state => state.zoom.user.id)
    // const timeSlots = useAppSelector(state => state.timeslots.timeslots)
    // const [isZoomLogged, setIsZoomLogged] = useState(false);
    const { id } = useParams();

    const [appointment, setAppointment] = useState({
        title: "Đăng ký khám",
        description: "",
        appointmentType: AppointmentType[AppointmentType.OFFLINE],
        appointmentDate: "",
        timeSlotId: doctor?.timeSlots ? doctor?.timeSlots[0].id : "",
        timeSlot: "",
        patientId: patient.id,
        doctorId: id
    });

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        if (isLogged) {
            // if (appointment.appointmentType === AppointmentType[AppointmentType.ONLINE] && isZoomLogged) {
            //     alert("Bạn phải đăng nhập Zoom để sử dụng chức năng này!");
            // } else {
                dispatch(create(appointment, token));
            //     createMeeting({
            //         duration: 60,
            //         password: '',
            //         startTime: getStartTimeById(timeSlots, appointment.timeSlotId),
            //         topic: appointment.title
            //     }, accessToken, zoomId)
            // }
        } else {
            alert("Bạn vẫn chưa đăng nhập!");
        }
    }

    useEffect(() => {
        emptyError(dispatch);
        // if (accessToken) {
        //     setIsZoomLogged(true);
        //     dispatch(getUserInfo(accessToken));
        // }

        dispatch(getAllTimeslots());

        document.title = "Đăng ký khám"
    }, [])

    return (
        <div className="bg-white px-3 pt-5 pb-4 sm:p-6 sm:pb-4 w-9/12 mx-auto">
            <div className="sm:flex sm:items-start w-full">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full mx-5">
                    <form className="mt-8 space-y-6 w-full" onSubmit={onSubmitHandler}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm">
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="fullName">
                                        Họ và tên
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="text" placeholder={`${patient.firstName} ${patient.lastName}`} disabled />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="birthDay">
                                        Ngày sinh
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="date" placeholder="Ngày sinh" value={patient.birthDate} disabled />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="phoneNumber">
                                        Điện thoại
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="text" placeholder="Điện thoại" value={patient.phoneNumber} disabled />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="email">
                                        Email
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="email" placeholder="Email" value={patient.email} disabled />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="appointmentType">
                                        Hình thức khám
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <select
                                        className="bg-gray-200 w-full appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        placeholder="Hình thức khám"
                                        defaultValue={appointment.appointmentType}
                                        name="appointmentType"
                                        onChange={(e) =>
                                            setAppointment({ ...appointment, appointmentType: e.target.value })
                                        }
                                    >
                                        <option value={AppointmentType[AppointmentType.OFFLINE]}>
                                            Khám tại phòng khám
                                        </option>
                                        <option value={AppointmentType[AppointmentType.ONLINE]}>
                                            Tư vấn trực tuyến
                                        </option>
                                        )
                                    </select>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="appointmentDate">
                                        Ngày khám
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="date" placeholder="Chọn ngày khám" required onChange={e => setAppointment({ ...appointment, appointmentDate: e.target.value })} />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="checkUpDate">
                                        Giờ khám
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <select
                                        className="bg-gray-200 w-full appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                        placeholder="Time slot"
                                        name="timeslot"
                                        defaultValue={doctor?.timeSlots ? doctor?.timeSlots[0]?.id : appointment.timeSlotId}
                                        onChange={(e) =>
                                            setAppointment({ ...appointment, timeSlotId: e.target.value })
                                        }
                                    >
                                        {doctor?.timeSlots?.map((timeslot: any, index: number) => {
                                            return (
                                                <option value={timeslot.id} key={index}>
                                                    {timeslot.startTime} - {timeslot.endTime}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="firstName">
                                        Bác sĩ
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="text" placeholder={`Bác sĩ ${doctor?.appUser?.firstName} ${doctor?.appUser?.lastName} (${doctor?.specialities[0]?.name})`} disabled />
                                </div>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className="md:w-1/3">
                                    <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="address">
                                        Nhu cầu khám bệnh
                                    </label>
                                </div>
                                <div className="md:w-2/3">
                                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="textarea" placeholder="Nhu cầu khám bệnh (Không bắt buộc)" onChange={(e) => setAppointment({ ...appointment, description: e.target.value })} />
                                </div>
                            </div>
                        </div>
                        {<ApiState {...apiState} />}
                        {apiState.isSuccess && (<div className="mx-auto"><p className="block text-green-500 font-bold text-center mb-1 md:mb-0 pr-4">Bạn đã đặt khám thành công</p></div>)}
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Gửi đơn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckupForm;