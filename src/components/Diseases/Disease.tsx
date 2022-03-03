import { useAppSelector, useAppDispatch } from 'app/hooks';
import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import { getDisease } from 'features/slices/diseaseSlice';
import ApiState from 'components/Global/ApiState';
import { formatToDate } from 'utils/helpers';
import "../Blog/Blogs.css"
import { Link } from 'react-router-dom';

function Disease() {
    const dispatch = useAppDispatch();
    const disease = useAppSelector(state => state.diseases?.disease);
    const diseases = useAppSelector(state => state.diseases?.diseases);
    const apiState = useAppSelector(state => state.diseases?.apiState);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getDisease(id))
    }, [id])

    
    useEffect(() => {
        document.title = `Health Gift | Bệnh ${disease.name}`
    })

    const anotherDiseases = diseases.filter((d: any) => d.id !== id);


    return (
        <div className="mx-auto w-full text-base">
            <div className="mx-auto bg-gray-100 p-4">
                <h5 className="text-sm text-gray-400 font-semibold mb-3">
                    Trang chủ / Sổ tay sức khỏe / {disease?.name}
                </h5>
                <h2 className="text-2xl text-gray-800 font-bold">
                    {disease?.name}: Nguyên nhân, triệu chứng, chẩn đoán và điều trị
                </h2>
            </div>
            <h5 className="text-sm font-semibold text-gray-400 m-3">Được đăng bởi Admin lúc {formatToDate(disease.createdAt)}</h5>
            <ApiState {...apiState} />
            <div className="flex w-full">
                <div className="mx-auto w-2/3">
                    <div className="flex flex-col items-center">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-2/3 px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Tổng quan bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.overview.split("\n").filter(overview => overview !== "")?.map((overview, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {overview}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <div className="swiper flex overflow-x-scroll w-1/3 h-96">
                                {disease.imageUrl?.map((image, index) => {
                                    return (
                                        <img className="w-full h-full object-cover" src={image} key={index} alt="diseases" />
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Nguyên nhân bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.cause.split("\n").filter(cause => cause !== "")?.map((cause, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {cause}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Các triệu chứng của bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.symptom.split("\n").filter(symptom => symptom !== "")?.map((symptom, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {symptom}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Những đối tượng dễ mắc bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.objects.split("\n").filter(object => object !== "")?.map((object, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {object}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Các con đường lây truyền của bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.routesOfTransmission.split("\n").filter(route => route !== "")?.map((route, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {route}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Các phòng ngừa bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.precautions.split("\n").filter(precaution => precaution !== "")?.map((precaution, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {precaution}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Các biện pháp chẩn đoán bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.diagnosis.split("\n").filter(diagnosis => diagnosis !== "")?.map((diagnosis, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {diagnosis}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-5">
                        <div className="flex items-start justify-start w-full">
                            <div className="w-full px-4">
                                <h3 className="text-xl font-bold text-indigo-800">Các biện pháp điều trị bệnh {disease?.name}</h3>
                                <hr className="text-indigo-900" />
                                <ul className="list-disc mt-4 ml-5 mr-15">
                                    {disease?.treatmentMeasures.split("\n").filter(measure => measure !== "")?.map((measure, index) => {
                                        return (
                                            <li className="text-base font-medium mt-1" key={index}>
                                                {measure}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-1/3 ml-10">
                    <div className="bg-gray-100 py-5 px-10">
                        <h3 className="text-base font-medium">Danh sách các bệnh liên quan</h3>
                        <ul>
                            {anotherDiseases?.map((dis: any, index: number) => {
                                return (
                                    <li key={index} className="text-base font-light hover:text-gray-900 hover:font-bold">
                                        <Link to={`/diseases/${dis.id}`}>
                                            {dis?.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Disease;