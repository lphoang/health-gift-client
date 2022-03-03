import React from "react";
import Loading from "components/Global/Loading";
import { deleteTimeSlot } from "features/slices/timeslotSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

function DeleteTimeslot({ timeslot: { id } }: any) {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const token = state.auth.accessToken;

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(deleteTimeSlot(token, id));
        if (state.auth.apiState.errorMessage) {
            alert(state.auth.apiState.errorMessage);
        } else {
            alert(`Delete this timeslot successfully`);
        }
    };

    const onDeleteHandler = (e: any) => {
        if (window.confirm("Are you sure to delete this timeslot?")) {
            onSubmitHandler(e);
        }
    };

    return (
        <div>
            {state.auth.apiState.isLoading && <Loading />}
            <button
                onClick={onDeleteHandler}
                className="inline-block text-center p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
            >
                Delete
            </button>
        </div>
    );
}

export default DeleteTimeslot;
