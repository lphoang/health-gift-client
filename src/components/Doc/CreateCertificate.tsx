import React, { useEffect, useState } from "react";
import { createCertificate } from "features/slices/doctorSlice";
import { uploadFile } from "features/slices/bucketSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Loading from "components/Global/Loading";
import { ICertificateRequest } from "utils/types";
import { formatDay, randomDate } from "utils/helpers";

function CreateCertificate({ doctor }: any) {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const [certificate, setCertificate] = useState<ICertificateRequest>({
        awardedBy: "",
        certificateName: "",
        description: "",
        imageUrl: "",
        issuedOn: new Date()
    });
    const navigate = useNavigate();

    const token = state.auth?.accessToken;

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
        dispatch(createCertificate(doctor.id, token, certificate));
        navigate("/doc");
    };

    useEffect(() => {
        setCertificate({
            ...certificate,
            imageUrl: state.buckets.uploadFileUrl,
        });
    }, [state.buckets.uploadFileUrl]);

    return (
        <div className="w-full md:w-9/12 mx-2 h-64 mt-5">
            {state.doctors?.apiState.isLoading && <Loading />}
            <div>
                <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                    Tạo mới chứng chỉ
                </h3>
            </div>
            <form
                className="mt-8 space-y-12 w-1/2 mx-auto"
                onSubmit={onSubmitHandler}
            >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm">
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="certificateName"
                            >
                                Tên chứng chỉ
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="text"
                                placeholder="Tên chứng chỉ"
                                name="certificateName"
                                onChange={(e) =>
                                    setCertificate({
                                        ...certificate,
                                        certificateName: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="awardedBy"
                            >
                                Trao tặng bởi
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Trao tặng bởi"
                                name="awardedBy"
                                type="text"
                                onChange={(e) =>
                                    setCertificate({
                                        ...certificate,
                                        awardedBy: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="relative flex items-center justify-start mb-5">
                        <img
                            src={certificate?.imageUrl ? certificate?.imageUrl : "https://loremflickr.com/g/320/240/paris"}
                            alt="image123"
                            className="w-64 h-64 rounded-sm border-gray-700 object-cover mr-4"
                        />
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="imageUrl"
                            >
                                Hình ảnh
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="file"
                                placeholder="imageUrl"
                                onChange={onChangeImage}
                                required
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
                                htmlFor="issuedOn"
                            >
                                Ngày trao tặng
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Ngày trao tặng"
                                type="date"
                                name="issuedOn"
                                onChange={(e) =>
                                    setCertificate({
                                        ...certificate,
                                        issuedOn: formatDay(e.target.value),
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="description"
                            >
                                Mô tả
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <textarea
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                placeholder="Trao tặng bởi"
                                name="description"
                                onChange={(e) =>
                                    setCertificate({
                                        ...certificate,
                                        description: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="mx-auto relative w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CreateCertificate;
