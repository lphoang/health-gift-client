import { API_BASE_URL, ZOOM_BASE_URL, ZOOM_OAUTH_URL, DEPLOYMENT_URL, AUTHORIZATION_BASIC_TOKEN } from './../utils/helpers/env';
import axios from 'axios';
import { LoginRequest, RegisterRequest, IAppointmentRequest, ICertificateRequest, IMeetingRequest } from '../utils/types';

export const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const oauthInstance = axios.create({
    baseURL: ZOOM_OAUTH_URL,
    withCredentials: true,
    responseType: 'json'
})

export const zoomInstance = axios.create({
    baseURL: ZOOM_BASE_URL,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})

function zoom() {
    return {
        getUserInfo: (token: string) => zoomInstance.get('/users/me', {
            headers: { Authorization: `Bearer ${token}` },
        }),
        createMeeting: (request: IMeetingRequest, token: string, userId: string) => zoomInstance.post(`/users/${userId}/meetings`, {
            duration: request.duration,
            password: request.password,
            startTime: request.startTime,
            topic: request.topic,
            timeZone: "Asia/Saigon"
        }, {
            headers: { Authorization: `Bearer ${token}` },
        }),
        oauth: (code: string) => oauthInstance.post(`/token?code=${code}&grant_type=authorization_code&redirect_uri=${DEPLOYMENT_URL}`, {
            'Authorization': `Basic ${AUTHORIZATION_BASIC_TOKEN}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        })
    }
}

function auth() {
    return {
        register: (request: RegisterRequest): any => instance.post('/auth/register', request),
        login: (request: LoginRequest): any => instance.post('/auth/login', request)
    }
}

function certificates() {
    return {
        getAll: () =>
            instance.get(`/admin/certificates`),
        get: (token: string, id: string) =>
            instance.get(`/admin/certificates/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        verifyCertificate: (token: string, id: string) =>
            instance.put(`/admin/verify-certificate?cer_id=${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
    };
}

function diseases() {
    return {
        getAllDiseases: () => instance.get(`/diseases`),
        getDisease: (id: string) => instance.get(`/diseases/${id}`),
        create: (request: any, token: string) =>
            instance.post(
                `/admin/diseases/create`,
                {
                    name: request.name,
                    imageUrl: request.imageUrl,
                    overview: request.overview,
                    cause: request.cause,
                    objects: request.objects,
                    diagnosis: request.diagnosis,
                    precautions: request.precautions,
                    routesOfTransmission: request.routesOfTransmission,
                    symptom: request.symptom,
                    treatmentMeasures: request.treatmentMeasures,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
        update: (request: any, token: string, id: string) =>
            instance.patch(
                `/admin/diseases/${id}/update`,
                {
                    name: request.name,
                    imageUrl: request.imageUrl,
                    overview: request.overview,
                    cause: request.cause,
                    objects: request.objects,
                    diagnosis: request.diagnosis,
                    precautions: request.precautions,
                    routesOfTransmission: request.routesOfTransmission,
                    symptom: request.symptom,
                    treatmentMeasures: request.treatmentMeasures,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
        delete: (token: string, id: string) =>
            instance.delete(`/admin/diseases/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
    }
}

function blogs() {
    return {
        getAllBlogs: () => instance.get(`/blogs`),
        getBlog: (id: string) => instance.get(`/blogs/${id}`),
        create: (request: any, token: string) =>
            instance.post(
                `/admin/blogs/create`,
                {
                    body: request.body,
                    imageUrl: request.imageUrl,
                    title: request.title,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
        update: (request: any, token: string, id: string) =>
            instance.patch(
                `/admin/blogs/${id}/update`,
                {
                    body: request.body,
                    imageUrl: request.imageUrl,
                    title: request.title,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
        delete: (token: string, id: string) =>
            instance.delete(`/admin/blogs/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
    }
}

function timeslots() {
    return {
        getAllTimeSlots: () => instance.get(`/timeslots`),
        getTimeSlot: (id: string) => instance.get(`/timeslots/${id}`),
        addTimeSlot: (timeslotId: string, doctorId: string, token: string) => instance.put(`/timeslots/${timeslotId}/add/${doctorId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        createTimeSlot: (start: any, end: any, token: string) => instance.post(`/timeslots/create`, {
            start: start,
            end: end,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        deleteTimeSlot: (id: string, token: string) => instance.delete(`/timeslots/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            })
    }
}

function appointments() {
    return {
        getByPatientId: (id: string, token: string) => instance.get(`/appointments/patient/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        getByDoctorId: (id: string, token: string) => instance.get(`/appointments/doctor/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        create: (request: IAppointmentRequest, token: string) => instance.post(`/appointments/create`, {
            title: request.title,
            description: request.description,
            appointmentType: request.appointmentType,
            appointmentDate: request.appointmentDate,
            timeSlotId: request.timeSlotId,
            patientId: request.patientId,
            doctorId: request.doctorId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        update: (request: IAppointmentRequest, token: string, id: string) => instance.put(`/appointments/${id}/update`, {
            title: request.title,
            description: request.description,
            appointmentType: request.appointmentType,
            appointmentDate: request.appointmentDate,
            timeSlotId: request.timeSlotId,
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        updateStatus: (status: string, token: string, id: string) => instance.put(`appointments/${id}/update-status`,
            {
                status: status
            }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        cancel: (token: string, id: string) => instance.put(`/appointments/${id}/cancel`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
    }
}

function doctor() {
    return {
        getDoctor: (id: string) => instance.get(`/doctor/${id}`),
        getReviews: (id: string) => instance.get(`/doctor/${id}/reviews`),
        getAllDoctors: () => instance.get(`/doctor`),
        getAllDoctorCertificates: (id: string) => instance.get(`/doctor/${id}/certificates`),
        getDoctorCertificate: (doctorId: string, cerId: string) => instance.get(`/doctor/${doctorId}/certificates/${cerId}`),
        createCertificate: (doctorId: string, token: string, request: ICertificateRequest) => instance.post(`/doctor/${doctorId}/certificates/create`, {
            awardedBy: request.awardedBy,
            certificationName: request.certificateName,
            description: request.description,
            imageUrl: request.imageUrl,
            issuedOn: request.issuedOn
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        addSpeciality: (token: string, id: string, specId: string) => instance.put(`/doctor/${id}/add/${specId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }),
        createDoctor: (request: any) =>
            instance.post("/auth/register", {
                email: request.email,
                password: request.password,
                firstName: request.firstName,
                lastName: request.lastName,
                appRole: "DOCTOR",
            }),
        updateDoctor: (request: any, token: string, id: string) =>
            instance.put(
                `/doctor/${id}/update`,
                {
                    hospitalName: request.hospitalName,
                    workFrom: request.workFrom,
                    workTo: request.workTo,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
        updateUserInfo: (request: any, token: string, id: string) =>
            instance.put(
                `/auth/${id}/update`,
                {
                    avatar: request.avatar,
                    firstName: request.firstName,
                    lastName: request.lastName,
                    address: request.address,
                    phoneNumber: request.phoneNumber,
                    birthDate: request.birthDate,
                    city: request.city,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
    }
}

function bucket() {
    return {
        uploadFile: (formData: any) =>
            instance.post(`/api/storage/uploadFile`, formData, {
                headers: {
                    "Content-Type": `multipart/form-data;boundary=${formData._boundary}`,
                },
            }),
    };
}

function patient() {
    return {
        getPatientInfo: (patientId: string, token: string) => instance.get(`/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        reviewDoctor: (doctorId: string, patientId: string, token: string, reviewRating: number, reviewComment: string) => instance.post(`/patient/review/${doctorId}`, {
            patientId: patientId,
            reviewRating: reviewRating,
            reviewComment: reviewComment
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}

function user() {
    return {
        getUserInfo: (token: string, id: string) =>
            instance.get(`/auth/${id}/info`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        updateUserInfo: (request: any, token: string, id: string) =>
            instance.put(
                `/auth/${id}/update`,
                {
                    avatar: request.avatar,
                    firstName: request.firstName,
                    lastName: request.lastName,
                    address: request.address,
                    phoneNumber: request.phoneNumber,
                    birthDate: request.birthDate,
                    city: request.city,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
    }
}

function specialities() {
    return {
        getAll: () => instance.get(`/specialities`),
        get: (id: string) => instance.get(`/specialities/${id}`),
        create: (name: string, token: string) =>
            instance.post(`/admin/specialities/create`, name, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        update: (name: string, token: string, id: string) =>
            instance.patch(`/admin/specialities/${id}/update`, name, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        delete: (token: string, id: string) =>
            instance.delete(`/admin/specialities/${id}/delete`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
    }
}

function hospitals() {
    return {
        create: (request: any, token: string) =>
            instance.post(
                "/hospitals/create",
                {
                    hospitalName: request.hospitalName,
                    address: request.address,
                    imageUrl: request.imageUrl,
                    since: request.since,
                    description: request.description,
                    contactPhoneNumber: request.contactPhoneNumber
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
        get: (id: string) => instance.get(`/hospitals/${id}`),
        getAll: () => instance.get(`/hospitals`),
        update: (request: any, token: string, id: string) =>
            instance.put(
                `/hospitals/${id}/update`,
                {
                    hospitalName: request.hospitalName,
                    address: request.address,
                    imageUrl: request.imageUrl,
                    since: request.since,
                    description: request.description,
                    contactPhoneNumber: request.contactPhoneNumber
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            ),
    };
}

export default function api() {
    return {
        user,
        auth,
        diseases,
        blogs,
        appointments,
        specialities,
        doctor,
        patient,
        hospitals,
        bucket,
        certificates,
        timeslots,
        zoom
    }
}

