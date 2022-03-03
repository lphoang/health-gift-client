import React, { useEffect } from "react";
import {
  getCertificate,
  verifyCertificate,
} from "features/slices/certificateSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { formatDay } from "utils/helpers";

function Certificate() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = state.auth?.accessToken;

  const onSubmitHandler = () => {
    dispatch(verifyCertificate(token, id));
    alert("Verify succesfully");
    setTimeout(() => {
      navigate("/admin/certificates")
    },1000)
  };

  useEffect(() => {
    dispatch(getCertificate(token, id));
  }, []);
  const certificate = state.certificates.certificate;

  return (
    <div>
      <div>
        <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
          Certificate
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
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Certificate name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                name="certifcateName"
                value={certificate.certificateName}
                disabled
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Awarded by
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="awardedBy"
                value={certificate.awardedBy}
                disabled
              />
            </div>
          </div>
          <div className="relative flex items-center justify-start mb-5">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Image
              </label>
            </div>
            <div className="md:w-2/3">
              <img
                src={certificate.imageUrl}
                alt="images"
                className="w-64 h-64 rounded-sm border-gray-700 object-cover mr-4"
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Description
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="description"
                value={certificate.description}
                disabled
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Created at
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="createdAt"
                value={formatDay(certificate.createdAt)}
                disabled
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4">
                Status
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                name="status"
                value={certificate.status}
                disabled
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="mx-auto relative w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Verify
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Certificate;
