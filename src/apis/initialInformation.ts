import { ITimeSlot, IRegisterResponse, IAppointmentResponse, IReview, IReviewResponse } from './../utils/types/common';
import {
    AppointmentStatus,
    AppointmentType,
    IApiState,
    IAppointment,
    IBlog,
    IDisease,
    IDoctor,
    IUser,
    ISpeciality,
    ICertificate,
    CertificateCheckStatus,
    IPatient,
    IHospital
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
        avatar: "",
        role: "",
        email: "",
        enabled: false,
        firstName: "",
        id: "",
        lastName: "",
        locked: false,
        password: "",
        username: "",
        birthDate: "",
        phoneNumber: "",
        city: "",
        address: "",
        createdAt: ""
    }
}

export function getInitialDiseaseInfo(): IDisease {
    return {
        id: '',
        name: '',
        imageUrl: [],
        overview: '',
        cause: '',
        symptom: '',
        routesOfTransmission: '',
        objects: '',
        precautions: '',
        diagnosis: '',
        treatmentMeasures: '',
        createdAt: ""
    }
}

export function getInitialReviewInfo(): IReview {
    return {
        id: "",
        reviewRating: 0,
        reviewComment: '',
        createdAt: new Date()
    }
}

export function getInitialReviewResponseInfo(): IReviewResponse {
    return {
        review: getInitialReviewInfo(),
        doctorId: "",
        patientAvatar: "",
        patientName: ""
    }
}


export function getInitialBlogInfo(): IBlog {
    return {
        id: '',
        title: '',
        body: '',
        imageUrl: [],
        createdAt: "",
    }
}

export function getInitialHospitalInfo(): IHospital{
    return {
      id: "",
      hospitalName: "",
      doctors: [],
      since: "",
      imageUrl: [],
      address: "",
      description: "",
      contactPhoneNumber: "",
      specialities: [],
      createdAt: ""
    }
  }

export function getInitialAppointmentInfo(): IAppointment {
    return {
        id: '',
        title: '',
        appointmentType: AppointmentType.OFFLINE,
        appointmentDate: "",
        status: AppointmentStatus.INCOMING,
        description: '',
        timeSlot: getInitialTimeSlotInfo(),
        createdAt: "",
        lastModifiedAt: ""
    }
}

export function getInitialAppointmentResponseInfo() : IAppointmentResponse {
    return {
        appointment: getInitialAppointmentInfo(),
        location: '',
        doctorId: '',
        patientId: ''
    }
}

export function getInitialRegiserResponse(): IRegisterResponse{
    return {
        verifyToken: '',
        verifyTokenUrl: '',
        appUser: getInitialUserInfo()
    }
}

export function getInitialSpecialityInfo(): ISpeciality {
    return {
        id: '',
        name: '',
        createdAt: ""
    }
}

export function getInitialDoctorInfo(): IDoctor {
    return {
        id: '',
        appUser: getInitialUserInfo(),
        hospital: getInitialHospitalInfo(),
        workFrom: "",
        workTo: "",
        reviewRating: 0,
        appointments: [],
        certificates: [],
        specialities: [],
        reviews: [],
        timeSlots: []
    }
}



export function getInitialTimeSlotInfo(): ITimeSlot{
    return {
        id: '',
        startTime: "",
        endTime: "",
    }
}

export function getInitialCertificateInfo(): ICertificate {
    return {
        id: "",
        certificateName: "",
        awardedBy: "",
        description: "",
        imageUrl: "",
        issuedOn: "",
        status: CertificateCheckStatus.NOT_VERIFIED,
        createdAt: ""
    }
}

export function getInitialPatientInfo(): IPatient {
    return {
        id: '',
        appUser: getInitialUserInfo(),
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
        errMsg = error.response?.data.message;
    } else {
        errMsg = `Something wrong happened! ${error.message}`;
    }
    return errMsg;
}