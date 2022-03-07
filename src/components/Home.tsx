import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from './Blog/BlogCard';

function Home() {
    return (
        <div>
            <section>
                <div className="bg-indigo-100 text-gray-600 py-20">
                    <div className="container mx-auto flex flex-col md:flex-row items-center my-12 md:my-24">
                        <div className="flex flex-col w-full lg:w-1/3 justify-center items-start p-8">
                            <h1 className="text-3xl md:text-5xl p-2 text-purple-600 tracking-loose font-semibold uppercase font-sans">Health Gift</h1>
                            <p className="text-sm md:text-base text-gray-700 mb-4">Cùng chúng tôi cải thiện cuộc sống của bạn.</p>
                            <Link to="/doctors"
                                className="bg-transparent hover:bg-indigo-700 text-gray-900 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-indigo-900 hover:border-transparent">
                                Đặt khám ngay</Link>
                        </div>
                        <div className="p-8 mt-12 mb-6 md:mb-0 md:mt-0 ml-0 md:ml-12 lg:w-2/3  justify-center">
                            <div className="h-48 flex content-center">
                                <div>
                                    <img className="inline-block mt-28 mx-14 xl:block rounded-xl shadow-lg" src="https://online.visual-paradigm.com/repository/images/6748adf2-f238-4d5a-8fe4-6939312c4408/healthcare-design/hospital-illustration.png" alt="home" /></div>
                                <div>
                                    <img className="inline-block mt-24 md:mt-0 mx-14 p-8 md:p-0 rounded-xl shadow-lg" src={`https://img.freepik.com/free-vector/flat-hand-drawn-hospital-reception-scene_52683-54613.jpg?size=626&ext=jpg`} alt="home" /></div>
                                <div>
                                    <img className="inline-block mt-28 lg:block rounded-xl mx-14 shadow-lg" src="https://static.vecteezy.com/system/resources/thumbnails/001/879/434/small_2x/doctors-perform-dialysis-medicine-treatment-of-kidney-failure-hospital-and-clinic-medical-facilities-blood-purification-and-cleaning-illustration-for-business-card-banner-brochure-flyer-ads-free-vector.jpg" alt="home" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container mb-12 mt-5 mx-auto px-4 md:px-5"></div>
            <div className="flex flex-col mx-auto w-full bg-gray-100 shadow-md px-10 py-5 my-10">
                <h2 className="text-indigo-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">Các bài đăng nổi bật trong tuần vừa qua</h2>
            </div>
            <BlogCard />
        </div>
    );
}

export default Home;