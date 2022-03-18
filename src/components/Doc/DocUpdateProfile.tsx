import React, { useEffect, useState } from "react";
import {
    addSpeciality,
    emptyMessage,
    getDoctor,
    updateDoctor,
    updateUserInfo,
} from "features/slices/doctorSlice";
import { uploadFile, setEmptyBucket } from "features/slices/bucketSlice";
import Loading from "components/Global/Loading";
import { getAllSpecialities } from "features/slices/specialitySlice";
import { getAllHospitals } from "features/slices/hospitalSlice";
import { formatDay } from "utils/helpers"
import { useAppDispatch, useAppSelector } from "app/hooks";
import { addTimeSlot } from "features/slices/timeslotSlice";
import { useNavigate } from "react-router-dom";
import ApiState from "components/Global/ApiState";

function DocUpdateProfile() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const apiState = useAppSelector((state) => state.doctors.apiState);
    const calledDoctor = useAppSelector((state) => state.doctors?.doctor);
    const isLogged = useAppSelector(state => state.auth?.isLogged);
    const role = useAppSelector(state => state.auth.user?.role);
    let isSuccess = false;

    const [trigger, setTrigger] = useState(false);

    const [doctor, setDoctor] = useState({
        hospitalName: calledDoctor?.hospital?.hospitalName,
        workFrom: calledDoctor.workFrom,
        workTo: calledDoctor.workTo,
    });
    const [user, setUser] = useState({
        firstName: calledDoctor?.appUser?.firstName,
        lastName: calledDoctor?.appUser?.lastName,
        avatar: calledDoctor?.appUser?.avatar,
        phoneNumber: calledDoctor?.appUser?.phoneNumber,
        address: calledDoctor?.appUser?.address,
        city: calledDoctor?.appUser?.city,
        birthDate: calledDoctor?.appUser?.birthDate
    });

    const [specialityId, setSpecialityId] = useState("");
    const [timeslotId, setTimeslotId] = useState("")
    const id = useAppSelector((state) => state.auth.user?.id);

    const token = state.auth?.accessToken;
    const navigate = useNavigate();

    const [file, setFile] = useState("");
    let formData = new FormData();

    const onUploadHandler = (e: any) => {
        e.preventDefault();
        formData.append("file", file);
        dispatch(uploadFile(formData));
    };

    const onChangeImage = (e: any) => {
        setFile(e.target.files[0]);
    };

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(updateDoctor(doctor, token, id));
        dispatch(updateUserInfo(user, token, id));
        if (apiState.isSuccess) {
            isSuccess = true;
        }
    };

    const onSelectSpeciality = (e: any) => {
        e.preventDefault();
        dispatch(addSpeciality(specialityId, token, id))
        setTrigger(true);
        setTimeout(() => {
            setTrigger(false);
        }, 1000)
    }

    const onSelectTimeslot = (e: any) => {
        e.preventDefault();
        dispatch(addTimeSlot(timeslotId, id, token))
        setTrigger(true);
        setTimeout(() => {
            setTrigger(false);
        }, 1000)
    }

    useEffect(() => {
        dispatch(getDoctor(id));
        dispatch(getAllSpecialities());
        dispatch(getAllHospitals());
        dispatch(emptyMessage());
        (!isLogged && role !== "DOCTOR") && navigate("/")
    }, [id, trigger]);

    useEffect(() => {
        if (state.buckets.uploadFileUrl !== "") {
            setUser({
                ...user,
                avatar: state.buckets.uploadFileUrl,
            });
        }
        dispatch(setEmptyBucket());
    }, [state.buckets.uploadFileUrl]);

    const isDisabled = (spec: any) => {
        let isDis = false;
        calledDoctor?.specialities?.forEach((speciality) => {
            if (speciality.id === spec.id) {
                isDis = true;
            }
        })
        return isDis;
    }

    const isDisabledTime = (tSlot: any) => {
        let isDis = false;
        calledDoctor?.timeSlots?.forEach((timeslot) => {
            if (timeslot.id === tSlot.id) {
                isDis = true;
            }
        })
        return isDis;
    }

    return (
        <div>
            {state.doctors?.apiState.isLoading && <Loading />}
            <div>
                <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                    Cập nhật thông tin bác sĩ
                </h3>
            </div>
            <form
                className="mt-8 space-y-12 w-2/3 mx-auto"
                onSubmit={onSubmitHandler}
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="firstName"
                            >
                                Họ
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                placeholder="Họ"
                                name="firstName"
                                defaultValue={user.firstName}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        firstName: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="lastName"
                            >
                                Tên
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Tên"
                                name="lastName"
                                type="text"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        lastName: e.target.value,
                                    })
                                }
                                defaultValue={user.lastName}

                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="phoneNumber"
                            >
                                Số điện thoại
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Số điện thoại"
                                name="phoneNumber"
                                type="text"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        phoneNumber: e.target.value,
                                    })
                                }
                                defaultValue={user.phoneNumber ? user.phoneNumber : ""}

                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="address"
                            >
                                Địa chỉ
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Địa chỉ"
                                name="address"
                                type="text"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        address: e.target.value,
                                    })
                                }
                                defaultValue={user.address ? user.address : ""}

                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="city"
                            >
                                Thành phố
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Thành phố"
                                name="city"
                                type="text"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        city: e.target.value,
                                    })
                                }
                                defaultValue={user.city ? user.city : ""}

                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="birthDate"
                            >
                                Ngày sinh
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Ngày sinh"
                                name="birthDate"
                                type="date"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        birthDate: e.target.value,
                                    })
                                }
                                defaultValue={formatDay(user.birthDate) ? formatDay(user.birthDate) : new Date().toLocaleDateString()}

                            />
                        </div>
                    </div>
                    <div className="relative flex items-center justify-center mb-5">
                        <img
                            src={user?.avatar ? user?.avatar : "https://loremflickr.com/g/320/240/paris"}
                            alt="images"
                            className="w-64 h-64 rounded-md border-gray-700 object-cover mr-4"
                        />
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="avatar"
                            >
                                Ảnh đại diện
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="file"
                                placeholder="Ảnh đại diện"
                                name="avatar"
                                onChange={onChangeImage}
                            />
                            <button
                                className="mt-4 relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={onUploadHandler}
                            >
                                Tải lên
                            </button>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="email"
                            >
                                Email
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Email"
                                type="email"
                                defaultValue={calledDoctor?.appUser?.email}
                                name="email"
                                disabled
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="hospitalName"
                            >
                                Bệnh viện
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <select
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Bệnh viện"
                                defaultValue={doctor?.hospitalName ? doctor.hospitalName : ""}
                                name="hospitalName"
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        hospitalName: e.target.value,
                                    })
                                }

                            >
                                {state.hospitals?.hospitals.map((hospital, index) => {
                                    return (
                                        <option value={hospital.hospitalName} key={index}>
                                            {hospital.hospitalName}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>
                    <div className="focus:outline-none flex my-4">
                        {calledDoctor?.specialities?.map((speciality, index) => {
                            return (
                                <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full inline-block text-center bg-indigo-100" key={index}>{speciality.name}</div>
                            )
                        })}
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="specialityId"
                            >
                                Chuyên khoa
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <div className="flex">
                                <select
                                    className="bg-gray-200 w-2/3 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    placeholder="Chuyên khoa"
                                    defaultValue={specialityId}
                                    name="specialityId"
                                    onChange={(e) =>
                                        setSpecialityId(e.target.value)
                                    }
                                >
                                    {state.specialities?.specialities.map((speciality, index) => {
                                        return (
                                            <option value={speciality.id} key={index} disabled={isDisabled(speciality)}>
                                                {speciality.name}
                                            </option>
                                        )
                                    })}
                                </select>
                                <div className="w-1/3">
                                    <button
                                        className="ml-10 relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={onSelectSpeciality}
                                    >
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="focus:outline-none flex my-4">
                        {calledDoctor?.timeSlots?.map((timeSlot, index) => {
                            return (
                                <div className="py-2 px-4 text-xs leading-3 text-indigo-700 rounded-full inline-block text-center bg-indigo-100" key={index}>{timeSlot.startTime} - {timeSlot.endTime}</div>
                            )
                        })}
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="timeslot"
                            >
                                Khoảng thời gian làm việc
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <div className="flex">
                                <select
                                    className="bg-gray-200 w-2/3 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                    placeholder="Time slot"
                                    defaultValue={timeslotId}
                                    name="timeslot"
                                    onChange={(e) =>
                                        setTimeslotId(e.target.value)
                                    }
                                >
                                    {state.timeslots?.timeslots.map((timeslot, index) => {
                                        return (
                                            <option value={timeslot.id} key={index} disabled={isDisabledTime(timeslot)}>
                                                {timeslot.startTime} - {timeslot.endTime}
                                            </option>
                                        )
                                    })}
                                </select>
                                <div className="w-1/3">
                                    <button
                                        className="ml-10 relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={onSelectTimeslot}
                                    >
                                        Thêm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="workFrom"
                            >
                                Kinh nghiệm làm việc từ
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Work from"
                                type="date"
                                defaultValue={formatDay(doctor?.workFrom) ? formatDay(doctor?.workFrom) : new Date().toLocaleDateString()}
                                name="workFrom"
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        workFrom: new Date(e.target.value),
                                    })
                                }

                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="workTo"
                            >
                                Đến
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Work to"
                                type="date"
                                defaultValue={doctor?.workTo ? formatDay(doctor?.workTo) : new Date().toLocaleDateString()}
                                name="workTo"
                                onChange={(e) =>
                                    setDoctor({
                                        ...doctor,
                                        workTo: new Date(e.target.value),
                                    })
                                }

                            />
                        </div>
                    </div>
                    {<ApiState {...apiState} />}
                    {isSuccess && (<div className="mx-auto"><p className="block text-green-500 text-center font-bold mb-1 md:mb-0 p-5">Cập nhật thành công</p></div>)}
                    <div>
                        <button
                            type="submit"
                            className="mx-auto relative w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cập nhật
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default DocUpdateProfile;
