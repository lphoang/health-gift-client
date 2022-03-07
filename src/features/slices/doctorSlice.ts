import { IReviewResponse } from './../../utils/types/common';
import { IApiState, IDoctor, ICertificate, ICertificateRequest } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialDoctorInfo,
    getInitialCertificateInfo,
    getInitialRegiserResponse,
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialDoctors: IDoctor[] = [];
const initialCertificates: ICertificate[] = [];
const intialReviews: IReviewResponse[] = []
const initialState = {
    apiState: getInitialApi(),
    doctors: initialDoctors,
    doctor: getInitialDoctorInfo(),
    userDoctor: getInitialRegiserResponse(),
    certificates: initialCertificates,
    certificate: getInitialCertificateInfo(),
    createdCertificate: getInitialCertificateInfo(),
    reviews: intialReviews,
}

const doctorSlice = createSlice({
    name: 'doctors',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        doctorsDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.doctors = action.payload;
        },
        doctorDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.doctor = action.payload;
        },
        userDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.userDoctor = action.payload;
        },
        certificatesDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.certificates = action.payload;
        },
        certificateDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.certificate = action.payload;
        },
        reviewsDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.reviews = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        },
        emptyMessage: (state) => {
            state.apiState = getInitialApi();
        }
    }
})

export const getAllDoctors = () => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().getAllDoctors();
        dispatch(actions.doctorsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getDoctor = (id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().getDoctor(id);
        dispatch(actions.doctorDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getReviews = (id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().getReviews(id);
        dispatch(actions.reviewsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getAllCertificates = (doctorId: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().getAllDoctorCertificates(doctorId);
        dispatch(actions.certificatesDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getCertificate = (doctorId: string, cerId: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().getDoctorCertificate(doctorId, cerId);
        dispatch(actions.certificateDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const createCertificate = (doctorId: string, token: string, request: ICertificateRequest) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().createCertificate(doctorId, token, request);
        dispatch(actions.certificateDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const createDoctor = (request: any) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().createDoctor(request);
        dispatch(actions.userDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const updateUserInfo = (request: any, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().updateUserInfo(request, token, id);
        dispatch(actions.userDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const updateDoctor = (request: any, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().doctor().updateDoctor(request, token, id);
        dispatch(actions.doctorDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const addSpeciality = (specId: string, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        await api().doctor().addSpeciality(token, id, specId);
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const emptyMessage = () => async (dispatch: any) => {
    await dispatch(actions.emptyMessage());
};



export const actions = doctorSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default doctorSlice.reducer;
