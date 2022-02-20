import { IApiState, ISpecialist } from 'utils/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    getError,
    getErrorMsg,
    getSuccess,
    getLoading,
    getInitialApi
} from '../../apis/initialInformation'
import api from 'apis/commonActions';

const initialSpecialists: ISpecialist[] = [];
const initialState = {
    apiState: getInitialApi(),
    specialists: initialSpecialists,
}

const specialistSlice = createSlice({
    name: 'specialists',
    initialState: initialState,
    reducers: {
        loading: (state) => { state.apiState = getLoading() },
        specialistsDone: (state, action: PayloadAction<any>) => {
            state.apiState = getSuccess(state.apiState);
            state.specialists = action.payload;
        },
        error: (state, action: PayloadAction<string>) => {
            state.apiState = getError(state.apiState, action.payload);
        }
    }
})

export const getAllSpecialists = () => async (dispatch: any) => {
    dispatch(actions.loading);
    try {
        const response = await api().specialists().getAll();
        dispatch(actions.specialistsDone(response.data));
    } catch (error) {
        dispatch(actions.error(getErrorMsg(error)));
    }
}

export const actions = specialistSlice.actions;

export const selectApiState = (state: { auth: { apiState: IApiState; } }) => state.auth.apiState;

export default specialistSlice.reducer;
