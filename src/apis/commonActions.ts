import axios from 'axios';
import { LoginRequest, RegisterRequest, IAppointmentRequest, ICertificateRequest, IUpdatePatientRequest } from '../utils/types';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    withCredentials: true,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})

function auth() {
    return {
        register: (request: RegisterRequest): any => instance.post('/auth/register', request),
        login: (request: LoginRequest): any => instance.post('/auth/login', request),
    }
}

function diseases() {
    return {
        getAllDiseases: () => instance.get(`/diseases`),
        getDisease: (id: string) => instance.get(`/diseases/${id}`)
    }
}

function blogs() {
    return {
        getAllBlogs: () => instance.get(`/blogs`),
        getBlog: (id: string) => instance.get(`/blogs/${id}`)
    }
}

function appointments() {
    return {
        getByPatientId: (id: string, token: string) => instance.get(`/appointments/patient?patientId=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        getByDoctorId: (id: string, token: string) => instance.get(`/appointments/doctor?doctorId=${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        create: (request: IAppointmentRequest, token: string) => instance.post(`/appointments/create`, {
            title: request.title,
            description: request.description,
            appointmentType: request.appoitnmentType,
            startTime: request.startTime,
            endTime: request.endTime,
            patientId: request.patientId,
            doctorId: request.doctorId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        update: (request: IAppointmentRequest, token: string, id: string) => instance.put(`/appointments/${id}/update`, {
            title: request.title,
            description: request.description,
            appointmentType: request.appoitnmentType,
            startTime: request.startTime,
            endTime: request.endTime,
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
        getAllDoctors: () => instance.get(`/doctor`),
        getAllDoctorCertificates: (id: string) => instance.get(`/doctor/${id}/certifications`),
        getDoctorCertificate: (doctorId: string, cerId: string) => instance.get(`/doctor/${doctorId}/certifications/${cerId}`),
        createCertificate: (doctorId: string, token: string, request: ICertificateRequest) => instance.post(`/doctor/${doctorId}/certifications/create`, {
            awarded: request.awarded,
            certificationName: request.certificateName,
            description: request.description,
            imageUrl: request.imageUrl,
            issuedOn: request.issuedOn
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}

function patient() {
    return {
        getPatientInfo: (patientId: string, token: string) => instance.get(`/patient/${patientId}`, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        updatePatientInfo: (patientId: string, token: string, request: IUpdatePatientRequest) => instance.put(`/patient/${patientId}/update`, {
            address: request.address,
            phoneNumber: request.phoneNumber,
            zipCode: request.zipCode,
            city: request.city,
            birthDate: request.birthDate
        }, {
            headers: { Authorization: `Bearer ${token}` }
        }),
        reviewDoctor: (doctorId: string, token: string, reviewRating: number, reviewComment: string) => instance.post(`/patient/review?doctorId=${doctorId}`, {
            reviewRating: reviewRating,
            reviewComment: reviewComment
        }, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}

function user() {
    return {
        getUserInfo: (token: string, id: string) => instance.get(`/auth/info/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
    }
}

function specialists() {
    return {
        getAll: () => instance.get(`/specialists`)
    }
}

export default function api() {
    return {
        user,
        auth,
        diseases,
        blogs,
        appointments,
        specialists,
        doctor,
        patient
    }
}

