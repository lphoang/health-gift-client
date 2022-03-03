import React from "react";
import Loading from "components/Global/Loading";
import { deleteSpeciality } from "features/slices/specialitySlice";
import { useAppDispatch, useAppSelector } from "app/hooks";

function DeleteSpeciality({ speciality: { id, name } }: any) {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const token = state.auth.accessToken;

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(deleteSpeciality(token, id));
    if (state.auth.apiState.errorMessage) {
      alert(state.auth.apiState.errorMessage);
    } else {
      alert(`Delete ${name} successfully`);
    }
  };

  const onDeleteHandler = (e: any) => {
    if (window.confirm("Are you sure to delete this speciality?")) {
      onSubmitHandler(e);
    }
  };

  return (
    <div>
      {state.auth.apiState.isLoading && <Loading />}
      <button
        onClick={onDeleteHandler}
        className="w-full flex items-center justify-center p-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteSpeciality;
