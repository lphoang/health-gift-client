import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "app/hooks";
import { getAllBlogs } from "features/slices/blogSlice";
import { Link } from "react-router-dom";

export default function BlogCard() {
    const blogs = useAppSelector(state => state.blogs?.blogs);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllBlogs())
    }, [])


    return (
        <div className="grid grid-cols-3 gap-8">
            {blogs?.map((blog, index) => {
                return (
                    <div className="w-full select-none relative" key={index}>
                        <div className="aspect-w-16 aspect-h-9">
                            <div className="w-full ml-4 my-4 transform hover:-translate-y-1">
                                <div className="bg-white shadow-md border border-gray-200 rounded-lg w-full dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
                                    <img className="rounded-t-lg object-cover h-80 w-full" src={blog?.imageUrl[0]} alt={blog?.title} />
                                    <div className="p-5">
                                        <h4 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">{blog?.title}</h4>
                                        <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">{blog?.body.slice(0, 160)}...</p>
                                        <Link to={`/blogs/${blog?.id}`} className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center  dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                            Xem thêm
                                            <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}