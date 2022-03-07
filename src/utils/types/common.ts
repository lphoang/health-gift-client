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
    appRole: string
}

export interface LoginRequest {
    email: string,
    password: string,
}

export interface IUser {
    age: number,
    avatar: string,
    role: string,
    email: string,
    enabled: boolean,
    firstName: string,
    id: string,
    lastName: string,
    locked: boolean,
    password: string,
    username: string,
    address: string,
    birthDate: any,
    city: string,
    phoneNumber: string,
    createdAt: any,
}

export interface IDisease {
    id: string,
    name: string,
    imageUrl: string[],
    overview: string,
    cause: string,
    symptom: string,
    routesOfTransmission: string,
    objects: string,
    precautions: string,
    diagnosis: string,
    treatmentMeasures: string,
    createdAt: any,
}

export interface IBlog {
    id: string,
    title: string,
    body: string,
    imageUrl: string[],
    createdAt: any
}

export enum AppointmentType {
    ONLINE,
    OFFLINE
}

export enum AppointmentStatus {
    INCOMING, CANCELED, DONE
}

export enum CertificateCheckStatus {
    NOT_VERIFIED, VERIFIED
}

export enum Role {
    DOCTOR, PATIENT
}

export interface IAppointment {
    id: string,
    title: string
    appointmentType: AppointmentType,
    appointmentDate: any,
    status: AppointmentStatus,
    description: string,
    timeSlot: ITimeSlot, 
    createdAt: any,
    lastModifiedAt: any,
}

export interface IAppointmentRequest {
    title: string,
    description: string,
    appointmentType: string,
    timeSlotId: string,
    appointmentDate: any,
    patientId: string,
    doctorId: string
}

export interface IHospital {
    id: string,
    hospitalName: string,
    doctors: IDoctor[],
    since: any,
    imageUrl: string[],
    address: string,
    contactPhoneNumber: string,
    description: string,
    specialities: ISpeciality[],
    createdAt: any
}

export interface ICertificate {
    id: string,
    certificateName: string,
    awardedBy: string,
    description: string,
    imageUrl: string,
    issuedOn: any,
    status: CertificateCheckStatus,
    createdAt: any
}

export interface ICertificateRequest {
    awardedBy: string,
    certificateName: string,
    description: string,
    imageUrl: string,
    issuedOn: any
}

export interface ISpeciality {
    id: string,
    name: string,
    createdAt: any,
}

export interface IReview {
    id: string,
    reviewRating: number,
    reviewComment: string,
    createdAt: any
}

export interface IDoctor {
    id: string,
    appUser: IUser,
    hospital: IHospital,
    workFrom: any,
    workTo: any,
    reviewRating: number,
    appointments: IAppointment[],
    certificates: ICertificate[],
    specialities: ISpeciality[],
    timeSlots: ITimeSlot[],
    reviews: IReview[]
}

export interface ITimeSlot {
    id: string,
    startTime: any,
    endTime: any,
}

export interface IPatient {
    id: string,
    appUser: IUser,
    appointments: IAppointment[]
}

export interface IRegisterResponse {
    verifyToken: string,
    verifyTokenUrl: string,
    appUser: IUser
}

export interface IAppointmentResponse {
    appointment: IAppointment,
    location: string,
    doctorId: string,
    patientId: string
}

export interface IReviewResponse {
    review: IReview,
    doctorId: string,
    patientAvatar: string,
    patientName: string
}
