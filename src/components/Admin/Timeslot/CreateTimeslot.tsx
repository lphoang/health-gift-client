import React, { useEffect, useState } from "react";
import { createTimeslot } from "features/slices/timeslotSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Loading from "components/Global/Loading";
import { getInitialTimeSlotInfo } from "apis/initialInformation";

function CreateTimeslot() {
    const dispatch = useAppDispatch();
    const state = useAppSelector((state) => state);
    const [timeslot, setTimeslot] = useState(getInitialTimeSlotInfo)
    const navigate = useNavigate();

    const token = state.auth?.accessToken;

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(createTimeslot(timeslot.startTime, timeslot.endTime, token));
        // alert("Added successfully");
        // navigate("/admin/timeslots");
        console.log(timeslot);
    };

    useEffect(() => {
        document.title = "Create new timeslot";
    });

    return (
        <div>
            {state.timeslots?.apiState.isLoading && <Loading />}
            <div>
                <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
                    Create new timeslot
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
                                htmlFor="startTime"
                            >
                                Start
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="time"
                                placeholder="Start time"
                                name="startTime"
                                onChange={(e) => setTimeslot({
                                    ...timeslot,
                                    startTime: e.target.value
                                })}
                                required
                            />
                        </div>
                    </div>
                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label
                                className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4"
                                htmlFor="endTime"
                            >
                                End
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                type="time"
                                placeholder="End time"
                                name="endTime"
                                onChange={(e) => setTimeslot({
                                    ...timeslot,
                                    endTime: e.target.value
                                })}
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
            </form>
        </div>
    );
}

export default CreateTimeslot;
