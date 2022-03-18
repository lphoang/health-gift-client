import React, { useEffect, useState } from "react";
import { createDoctor } from "features/slices/doctorSlice";
import Loading from "components/Global/Loading";
import { useAppDispatch, useAppSelector } from "app/hooks";

function CreateDoctor() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const prevVerifyUrl = useAppSelector((state) => state.doctors?.userDoctor?.verifyTokenUrl);

  const [doctor, setDoctor] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(createDoctor(doctor));
    alert("Added successfully");
    setTimeout(() => {
      onVerifyHandler();
    }, 2000)
  };

  const onVerifyHandler = () => {
    if (state.doctors.userDoctor?.verifyTokenUrl !== prevVerifyUrl) {
      window.open(state.doctors?.userDoctor?.verifyTokenUrl, "Verify Your Account", "height=400,width=400")
    }
  }

  useEffect(() => {
    document.title = "Create new doctor";
  }, [prevVerifyUrl]);

  return (
    <div>
      {state.doctors?.apiState.isLoading && <Loading />}
      <div>
        <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
          Create new doctor
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
                htmlFor="firstName"
              >
                First Name
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder="First name"
                name="firstName"
                onChange={(e) =>
                  setDoctor({ ...doctor, firstName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="rounded-md shadow-sm">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  onChange={(e) =>
                    setDoctor({ ...doctor, lastName: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="rounded-md shadow-sm">
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
                    type="email"
                    placeholder="example@healthgift.com"
                    name="email"
                    onChange={(e) =>
                      setDoctor({ ...doctor, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="password"
                    placeholder="Password"
                    name="firstName"
                    onChange={(e) =>
                      setDoctor({ ...doctor, password: e.target.value })
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
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateDoctor;
