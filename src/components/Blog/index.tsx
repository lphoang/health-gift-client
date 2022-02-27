import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getBlog } from 'features/slices/blogSlice';
import "./Blogs.css";
import { Link } from 'react-router-dom';
import ApiState from 'components/Global/ApiState';
import { selectApiState } from 'features/slices/authSlice';
import { formatToDate } from 'utils/helpers';


function Blog() {
    const dispatch = useAppDispatch();
    const blog = useAppSelector(state => state.blogs?.blog)
    const apiState = useAppSelector(selectApiState);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getBlog(id))
    }, [id])

    const bodySentences: string[] = blog.body.split("người.");


    return (
        <div className="mx-auto w-1/2 bg-gray-50">
            <ApiState {...apiState} />
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold my-4">{blog.title}</h1>
                <div className="flex flex-col items-center">
                    <div className="swiper flex overflow-x-scroll w-2/3 h-96">
                        {blog.imageUrl?.map((image, index) => {
                            return (
                                <img className="w-full h-full object-cover bg-gray-300" src={image} key={index} alt="blogImageUrl" />
                            )
                        })}
                    </div>
                    <h5 className="text-md font-semibold text-gray-400 my-3">Được đăng bởi Admin lúc {formatToDate(blog.createdAt)}</h5>
                </div>
                <div className="mx-8 my-4">
                    {bodySentences?.map((sentence, idx) => {
                        return (
                            <p className="text-lg indent-md font-light leading-relaxed mt-6 mb-4 text-indigo-800" key={idx}>{sentence.charAt(0).toUpperCase() + sentence.slice(1)} người.</p>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
export default Blog;