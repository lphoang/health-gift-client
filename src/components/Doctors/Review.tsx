import { useAppDispatch, useAppSelector } from 'app/hooks';
import { reviewDoctor } from 'features/slices/patientSlice';
import React, { useState } from 'react';
import { IReview } from 'utils/types';

function Review({ doctor, patient }: any) {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.accessToken);
    const [review, setReview] = useState({
        reviewRating: 0,
        reviewComment: ""
    })
    const [hover, setHover] = useState(0);

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(reviewDoctor(doctor.id, patient.id, token, review.reviewRating, review.reviewComment));
    }

    return (
        <div className="w-full md:w-9/12 mx-2 pt-3 h-screen">
            {doctor?.reviews?.map((review: IReview, index: number) => {
                return (
                    <div className="flex items-start mt-5 bg-white" key={index}>
                        <div className="flex-shrink-0">
                            <div className="inline-block relative">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={review.patient?.appUser?.avatar ? review.patient?.appUser?.avatar : "https://picsum.photos/id/646/200/200"} alt="P" />
                                    <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                                </div>
                                <svg className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-6">
                            <p className="flex items-baseline">
                                <span className="text-gray-600 font-bold">{review.patient?.appUser?.firstName}{" "}{review.patient?.appUser?.lastName}</span>
                            </p>
                            <div className="flex items-center mt-1">
                                {[...Array(review.reviewRating)].map((x, i) =>
                                    <svg key={i} className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                )}
                                {[...Array(5 - review.reviewRating)].map((x, i) =>
                                    <svg key={i} className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                )}
                            </div>
                            <div className="mt-3">
                                <p className="mt-1 text-base font-semibold">{review.reviewComment}</p>
                            </div>
                            <div className="flex items-center justify-between mt-4 text-sm text-gray-600 fill-current">
                                <button className="flex items-center">
                                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z" /></svg>
                                    <span className="ml-2">Chia sẻ</span>
                                </button>
                                <div className="flex items-center">
                                    <span>Thông tin này hữu ích chứ?</span>
                                    <button className="flex items-center ml-6">
                                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 0h1v3l3 7v8a2 2 0 0 1-2 2H5c-1.1 0-2.31-.84-2.7-1.88L0 12v-2a2 2 0 0 1 2-2h7V2a2 2 0 0 1 2-2zm6 10h3v10h-3V10z" /></svg>
                                        <span className="ml-2">56</span>
                                    </button>
                                    <button className="flex items-center ml-4">
                                        <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M11 20a2 2 0 0 1-2-2v-6H2a2 2 0 0 1-2-2V8l2.3-6.12A3.11 3.11 0 0 1 5 0h8a2 2 0 0 1 2 2v8l-3 7v3h-1zm6-10V0h3v10h-3z" /></svg>
                                        <span className="ml-2">10</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {/* INPUT REVIEW */}
            <div className="bg-white p-5 w-full h-full flex flex-col">
                <h3 className="text-base font-semibold text-gray-500">Bạn đã sử dụng dịch vụ của bác sĩ <span className="font-bold">
                    {" "}{doctor?.appUser?.firstName}{" "}{doctor?.appUser?.lastName}{" "}
                </span>
                    chưa? Hãy chia sẻ cảm nhận của mình với cộng đồng.</h3>
                <form className="mt-8 space-y-6 w-full bg-gray-50 p-6 shadow-md rounded-md" onSubmit={onSubmitHandler}>
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm">
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="reviewComment">
                                    Nhận xét
                                </label>
                            </div>
                            <div className="md:w-2/3">
                                <textarea className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder='Hãy để lại nhận xét của bạn' required onChange={(e) => setReview({ ...review, reviewComment: e.target.value })} rows={5} />
                            </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                            <div className="md:w-1/3">
                                <label className="block text-gray-500 font-bold md:text-left mb-1 md:mb-0 pr-4" htmlFor="reviewRating">
                                    Bạn có hài lòng?
                                </label>
                            </div>
                            <div className="star-rating">
                                {[...Array(5)].map((star, index) => {
                                    return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || review.reviewRating)
                                                ? "text-yellow-400 bg-transparent outline-none border-none cursor-pointer w-10"
                                                : "text-gray-600 bg-transparent outline-none border-none cursor-pointer w-10"}
                                            onClick={() => setReview({ ...review, reviewRating: index })}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(review.reviewRating)}
                                        >
                                            <svg className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Gửi đơn
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Review;