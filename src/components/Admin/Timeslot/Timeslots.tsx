import React, { useEffect } from "react";
import { getAllTimeslots } from "features/slices/timeslotSlice";
import { Link } from "react-router-dom";
import { formatToDate } from "utils/helpers";
import { useAppDispatch, useAppSelector } from "app/hooks";
import DeleteTimeslot from "./DeleteTimeslot";

function Timeslots() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(getAllTimeslots());
  }, [dispatch]);

  useEffect(() => {
    document.title = "Health Gift | Timeslots";
  });

  return (
    <div>
      <Link
        to="/admin/timeslots/create"
        className="relative flex flex-column justify-end items-center"
      >
        <button
          type="submit"
          className="group relative w-48 my-5 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Create new timeslot
        </button>
      </Link>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200  overflow-y-scroll">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Start time
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      End time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {state.timeslots.timeslots?.map((timeslot, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {index + 1}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {timeslot.startTime}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">
                            {timeslot.endTime}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DeleteTimeslot timeslot={timeslot} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeslots;
