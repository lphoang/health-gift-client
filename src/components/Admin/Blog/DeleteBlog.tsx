import React from "react";
import { deleteBlog } from "features/slices/blogSlice";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Loading from "components/Global/Loading";

function DeleteBlog({ blog: { id, title } }: any) {
  const state = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const token = state.auth.accessToken;

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    dispatch(deleteBlog(token, id));
    if (state.auth.apiState.errorMessage) {
      alert(state.auth.apiState.errorMessage);
    } else {
      alert(`Delete ${title} successfully`);
    }
  };

  const onDeleteHandler = (e: any) => {
    if (window.confirm("Are you sure to delete this blog?")) {
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

export default DeleteBlog;
