import { IApiState, ISpeciality } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialSpecialityInfo
} from 'apis/initialInformation'
import api from 'apis/commonActions';

const initialSpecialities: ISpeciality[] = [];
const initialState = {
    apiState: getInitialApi(),
    speciality: getInitialSpecialityInfo(),
    specialities: initialSpecialities,
}

const specialitySlice = createSlice({
    name: 'specialities',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        specialitiesDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.specialities = action.payload;
        },
        specialityDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.speciality = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllSpecialities = () => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().specialities().getAll();
        dispatch(actions.specialitiesDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getSpeciality = (id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().specialities().get(id);
        dispatch(actions.specialityDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const createSpeciality = (name: string, token: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().specialities().create(name, token);
        dispatch(actions.specialityDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const updateSpeciality = (name: string, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().specialities().update(name, token, id);
        dispatch(actions.specialityDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const deleteSpeciality = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        await api().specialities().delete(token, id);
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const actions = specialitySlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; } }) => state.auth.apiState;

export default specialitySlice.reducer;
