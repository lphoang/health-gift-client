import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getReviews } from 'features/slices/doctorSlice';
import { reviewDoctor } from 'features/slices/patientSlice';
import React, { useEffect, useState } from 'react';
import { IReviewResponse } from 'utils/types';

function Review({ doctor, patient }: any) {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.accessToken);
    const role = useAppSelector(state => state.auth?.user?.role);
    const reviews = useAppSelector((state) => state.doctors.reviews);
    const [trigger, setTrigger] = useState(false);
    const [review, setReview] = useState({
        reviewRating: 0,
        reviewComment: ""
    })
    const [hover, setHover] = useState(0);

    useEffect(() => {
        dispatch(getReviews(doctor.id))
    }, [trigger])

    const onSubmitHandler = (e: any) => {
        e.preventDefault();
        dispatch(reviewDoctor(doctor.id, patient.id, token, review.reviewRating, review.reviewComment));
        setTrigger(true);
        setTimeout(() => {
            setTrigger(false);
        }, 2000)
    }

    return (
        <div className="w-full md:w-9/12 mx-2 pt-3 h-screen">
            {reviews?.map((review: IReviewResponse, index: number) => {
                return (
                    <div className="flex items-start bg-indigo-50 mt-2 mb-5 p-5" key={index}>
                        <div className="flex-shrink-0">
                            <div className="inline-block relative">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                    <img className="absolute top-0 left-0 w-full h-full bg-cover object-fit object-cover" src={review?.patientAvatar ? review?.patientAvatar : "https://picsum.photos/id/646/200/200"} alt="P" />
                                    <div className="absolute top-0 left-0 w-full h-full rounded-full shadow-inner"></div>
                                </div>
                                <svg className="fill-current text-white bg-green-600 rounded-full p-1 absolute bottom-0 right-0 w-6 h-6 -mx-1 -my-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z" />
                                </svg>
                            </div>
                        </div>
                        <div className="ml-6">
                            <p className="flex items-baseline">
                                <span className="text-gray-600 font-bold">{review.patientName}</span>
                            </p>
                            <div className="flex items-center mt-1">
                                {[...Array(review.review.reviewRating)].map((x, i) =>
                                    <svg key={i} className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                )}
                                {[...Array(5 - review.review.reviewRating)].map((x, i) =>
                                    <svg key={i} className="w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                )}
                            </div>
                            <div className="mt-3">
                                <p className="mt-1 text-base font-semibold">{review.review.reviewComment}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            {/* INPUT REVIEW */}
            {role === "PATIENT" && (
                <div className="bg-white p-5 w-full h-64 flex flex-col">
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
                                        index += 1;
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
            )}
        </div>
    )
}

export default Review;