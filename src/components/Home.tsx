import React from 'react';
import BlogCard from './Blog/BlogCard';

function Home() {
    return (
        <>
            <div className="flex flex-col mx-auto w-2/3 bg-gray-100 shadow-md p-10">
                <h2 className="text-indigo-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Các bài đăng nổi bật trong tuần vừa qua</h2>
                <BlogCard />
            </div>
        </>
    );
}

export default Home;