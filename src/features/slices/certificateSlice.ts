import { ICertificate } from 'utils/types';
import { createSlice } from "@reduxjs/toolkit";
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialCertificateInfo
} from "apis/initialInformation";
import api from "apis/commonActions";

const initialCertificates: ICertificate[] = [];
const initialState = {
    apiState: getInitialApi(),
    isVerifySuccess: false,
    certificates: initialCertificates,
    certificate: getInitialCertificateInfo()
};

const certificateSlice = createSlice({
    name: "certificates",
    initialState: initialState,
    reducers: {
        loading: (state) => {
            state.apiState = getLoading();
        },
        certificatesDone: (state, action) => {
            state.apiState = getSuccess(state.apiState);
            state.certificates = action.payload;
        },
        certificateDone: (state, action) => {
            state.apiState = getSuccess(state.apiState);
            state.certificate = action.payload;
        },
        verifySuccess: (state) => {
            state.apiState = getSuccess(state.apiState);
            state.isVerifySuccess = true
        },
        error: (state, action) => {
            state.apiState = getError(state.apiState, action.payload);
        },
    },
});

export const getAllCertificates = () => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().certificates().getAll();
        dispatch(actions.certificatesDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const getCertificate = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().certificates().get(token, id);
        dispatch(actions.certificateDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const verifyCertificate = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        await api().certificates().verifyCertificate(token, id);
        dispatch(actions.verifySuccess());
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const actions = certificateSlice.actions;

export const selectApiState = (state: any) => state.auth.apiState;

export default certificateSlice.reducer;
