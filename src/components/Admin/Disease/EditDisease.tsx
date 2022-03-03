import React, { useEffect, useState } from "react";
import { getDisease, updateDisease } from "features/slices/diseaseSlice";
import { uploadFile, setEmptyBucket } from "features/slices/bucketSlice";
import Loading from "components/Global/Loading";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";

function EditDisease() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const calledDisease = useAppSelector(state => state.diseases?.disease);
  const [disease, setDisease] = useState(calledDisease);
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
    dispatch(updateDisease(disease, token, id));
    alert("Updated successfully");
    navigate("/admin/diseases");
  };

  useEffect(() => {
    dispatch(getDisease(id));
  }, [id]);

  useEffect(() => {
    if (
      !disease.imageUrl.includes(state.buckets?.uploadFileUrl) &&
      state.buckets.uploadFileUrl !== ""
    ) {
      disease.imageUrl.push(state.buckets?.uploadFileUrl);

      setDisease({
        ...disease,
        imageUrl: disease.imageUrl,
      });
    }
    dispatch(setEmptyBucket());
  }, [state.buckets.uploadFileUrl]);

  return (
    <div>
      {state.diseases?.apiState.isLoading && <Loading />}
      <div>
        <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
          Update Disease
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
                Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder="Name"
                name="name"
                defaultValue={disease.name}
                disabled
              />
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                htmlFor="overview"
              >
                Overview
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Overview"
                name="overview"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    overview: e.target.value,
                  })
                }
                defaultValue={disease?.overview}
                required
              />
            </div>
          </div>
          <div className="relative flex items-center justify-start mb-5">
            {Array.prototype.map.call(disease.imageUrl, (image, index) => {
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
                htmlFor="cause"
              >
                Cause
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Cause"
                defaultValue={disease?.cause}
                name="cause"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    cause: e.target.value,
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
                htmlFor="symptom"
              >
                Symptom
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Symptom"
                defaultValue={disease?.symptom}
                name="symptom"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    symptom: e.target.value,
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
                htmlFor="objects"
              >
                Objects
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Objects"
                defaultValue={disease?.objects}
                name="objects"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    objects: e.target.value,
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
                htmlFor="routeOfTransmissions"
              >
                Routes of transmissions
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Routes of transmissions"
                defaultValue={disease?.routesOfTransmission}
                name="routeOfTransmissions"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    routesOfTransmission: e.target.value,
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
                htmlFor="precautions"
              >
                Precautions
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Precautions"
                defaultValue={disease?.precautions}
                name="precautions"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    precautions: e.target.value,
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
                htmlFor="diagnosis"
              >
                Diagnosis
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Diagnosis"
                defaultValue={disease?.diagnosis}
                name="diagnosis"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    diagnosis: e.target.value,
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
                htmlFor="treatmentMeasures"
              >
                Treatment Measures
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Treatment Measures"
                defaultValue={disease?.treatmentMeasures}
                name="treatmentMeasures"
                onChange={(e) =>
                  setDisease({
                    ...disease,
                    treatmentMeasures: e.target.value,
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

export default EditDisease;
