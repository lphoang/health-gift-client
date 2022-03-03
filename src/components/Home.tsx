import React from 'react';
import BlogCard from './Blog/BlogCard';

function Home() {
    return (
        <div>
            <div className="container mb-12 mt-5 mx-auto px-4 md:px-5"></div>
            <div className="flex flex-col mx-auto w-full bg-gray-100 shadow-md px-10 py-5 my-10">
                <h2 className="text-indigo-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Các bài đăng nổi bật trong tuần vừa qua</h2>
            </div>
            <BlogCard />
        </div>
    );
}

export default Home;