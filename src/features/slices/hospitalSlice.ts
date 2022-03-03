import { createSlice } from "@reduxjs/toolkit";
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialHospitalInfo,
} from "apis/initialInformation";
import api from "apis/commonActions";
import { IHospital } from "utils/types";

const initialHospitals: IHospital[] = [];
const initialState = {
    apiState: getInitialApi(),
    hospitals: initialHospitals,
    hospital: getInitialHospitalInfo(),
};

const hospitalSlice = createSlice({
    name: "hospitals",
    initialState: initialState,
    reducers: {
        loading: (state) => {
            state.apiState = getLoading();
        },
        hospitalsDone: (state, action) => {
            state.apiState = getSuccess(state.apiState);
            state.hospitals = action.payload;
        },
        hospitalDone: (state, action) => {
            state.apiState = getSuccess(state.apiState);
            state.hospital = action.payload;
        },
        error: (state, action) => {
            state.apiState = getError(state.apiState, action.payload);
        },
    },
});

export const getAllHospitals = () => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().hospitals().getAll();
        dispatch(actions.hospitalsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const getHospital = (id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().hospitals().get(id);
        dispatch(actions.hospitalDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const createHospital = (request: any, token: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().hospitals().create(request, token);
        dispatch(actions.hospitalDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const updateHospital = (request: any, token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().hospitals().update(request, token, id);
        dispatch(actions.hospitalDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const actions = hospitalSlice.actions;

export const selectApiState = (state: any) => state.auth.apiState;

export default hospitalSlice.reducer;
