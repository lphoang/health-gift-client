import React, { useEffect, useState } from "react";
import { getBlog, updateBlog } from "features/slices/blogSlice";
import { setEmptyBucket, uploadFile } from "features/slices/bucketSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import Loading from "components/Global/Loading";

function EditBlog() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const calledBlog = useAppSelector(state => state.blogs?.blog)
  const [blog, setBlog] = useState(calledBlog);
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
    dispatch(updateBlog(blog, token, id));
    alert("Updated successfully");
    navigate("/admin/blogs");
  };

  useEffect(() => {
    dispatch(getBlog(id));
  }, [id]);

  useEffect(() => {
    if (
      !blog.imageUrl.includes(state.buckets?.uploadFileUrl) &&
      state.buckets.uploadFileUrl !== ""
    ) {
      blog.imageUrl.push(state.buckets?.uploadFileUrl);
      setBlog({
        ...blog,
        imageUrl: blog.imageUrl,
      });
    }
    dispatch(setEmptyBucket());
  }, [state.buckets.uploadFileUrl]);

  return (
    <div>
      {state.blogs?.apiState.isLoading && <Loading />}
      <div>
        <h3 className="text-center text-lg leading-6 font-medium text-gray-900">
          Update Blog
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
                htmlFor="title"
              >
                Title
              </label>
            </div>
            <div className="md:w-2/3">
              <input
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                type="text"
                placeholder="Title of a blog"
                name="title"
                defaultValue={blog?.title}
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    title: e.target.value,
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
                htmlFor="body"
              >
                Body
              </label>
            </div>
            <div className="md:w-2/3">
              <textarea
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                placeholder="Body"
                defaultValue={blog?.body}
                name="body"
                onChange={(e) =>
                  setBlog({
                    ...blog,
                    body: e.target.value,
                  })
                }
                required
              />
            </div>
          </div>
          <div className="relative flex items-center justify-start mb-5">
            {blog.imageUrl?.map((image, index) => {
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
                placeholder="imageUrl"
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

export default EditBlog;
