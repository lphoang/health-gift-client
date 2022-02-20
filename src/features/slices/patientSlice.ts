import { IApiState, IUpdatePatientRequest } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialPatientInfo,
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialState = {
    apiState: getInitialApi(),
    patient: getInitialPatientInfo,
}

const patientSlice = createSlice({
    name: 'patients',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        patientDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.patient = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getPatientInfo = (id: string, token: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().patient().getPatientInfo(id, token);
        dispatch(actions.patientDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const updatePatientInfo = (id: string, token: string, request: IUpdatePatientRequest) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().patient().updatePatientInfo(id, token, request);
        dispatch(actions.patientDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}


export const reviewDoctor = (id: string, token: string, reviewRating: number, reviewComment: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().patient().reviewDoctor(id, token, reviewRating, reviewComment);
        dispatch(actions.patientDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const actions = patientSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; }; }) => state.auth.apiState;

export default patientSlice.reducer;
