import React, { useEffect, useState } from "react";
import {
  updateHospital,
  getHospital,
} from "features/slices/hospitalSlice";
import { uploadFile, setEmptyBucket } from "features/slices/bucketSlice";
import Loading from "components/Global/Loading"
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { formatDay } from "utils/helpers";

function EditHospital() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const calledHospital = useAppSelector((state) => state.hospitals?.hospital);
  const [hospital, setHospital] = useState(calledHospital);
  const navigate = useNavigate();
  const { id } = useParams();

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
    dispatch(updateHospital(hospital, token, id));
    console.log(hospital);
    alert("Updated successfully");
    navigate("/admin/hospitals");
  };

  useEffect(() => {
    if (
      !hospital.imageUrl.includes(state.buckets?.uploadFileUrl) &&
      state.buckets.uploadFileUrl !== ""
    ) {
      hospital?.imageUrl.push(state.buckets?.uploadFileUrl);

      setHospital((prevState) => ({
        ...hospital,
        imageUrl: prevState.imageUrl,
      }));
    }
    dispatch(setEmptyBucket());
  }, [state.buckets.uploadFileUrl]);

  useEffect(() => {
    dispatch(getHospital(id));
  }, [id]);

  return (
    <div>
      {state.hospitals?.apiState.isLoading && <Loading />}
      <div>
        <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
          Create new Hospital
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
                htmlFor="Name"
              >
                Hospital Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder="Name"
                defaultValue={hospital?.hospitalName || "Hospital name"}
                name="name"
                onChange={(e) =>
                  setHospital({
                    ...hospital,
                    hospitalName: e.target.value,
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
                Description
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Description"
                defaultValue={hospital?.description || "Description"}
                name="description"
                onChange={(e) =>
                  setHospital({
                    ...hospital,
                    description: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="relative flex items-center justify-start mb-5">
            {hospital?.imageUrl?.map((image, index) => {
              return (
                <img
                  key={index}
                  src={image}
                  alt="images"
                  className="w-64 h-64 rounded-sm border-gray-700 object-cover mr-4"
                />
              );
            })}
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="imageUrl"
              >
                Image
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="file"
                placeholder="Image Url"
                name="imageUrl"
                onChange={onChangeImage}
                required
              />
              <button
                className="mt-4 relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={onUploadHandler}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="since"
              >
                Since
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Since"
                type="date"
                defaultValue={formatDay(hospital?.since)}
                name="since"
                onChange={(e) =>
                  setHospital({
                    ...hospital,
                    since: new Date(e.target.value),
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
                htmlFor="address"
              >
                Address
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Address"
                type="text"
                defaultValue={hospital?.address || "Address"}
                name="address"
                onChange={(e) =>
                  setHospital({
                    ...hospital,
                    address: e.target.value,
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
                htmlFor="contactPhoneNumber"
              >
                Contact phone number
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Contact phone number"
                type="text"
                name="contactPhoneNumber"
                defaultValue={hospital?.contactPhoneNumber || "Contact phone number"}
                onChange={(e) =>
                  setHospital({
                    ...hospital,
                    contactPhoneNumber: e.target.value,
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
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditHospital;
