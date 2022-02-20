import {
    AppointmentStatus,
    AppointmentType,
    IApiState,
    IAppointment,
    IBlog,
    IDisease,
    IDoctor,
    IUser,
    ISpecialist,
    ICertificate,
    CertificateCheckStatus,
    IPatient
} from "utils/types";

export function getLoading(): IApiState {
    return {
        isLoading: true,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    };
}

export function getInitialUserInfo(): IUser {
    return {
        age: 0,
        role: "",
        email: "",
        enabled: false,
        firstName: "",
        id: "",
        lastName: "",
        locked: false,
        password: "",
        username: ""
    }
}

export function getInitialDiseaseInfo(): IDisease {
    return {
        name: '',
        overview: '',
        cause: '',
        symptom: '',
        routesOfTransmission: '',
        objects: '',
        precautious: '',
        diagnosis: '',
        treatmentMeasures: ''
    }
}

export function getInitialBlogInfo(): IBlog {
    return {
        title: '',
        body: '',
        imageUrl: [],
        createdAt: new Date(),
    }
}

export function getInitialAppointmentInfo(): IAppointment {
    return {
        appointmentId: '',
        title: '',
        appointmentType: AppointmentType.OFFLINE,
        status: AppointmentStatus.INCOMING,
        description: '',
        startTime: new Date(),
        endTime: new Date(),
        createdAt: new Date(),
        lastModifiedAt: new Date()
    }
}

export function getInitialSpecialistInfo(): ISpecialist {
    return {
        specialistId: '',
        specialistName: ''
    }
}

export function getInitialDoctorInfo(): IDoctor {
    return {
        id: '',
        doctorId: '',
        email: '',
        firstName: '',
        lastName: '',
        reviewRating: 0,
        appointments: [],
        certificates: [],
        specialists: [],
        reviews: []
    }
}

export function getInitialCertificateInfo(): ICertificate {
    return {
        id: "",
        certificateName: "",
        awardedBy: "",
        description: "",
        imageUrl: "",
        issuedOn: new Date(),
        status: CertificateCheckStatus.NOT_VERIFIED
    }
}

export function getInitialPatientInfo(): IPatient {
    return {
        id: '',
        patientId: '',
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        birthDate: new Date(),
        city: '',
        phoneNumber: '',
        zipCode: '',
        appointments: []
    }
}

export function getInitialApi(): IApiState {
    return {
        isLoading: false,
        isSuccess: false,
        isError: false,
        errorMessage: '',
    };
}

export function getSuccess(apiState: IApiState): IApiState {
    apiState.isError = false;
    apiState.errorMessage = '';
    apiState.isSuccess = true;
    apiState.isLoading = false;
    return { ...apiState };
}

export function getError(apiState: IApiState, errorMessage: string): IApiState {
    apiState.isSuccess = false;
    apiState.isLoading = false;
    apiState.isError = true;
    apiState.errorMessage = errorMessage;
    return { ...apiState }
}

export function getErrorMsg(error: any) {
    let errMsg = '';
    if (error) {
        errMsg = error.response.data.message;
    } else {
        errMsg = `Something wrong happened! ${error.message}`;
    }
    return errMsg;
}