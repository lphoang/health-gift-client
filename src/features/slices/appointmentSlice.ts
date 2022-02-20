import { IAppointment, IAppointmentRequest } from './../../utils/types/common';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialAppointmentInfo,
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialAppointments: IAppointment[] = [];

const initialState = {
    apiState: getInitialApi(),
    appointments: initialAppointments,
    appointment: getInitialAppointmentInfo()
}

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        appointmentsDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.appointments = action.payload;
        },
        appointmentDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.appointment = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllAppointmentsByPatientId = (id: string, token: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().appointments().getByPatientId(id, token);
        dispatch(actions.appointmentsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getAllAppointmentsByDoctorId = (id: string, token: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().appointments().getByDoctorId(id, token);
        dispatch(actions.appointmentsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const create = (request: IAppointmentRequest, token: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().appointments().create(request, token);
        dispatch(actions.appointmentDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const update = (request: IAppointmentRequest, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().appointments().update(request, token, id);
        dispatch(actions.appointmentDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const cancel = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        await api().appointments().cancel(token, id);
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const actions = appointmentSlice.actions;

export const selectApiState = (state: any) => state.auth.apiState;

export default appointmentSlice.reducer;