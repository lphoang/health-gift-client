export interface Status {
    ERROR: 'error';
    IDLE: 'idle';
    RUNNING: 'running';
    SUCCESS: 'success';
}

export interface NavMenu {
    name: string,
    url: string,
    className: string,
}

export interface IApiState {
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    errorMessage: string
}

export interface RegisterRequest {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface IUser {
    age: number,
    role: string,
    email: string,
    enabled: boolean,
    firstName: string,
    id: string,
    lastName: string,
    locked: boolean,
    password: string,
    username: string
}

export interface IDisease {
    name: string,
    overview: string,
    cause: string,
    symptom: string,
    routesOfTransmission: string,
    objects: string,
    precautious: string,
    diagnosis: string,
    treatmentMeasures: string
}

export interface IBlog {
    title: string,
    body: string,
    imageUrl: string[],
    createdAt: Date
}

export enum AppointmentType {
    ONLINE, OFFLINE
}

export enum AppointmentStatus {
    INCOMING, CANCELED, DONE
}

export enum CertificateCheckStatus {
    NOT_VERIFIED, VERIFIED
}

export interface IAppointment {
    appointmentId: string,
    title: string
    appointmentType: AppointmentType,
    status: AppointmentStatus,
    description: string,
    startTime: Date,
    endTime: Date,
    createdAt: Date,
    lastModifiedAt: Date,
}

export interface IAppointmentRequest{
    title: string,
    description: string,
    appoitnmentType: AppointmentType,
    startTime: Date,
    endTime: Date,
    patientId: string,
    doctorId: string
}

export interface ICertificate {
    id: string,
    certificateName: string,
    awardedBy: string,
    description: string,
    imageUrl: string,
    issuedOn: Date,
    status: CertificateCheckStatus
}

export interface ICertificateRequest {
    awarded: string,
    certificateName: string,
    description: string,
    imageUrl: string,
    issuedOn: Date
}

export interface ISpecialist {
    specialistId: string,
    specialistName: string
}

export interface IReview {
    id: string,
    reviewRating: number,
    reviewComment: string,
    createdAt: Date
}

export interface IDoctor {
    id: string,
    doctorId: string,
    email: string,
    firstName: string,
    lastName: string,
    reviewRating: number,
    appointments: IAppointment[],
    certificates: ICertificate[],
    specialists: ISpecialist[],
    reviews: IReview[]
}

export interface IPatient {
    id: string,
    patientId: string,
    email: string,
    firstName: string,
    lastName: string,
    address: string,
    birthDate: Date,
    city: string,
    phoneNumber: string,
    zipCode: string,
    appointments: IAppointment[]
}

export interface IUpdatePatientRequest {
    address: string,
    phoneNumber: string,
    birthDate: Date,
    city: string,
    zipCode: string
}