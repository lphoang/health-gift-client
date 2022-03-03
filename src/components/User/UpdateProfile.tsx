import React, { useEffect, useState } from "react";
import {
    emptyMsg,
    getUserInfo,
    updateUserInfo,
} from "features/slices/userSlice";
import { uploadFile, setEmptyBucket } from "features/slices/bucketSlice";
import Loading from "components/Global/Loading";
import { formatDay } from "utils/helpers"
import { useAppDispatch, useAppSelector } from "app/hooks";
import { useNavigate } from "react-router-dom";
import ApiState from "components/Global/ApiState";

function UpdateProfile() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const apiState = useAppSelector(state => state.user.apiState);
    const calledUser = useAppSelector((state) => state.auth.user);
    const isLogged = useAppSelector(state => state.auth?.isLogged);
    const role = useAppSelector(state => state.auth.user?.role);
    let isSuccess = false;

    const [user, setUser] = useState({
        firstName: calledUser?.firstName,
        lastName: calledUser?.lastName,
        avatar: calledUser?.avatar,
        phoneNumber: calledUser?.phoneNumber,
        address: calledUser?.address,
        city: calledUser?.city,
        birthDate: calledUser?.birthDate
    });

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
        dispatch(updateUserInfo(user, token, id));
        if (apiState.isSuccess) {
            isSuccess = true;
        }
    };

    useEffect(() => {
        dispatch(getUserInfo(id, token));
        dispatch(emptyMsg());
        (!isLogged && role !== "PATIENT") && navigate("/")
    }, [id]);

    useEffect(() => {
        if (state.buckets.uploadFileUrl !== "") {
            setUser({
                ...user,
                avatar: state.buckets.uploadFileUrl,
            });
        }
        dispatch(setEmptyBucket());
    }, [state.buckets.uploadFileUrl]);


    return (
        <div>
            {state.user?.apiState.isLoading && <Loading />}
            <div>
                <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                    Cập nhật thông tin người dùng
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
                                defaultValue={user.phoneNumber ? user?.phoneNumber : ""}

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
                                defaultValue={user.city ? user?.city : ""}

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
                                defaultValue={user?.birthDate ? formatDay(user?.birthDate) : new Date().toLocaleDateString()}

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
                                defaultValue={calledUser?.email}
                                name="email"
                                disabled
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

export default UpdateProfile;
