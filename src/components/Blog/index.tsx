import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getBlog } from 'features/slices/blogSlice';
import ApiState from 'components/Global/ApiState';
import { selectApiState } from 'features/slices/authSlice';
import { formatToDate } from 'utils/helpers';
import "./Blogs.css";
import { Link } from 'react-router-dom';


function Blog() {
    const dispatch = useAppDispatch();
    const blog = useAppSelector(state => state.blogs?.blog)
    const blogs = useAppSelector(state => state.blogs?.blogs)
    const apiState = useAppSelector(selectApiState);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getBlog(id))
    }, [id])

    useEffect(() => {
        document.title = `Health Gift | ${blog.title}`
    })

    const anotherBlogs = blogs.filter((b: any) => b.id !== id);


    return (
        <div className="flex w-full">
            <div className="mx-auto w-2/3 bg-gray-50 px-5">
                <ApiState {...apiState} />
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-bold mb-4 mx-10">{blog.title}</h1>
                    <h5 className="text-sm font-semibold text-gray-400 my-3">Được đăng bởi Admin lúc {formatToDate(blog.createdAt)}</h5>
                    <div className="flex flex-col items-center">
                        <div className="swiper flex overflow-x-scroll w-4/5 h-96">
                            {blog.imageUrl?.map((image, index) => {
                                return (
                                    <img className="w-full h-full object-cover bg-gray-300" src={image} key={index} alt="blogImageUrl" />
                                )
                            })}
                        </div>
                    </div>
                    <div className="mx-8 my-4">
                        <ul className="ml-5">
                            {blog?.body.split("\n")?.filter((body: string) => body !== "")?.map((sentence, idx) => {
                                return (
                                    <li key={idx}>
                                        <p className="text-base indent-md font-medium leading-relaxed mt-6 mb-4 text-gray-900" key={idx}>{sentence.charAt(0).toUpperCase() + sentence.slice(1)}</p>
                                        {(idx % 5 === 0) && (
                                            <hr />
                                        )}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="w-1/3 ml-10">
                <div className="bg-gray-100 py-5 px-10">
                    <h3 className="text-base font-medium">Danh sách các bài biết liên quan</h3>
                    <ul className="list-disc">
                        {anotherBlogs?.map((b: any, index: number) => {
                            return (
                                <li key={index} className="text-base font-light hover:text-gray-900 hover:font-bold">
                                    <Link to={`/blogs/${b.id}`}>
                                        {b?.title}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Blog;