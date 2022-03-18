import { ITimeSlot } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi,
    getInitialTimeSlotInfo
} from 'apis/initialInformation'
import api from 'apis/commonActions';

const initialTimeslots: ITimeSlot[] = [];
const initialState = {
    apiState: getInitialApi(),
    timeslot: getInitialTimeSlotInfo(),
    timeslots: initialTimeslots,
}

const timeslotSlice = createSlice({
    name: 'timeslots',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        loadingDone: (state) => { state.apiState.isLoading = false },
        timeslotsDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.timeslots = action.payload;
        },
        timeslotDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.timeslot = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllTimeslots = () => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().timeslots().getAllTimeSlots();
        dispatch(actions.timeslotsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const getTimeslot = (id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().timeslots().getTimeSlot(id);
        dispatch(actions.timeslotDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const createTimeslot = (start: any, end: any, token: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        const response = await api().timeslots().createTimeSlot(start, end, token);
        dispatch(actions.timeslotDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const addTimeSlot = (timeslotId: string, doctorId: string, token: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        await api().timeslots().addTimeSlot(timeslotId, doctorId, token);
        dispatch(actions.loadingDone());
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};


export const deleteTimeSlot = (token: string, id: string) => async (dispatch: any) => {
    dispatch(actions.loading());
    try {
        await api().timeslots().deleteTimeSlot(id, token);
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
};

export const actions = timeslotSlice.actions;

export const selectApiState = (state: any) => state.auth.apiState;

export default timeslotSlice.reducer;
